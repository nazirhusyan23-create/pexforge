import ResizeClient from "./Client";
import ToolArticle from "../../components/ToolArticle";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Resize Image Online Free | By Pixels or Percentage",
  description:
    "Resize JPG, PNG and WEBP images online for free by exact pixels or percentage. Fast, private, browser-based, no upload required.",
  alternates: { canonical: "/resize-image" }
};

const faqs = [
  {
    q: "Will resizing stretch or distort my photo?",
    a: "Not if you leave the aspect ratio lock switched on. Changing the width will automatically adjust the height (and vice versa) to keep the same proportions, so people and objects in the photo won't look squeezed or stretched."
  },
  {
    q: "What size should I resize an image to for a website?",
    a: "It depends on where it's used, but a common rule of thumb is roughly 1200-1600px wide for a full-width blog banner, around 800px for an in-article photo, and 150-400px for thumbnails or profile pictures. Smaller pixel dimensions mean a smaller file size and a faster-loading page."
  },
  {
    q: "Can I make an image bigger with this tool?",
    a: "You can type in larger numbers and the tool will stretch the image to fit, but stretching a small photo beyond its original size will make it look soft or blurry, since no new detail is being invented. For genuinely sharper enlargements, try our AI-powered Upscale Image tool instead."
  },
  {
    q: "What file format does the resized image download as?",
    a: "Resized images are saved as PNG by default to avoid any extra quality loss. If you need a smaller JPG file afterward, run the result through our Compress Image or Convert Image tool."
  },
  {
    q: "Should I resize before or after cropping a photo?",
    a: "Cropping first usually gives a cleaner result, since you're deciding exactly what part of the photo to keep before deciding what size it should end up at. Resizing a photo and then cropping it can waste detail if the crop area ends up smaller than expected."
  }
];

export default function Page() {
  return (
    <>
      <ResizeClient />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ToolArticle
          heading="Resize images without losing proportions"
          intro={[
            "Every screen, platform and print job expects a different pixel size, and sending an oversized image to a place that only needs a small thumbnail wastes bandwidth and slows pages down. PixForge's Resize Image tool lets you type in an exact width and height, or keep the original proportions locked while you adjust just one dimension.",
            "Because the resize happens on an HTML canvas inside your own browser, the result is available instantly, there's no upload progress bar to wait for, and no size limit imposed by a server.",
            "Keeping the aspect ratio locked matters more than it might seem: even a small mismatch between width and height can make faces and objects look subtly stretched, which is often more noticeable to a viewer than the resize itself."
          ]}
          steps={[
            "Upload the image you want to resize.",
            "Enter a new width or height in pixels, the other dimension updates automatically if 'Lock aspect ratio' is checked.",
            "Uncheck the lock if you specifically need a different width-to-height ratio.",
            "Click Resize & Download to save the result."
          ]}
          useCases={[
            "Meeting a platform's exact upload dimensions (e.g. a marketplace listing)",
            "Creating consistent thumbnail sizes across a gallery",
            "Shrinking a photo before adding it to a document or presentation",
            "Preparing a profile picture or avatar",
            "Matching a required banner or header size"
          ]}
        />
        <FAQ items={faqs} />
      </div>
    </>
  );
}

