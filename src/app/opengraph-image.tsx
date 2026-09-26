import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.description}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#012AFE",
              color: "#FFFFFF",
              padding: "14px 20px",
              fontSize: 34,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -1,
            }}
          >
            FLOPPY HAT!
          </div>
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
