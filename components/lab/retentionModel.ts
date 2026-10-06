export const STEPS = 240;
export const TASK_SWITCH = 40;
export const START_ACCURACY = 0.92;
export const REPLAY_SIZE = 4;
export const ALARM_THRESHOLD = 0.84;
export type Scenario = "smooth" | "bursty";
export type RetentionPoint = {
  step: number;
  baseline: number;
  periodic: number;
  triggered: number;
  periodicSpent: number;
  triggeredSpent: number;
  alarm: boolean;
};

// A deterministic teaching model, not a trained network or statistical e-detector.
// Both replay policies have the same maximum budget; realized spending may differ.
export function simulateRetention(intensity: number, budget: number, scenario: Scenario): RetentionPoint[] {
  const losses = Array.from({ length: STEPS - TASK_SWITCH }, (_, index) => {
    if (scenario === "smooth") return 1;
    return 0.06 + [34, 88, 150].reduce((sum, center) => sum + Math.exp(-((index - center) ** 2) / 100), 0);
  });
  const total = losses.reduce((sum, value) => sum + value, 0);
  const damage = 0.55 * intensity / 100;
  const pulses = Math.floor(budget / REPLAY_SIZE);
  let baseline = START_ACCURACY, periodic = baseline, triggered = baseline;
  let periodicSpent = 0, triggeredSpent = 0, cooldown = 0;
  const points: RetentionPoint[] = [];
  for (let step = 0; step <= STEPS; step++) {
    let alarm = false;
    if (step > TASK_SWITCH) {
      const loss = losses[step - TASK_SWITCH - 1] / total * damage;
      baseline = Math.max(0.1, baseline - loss);
      periodic = Math.max(0.1, periodic - loss);
      triggered = Math.max(0.1, triggered - loss);
      const elapsed = step - TASK_SWITCH;
      const scheduled = pulses > 0 && Math.floor(elapsed * pulses / (STEPS - TASK_SWITCH)) > Math.floor((elapsed - 1) * pulses / (STEPS - TASK_SWITCH));
      const recover = (accuracy: number) => Math.min(START_ACCURACY, accuracy + 0.075);
      if (scheduled && periodicSpent + REPLAY_SIZE <= budget) {
        periodic = recover(periodic);
        periodicSpent += REPLAY_SIZE;
      }
      if (cooldown > 0) cooldown--;
      if (triggered < ALARM_THRESHOLD && cooldown === 0 && triggeredSpent + REPLAY_SIZE <= budget) {
        alarm = true;
        triggered = recover(triggered);
        triggeredSpent += REPLAY_SIZE;
        cooldown = 8;
      }
    }
    points.push({ step, baseline, periodic, triggered, periodicSpent, triggeredSpent, alarm });
  }
  return points;
}
