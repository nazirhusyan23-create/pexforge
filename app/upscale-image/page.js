import UpscaleClient from "./Client";
import ToolArticle from "../../components/ToolArticle";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Upscale Image Online Free | AI Image Upscaler",
  description:
    "Enlarge and sharpen small images online for free using an on-device AI model. Private, browser-based, no signup.",
  alternates: { canonical: "/upscale-image" }
};

const faqs = [
  {
    q: "How is this different from just stretching an image bigger?",
    a: "A plain resize stretches existing pixels, which quickly looks soft or blocky. The AI upscaler instead predicts plausible new detail based on patterns it learned from millions of images, so edges and textures tend to stay sharper at larger sizes."
  },
  {
    q: "What happens if the AI model fails to load?",
    a: "PixForge automatically falls back to a high-quality canvas resize using the browser's built-in smoothing, so you'll always get a result even on a slow connection or an older browser that can't run the AI model."
  },
  {
    q: "Is there a limit to how much an image can be enlarged?",
    a: "Very small or very low-quality source images have less real detail to work with, so extreme enlargements will still show some softness. For best results, start from the highest-resolution version of the photo you have available."
  },
  {
    q: "Does upscaling work on drawings and graphics, not just photos?",
    a: "It works on any raster image, including illustrations and screenshots, though results are generally most noticeable on photographic detail like textures, faces and fine lines."
  }
];

export default function Page() {
  return (
    <>
      <UpscaleClient />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ToolArticle
          heading="Enlarge small images without losing sharpness"
          intro={[
            "An old photo, a small thumbnail, or an image saved at the wrong size can all end up looking pixelated once you need it bigger. PixForge's Upscale Image tool runs an on-device super-resolution model that reconstructs extra detail as it enlarges a photo, aiming for a sharper result than a plain stretch would give.",
            "If the AI model can't load on your device for any reason, the tool automatically switches to a high-quality resize instead, so you always come away with a usable, larger image."
          ]}
          steps={[
            "Upload the small or low-resolution image you want to enlarge.",
            "Click Upscale Image and let the on-device model process it.",
            "Compare the original and the enlarged result side by side.",
            "Download the upscaled image."
          ]}
          useCases={[
            "Enlarging an old or low-resolution family photo",
            "Preparing a small logo for a large print or banner",
            "Improving a thumbnail before using it in a larger layout",
            "Sharpening a screenshot before adding it to a document",
            "Getting more usable detail out of a scanned image"
          ]}
        />
        <FAQ items={faqs} />
      </div>
    </>
  );
}

