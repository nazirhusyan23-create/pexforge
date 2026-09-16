import UpscaleClient from "./Client";

export const metadata = {
  title: "Upscale Image Online Free — AI Image Upscaler",
  description:
    "Enlarge and sharpen small images online for free using an on-device AI model. Private, browser-based, no signup.",
  alternates: { canonical: "/upscale-image" }
};

export default function Page() {
  return <UpscaleClient />;
}
