import { isRateLimited } from "../rate-limit";

const limit = { max: 3, windowMs: 1000 };
const t0 = 1_000_000;

describe("isRateLimited", () => {
  it("allows calls up to the limit, then blocks", () => {
    expect(isRateLimited("a", limit, t0)).toBe(false);
    expect(isRateLimited("a", limit, t0)).toBe(false);
    expect(isRateLimited("a", limit, t0)).toBe(false);
    expect(isRateLimited("a", limit, t0)).toBe(true);
  });

  it("counts each caller separately", () => {
    isRateLimited("busy", limit, t0);
    isRateLimited("busy", limit, t0);
    isRateLimited("busy", limit, t0);

    expect(isRateLimited("busy", limit, t0)).toBe(true);
    expect(isRateLimited("quiet", limit, t0)).toBe(false);
  });

  it("allows again once the window has passed", () => {
    isRateLimited("waiter", limit, t0);
    isRateLimited("waiter", limit, t0);
    isRateLimited("waiter", limit, t0);
    expect(isRateLimited("waiter", limit, t0)).toBe(true);

    expect(isRateLimited("waiter", limit, t0 + limit.windowMs + 1)).toBe(false);
  });
});
