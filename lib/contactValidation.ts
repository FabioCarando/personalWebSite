export type ContactMessage = { name: string; email: string; subject: string; message: string; website: string };

export function validateContact(value: unknown): ContactMessage | string {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "Please complete the contact form.";
  const input = value as Record<string, unknown>;
  for (const key of ["name", "email", "subject", "message"]) {
    if (typeof input[key] !== "string") return "Please complete all required fields.";
  }
  if (input.website !== undefined && typeof input.website !== "string") return "Invalid form data.";
  const fields = {
    name: (input.name as string).trim(), email: (input.email as string).trim(),
    subject: (input.subject as string).trim(), message: (input.message as string).trim(),
    website: ((input.website as string) || "").trim(),
  };
  if (fields.name.length < 2 || fields.name.length > 80 || /[\r\n\x00-\x1f]/.test(fields.name)) return "Please enter a name between 2 and 80 characters.";
  if (fields.email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email) || /[\x00-\x1f]/.test(fields.email)) return "Please enter a valid email address.";
  if (fields.subject.length < 3 || fields.subject.length > 140 || /[\r\n\x00-\x1f]/.test(fields.subject)) return "Please enter a subject between 3 and 140 characters.";
  if (fields.message.length < 10 || fields.message.length > 5000 || fields.message.includes("\0")) return "Please enter a message between 10 and 5,000 characters.";
  return fields;
}
