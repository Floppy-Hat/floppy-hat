import { COLLECTIONS, PROJECTS, SHOWCASE_ITEMS, nextShowcaseSlug } from "../constants";

describe("nextShowcaseSlug", () => {
  it("walks to the following item", () => {
    expect(nextShowcaseSlug(PROJECTS[0].slug)).toBe(PROJECTS[1].slug);
  });

  it("crosses from the last project into the collections", () => {
    const lastProject = PROJECTS[PROJECTS.length - 1];
    expect(nextShowcaseSlug(lastProject.slug)).toBe(COLLECTIONS[0].slug);
  });

  it("wraps past the last item back to the first", () => {
    const last = SHOWCASE_ITEMS[SHOWCASE_ITEMS.length - 1];
    expect(nextShowcaseSlug(last.slug)).toBe(SHOWCASE_ITEMS[0].slug);
  });

  it("falls through to the first item for an unknown slug", () => {
    expect(nextShowcaseSlug("not-a-real-slug")).toBe(SHOWCASE_ITEMS[0].slug);
  });

  it("visits every item exactly once before repeating", () => {
    const seen: string[] = [];
    let slug = SHOWCASE_ITEMS[0].slug;
    for (let i = 0; i < SHOWCASE_ITEMS.length; i++) {
      seen.push(slug);
      slug = nextShowcaseSlug(slug);
    }
    expect(new Set(seen).size).toBe(SHOWCASE_ITEMS.length);
    expect(slug).toBe(SHOWCASE_ITEMS[0].slug);
  });
});
