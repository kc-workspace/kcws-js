const a1: WithNull<number> = 0;
// @ts-expect-error
const a2: WithNull<number> = undefined;
const a3: WithNull<number> = null;

const b1: WithUndefined<string> = "hello";
const b2: WithUndefined<string> = undefined;
// @ts-expect-error
const b3: WithUndefined<string> = null;

const c1: Optional<boolean> = false;
const c2: Optional<boolean> = null;
const c3: Optional<boolean> = undefined;
