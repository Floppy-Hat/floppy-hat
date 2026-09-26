import { fireEvent, render, screen } from "@testing-library/react";
import { ProjectShowcase } from "../components/ProjectShowcase";
import type { ShowcaseItem } from "@/types/content";

const PROJECTS: ShowcaseItem[] = [
  { slug: "hardline-dept", title: "Hardline Dept.", image: "/a.png" },
  { slug: "brasa-steak-house", title: "Brasa Steak House", image: "/b.png" },
];

const COLLECTIONS: ShowcaseItem[] = [
  { slug: "logofolio", title: "Logofolio", image: "/c.png" },
  { slug: "web-design-showcase", title: "Web Design Showcase" },
];

const setup = () =>
  render(<ProjectShowcase projects={PROJECTS} collections={COLLECTIONS} />);

describe("ProjectShowcase", () => {
  it("starts with the first project active", () => {
    setup();
    expect(screen.getByRole("link", { name: "Hardline Dept." })).toHaveAttribute(
      "data-active",
      "true",
    );
  });

  it("previews a project on hover without navigating away from it", () => {
    setup();
    const brasa = screen.getByRole("link", { name: "Brasa Steak House" });

    fireEvent.mouseEnter(brasa);

    expect(brasa).toHaveAttribute("data-active", "true");
    expect(screen.getByRole("link", { name: "Hardline Dept." })).toHaveAttribute(
      "data-active",
      "false",
    );
    expect(brasa).toHaveAttribute("href", "/projects/brasa-steak-house");
  });

  it("previews on focus too, so keyboard users see the cover", () => {
    setup();
    const logofolio = screen.getByRole("link", { name: "Logofolio" });

    fireEvent.focus(logofolio);

    expect(logofolio).toHaveAttribute("data-active", "true");
  });

  it("falls back to the title when a collection has no cover yet", () => {
    setup();

    fireEvent.mouseEnter(screen.getByRole("link", { name: "Web Design Showcase" }));

    // Both the link and the placeholder now read "Web Design Showcase".
    expect(screen.getAllByText("Web Design Showcase")).toHaveLength(2);
  });
});
