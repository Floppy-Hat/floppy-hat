import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read at build time and inlined as a data URI — Satori can't fetch a relative
// path, and the file is on disk while this route is prerendered.
const logo = readFileSync(
  join(process.cwd(), "public/app/logo.svg"),
).toString("base64");

// Satori only supports flex layout, so every container declares it explicitly.
// Colours are literal here: this renders outside the document, so it can't read
// CSS custom properties from globals.css.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#050505",
          padding: 72,
        }}
      >
        <div style={{ display: "flex" }}>
          {/* Native 84x59, scaled 2.5x */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/svg+xml;base64,${logo}`}
            width={210}
            height={148}
            alt=""
          />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 68,
            lineHeight: 1.1,
            letterSpacing: -2,
            color: "#C5C5C5",
            maxWidth: 940,
          }}
        >
          We Create Brands That Look Different, Feel Right, And Stay Memorable.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            color: "#8A8A8A",
          }}
        >
          <div style={{ display: "flex" }}>Brand · Social · Websites</div>
          {/* The lifted blue, not #012AFE — brand blue is 2.8:1 on black and
              too dim to read at thumbnail size in a feed. */}
          <div style={{ display: "flex", color: "#5488FE" }}>floppyhat.com</div>
        </div>
      </div>
    ),
    size,
  );
}
