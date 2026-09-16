import RotateClient from "./Client";
import ToolArticle from "../../components/ToolArticle";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Rotate Image Online Free | Rotate & Flip JPG, PNG",
  description:
    "Rotate or flip your images online for free, right in your browser. Fast, private, no signup required.",
  alternates: { canonical: "/rotate-image" }
};

const faqs = [
  {
    q: "Why does my phone photo look sideways online even though it looks fine on my phone?",
    a: "Phones often save orientation as metadata rather than actually rotating the pixels, and some websites or apps ignore that metadata, causing the photo to display sideways. Rotating the image with this tool bakes the correct orientation directly into the pixels, so it will display correctly everywhere."
  },
  {
    q: "What's the difference between rotating and flipping?",
    a: "Rotating turns the whole image around a center point, like spinning a photograph on a table. Flipping creates a mirror image instead, flipping horizontally swaps left and right, while flipping vertically swaps top and bottom."
  },
  {
    q: "Can I rotate to an angle that isn't 90 degrees?",
    a: "Yes. Use the fine-angle slider to rotate to any angle from 0 to 359 degrees, which is useful for straightening a photo that was taken slightly tilted."
  },
  {
    q: "Will rotating crop or cut off parts of my image?",
    a: "Rotating by 90, 180 or 270 degrees keeps the entire image intact, just with the canvas dimensions swapped. Rotating by an in-between angle expands the canvas so nothing is cut off, which may leave transparent corners in the downloaded PNG."
  }
];

export default function Page() {
  return (
    <>
      <RotateClient />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ToolArticle
          heading="Fix sideways or upside-down photos in seconds"
          intro={[
            "A photo taken with a phone held the wrong way, or scanned into a document at an angle, is one of the most common small annoyances in everyday image editing. PixForge's Rotate Image tool gives you one-click 90-degree rotation buttons for the common case, plus a fine-angle slider and horizontal/vertical flipping for anything more specific.",
            "The rotated result is rendered on an HTML canvas at full resolution, so there's no quality loss beyond the normal re-encoding involved in saving any image file."
          ]}
          steps={[
            "Upload the image that needs rotating or flipping.",
            "Use the Rotate left / Rotate right buttons for quick 90° turns.",
            "Use Flip horizontal / Flip vertical to mirror the image if needed.",
            "Fine-tune with the angle slider for a precise, non-90° rotation.",
            "Download the corrected image."
          ]}
          useCases={[
            "Correcting a sideways phone photo",
            "Straightening a slightly tilted scanned document",
            "Mirroring a logo or graphic for a design layout",
            "Fixing orientation before uploading to a platform that ignores EXIF data",
            "Creating a flipped variant of an image for a symmetric design"
          ]}
        />
        <FAQ items={faqs} />
      </div>
    </>
  );
}

