"use client";

import { useEffect } from "react";

/**
 * Drop-in AdSense unit.
 * 1. Replace data-ad-slot with your real ad unit ID from AdSense dashboard.
 * 2. The AdSense script itself is loaded once in app/layout.js.
 */
export default function AdSlot({ slot = "0000000000", format = "auto", className = "" }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      // ignore - ad blocked or script not yet loaded
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: "block" }}
      data-ad-client="ca-pub-2006445566626425"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
