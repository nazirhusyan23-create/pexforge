import RemoveBgClient from "./Client";
import ToolArticle from "../../components/ToolArticle";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Remove Background Online Free | AI Background Remover",
  description:
    "Remove the background from any photo online for free using on-device AI. No upload to a server. The model runs entirely in your browser.",
  alternates: { canonical: "/remove-background" }
};

const faqs = [
  {
    q: "How accurate is the background removal?",
    a: "The on-device segmentation model handles people, animals, products and most everyday objects well, especially when there's a clear line between the subject and the background. Very fine detail like loose hair strands or fur may not be perfectly clean, and a second pass or manual touch-up can help in those cases."
  },
  {
    q: "Why does the first use take longer than later ones?",
    a: "The tool downloads the AI model the first time you run it, which can take a little while depending on your connection. Your browser caches the model after that, so later uses on the same device start almost instantly."
  },
  {
    q: "What file format does the result download as?",
    a: "The background is removed by making those pixels transparent, so the result downloads as a PNG, the only common format that supports transparency."
  },
  {
    q: "Is my photo uploaded to a server?",
    a: "No. Only the model files are downloaded, once, from a content delivery network. Your actual photo is processed entirely on your device and never leaves your browser."
  }
];

export default function Page() {
  return (
    <>
      <RemoveBgClient />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ToolArticle
          heading="Cut out any subject in one click"
          intro={[
            "Removing a background by hand with a lasso tool or pen tool can take several minutes even for a skilled editor. PixForge's Remove Background tool uses an on-device AI segmentation model to detect the main subject in a photo and erase everything else automatically, in seconds, without you needing to trace a single edge.",
            "Because the model runs with WebAssembly directly in your browser tab, there's no account, no per-image credit limit and no watermark added to the result."
          ]}
          steps={[
            "Upload a photo with a clear subject, such as a person, product or animal.",
            "Click Remove Background and let the on-device model process the image.",
            "Preview the transparent result against the checkered background.",
            "Download the PNG and drop it onto any new background you like."
          ]}
          useCases={[
            "Isolating a product photo for an online store listing",
            "Creating a transparent profile picture or logo cutout",
            "Preparing a headshot for a presentation slide or ID badge",
            "Building a collage from multiple cut-out photos",
            "Removing a cluttered background from a quick phone photo"
          ]}
          note="Best results come from photos with good lighting and reasonable contrast between the subject and the background."
        />
        <FAQ items={faqs} />
      </div>
    </>
  );
}

