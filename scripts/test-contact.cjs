const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function compile(path, context) {
  const code = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(code, context);
  return context.exports;
}
const validation = compile('lib/contactValidation.ts', { exports: {} });
const body = { name: 'Test Visitor', email: 'visitor@example.com', subject: 'Research enquiry', message: 'I would like to discuss your research.', website: '' };
const origin = 'https://portfolio.example';
const key = '12345678-1234-1234-1234-123456789abc';

function endpoint({ env = {}, status = 200, reject = false } = {}) {
  const calls = [];
  const route = compile('app/api/contact/route.ts', {
    exports: {}, require: () => validation, Response, Request, Buffer, AbortSignal, URL,
    process: { env },
    fetch: async (url, options) => {
      calls.push({ url, options });
      if (reject) throw new Error('Private provider failure');
      return Response.json({ id: 'mock-message' }, { status });
    },
  });
  return { post: route.POST, calls };
}
function request(value = body, headers = {}) {
  return new Request(`${origin}/api/contact`, {
    method: 'POST', headers: { origin, 'content-type': 'application/json', 'idempotency-key': key, ...headers },
    body: typeof value === 'string' ? value : JSON.stringify(value),
  });
}
const configured = { RESEND_API_KEY: 'mock-key', CONTACT_FROM_EMAIL: 'sender@example.com', CONTACT_TO_EMAIL: 'private@example.com' };

test('Rejects invalid origins, content types, malformed JSON, oversized bodies and invalid fields without sending', async () => {
  const { post, calls } = endpoint({ env: configured });
  const invalid = [
    [request(body, { origin: 'https://other.example' }), 403],
    [request(body, { 'content-type': 'text/plain' }), 415],
    [request('{broken'), 400],
    [request('x'.repeat(24001)), 413],
    [request({ ...body, email: 'bad-address' }), 400],
    [request({ ...body, name: 'a' }), 400],
    [request({ ...body, subject: 'Injected\r\nheader' }), 400],
    [request({ ...body, message: 'short' }), 400],
    [request({ ...body, message: 'x'.repeat(5001) }), 400],
    [request({ ...body, email: [] }), 400],
    [request({ ...body, website: 'https://spam.example' }), 400],
    [request(body, { 'idempotency-key': 'invalid' }), 400],
  ];
  for (const [input, expected] of invalid) assert.equal((await post(input)).status, expected);
  assert.equal(calls.length, 0);
});
test('Missing configuration produces an error rather than fake success', async () => {
  const { post, calls } = endpoint();
  const response = await post(request());
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, false);
  assert.equal(calls.length, 0);
});
test('Uses only the server recipient and passes Reply-To and retry key', async () => {
  const { post, calls } = endpoint({ env: configured });
  const response = await post(request({ ...body, to: 'attacker@example.com' }));
  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
  const payload = JSON.parse(calls[0].options.body);
  assert.deepEqual(payload.to, ['private@example.com']);
  assert.equal(payload.reply_to, body.email);
  assert.equal(payload.from, configured.CONTACT_FROM_EMAIL);
  assert.equal(calls[0].options.headers['Idempotency-Key'], key);
  assert.equal((await response.text()).includes('private@example.com'), false);
});
test('Provider errors do not report success or leak internal details', async () => {
  for (const options of [{ status: 429 }, { reject: true }]) {
    const { post } = endpoint({ env: configured, ...options });
    const response = await post(request());
    assert.equal(response.status, 502);
    const text = await response.text();
    assert.equal(JSON.parse(text).ok, false);
    assert.equal(text.includes('mock-key'), false);
    assert.equal(text.includes('Private provider failure'), false);
  }
});
