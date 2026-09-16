import BlurClient from "./Client";
import ToolArticle from "../../components/ToolArticle";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Blur Image Online Free | Blur Faces & Sensitive Areas",
  description:
    "Blur a face, license plate or any sensitive part of a photo online for free. Drag a box over the area and blur it instantly, right in your browser.",
  alternates: { canonical: "/blur-image" }
};

const faqs = [
  {
    q: "Can I blur more than one area in the same photo?",
    a: "Yes. After blurring one spot, move or resize the same selection box to a different part of the image and click Blur this area again. Each click adds another blurred region without undoing the earlier ones."
  },
  {
    q: "Will the blur look permanent, or can someone undo it?",
    a: "Once you download the result, the blur is baked directly into the image pixels, the same way it would be in a printed photo. There's no hidden original layer left inside the file, so the blurred detail can't be reversed by anyone opening the downloaded PNG."
  },
  {
    q: "How strong should the blur be for a face or license plate?",
    a: "A blur strength around 15 to 25px is usually enough to make a face or plate unreadable while keeping the rest of the photo looking natural. For extra caution on something highly sensitive, push the slider higher."
  },
  {
    q: "What file format does the blurred image download as?",
    a: "The result downloads as a PNG, which keeps full quality and avoids introducing extra compression artifacts on top of the blur itself."
  },
  {
    q: "Does the blurred region get uploaded anywhere for processing?",
    a: "No. The blur is applied using the browser's own canvas filter, so the whole photo, including the part you're blurring, stays on your device the entire time."
  }
];

export default function Page() {
  return (
    <>
      <BlurClient />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ToolArticle
          heading="Hide faces, plates and private details in seconds"
          intro={[
            "Sharing a photo publicly often means covering up something in it first: a stranger's face caught in the background, a license plate, a house number, or a screen showing private information. PixForge's Blur Image tool lets you drag a box over exactly that area and apply a strong, adjustable blur without touching the rest of the photo.",
            "Because the blur is drawn directly onto the image using the browser's own canvas filter, there's no server round-trip and no risk of the original, unblurred photo being stored anywhere outside your device.",
            "The tool is deliberately simple: position a box, choose how strong the blur should be, and apply it. Repeat as many times as you need for multiple spots in the same photo before downloading the final result."
          ]}
          steps={[
            "Upload the photo containing the area you want to hide.",
            "Drag the selection box over the face, plate or detail you want to blur.",
            "Adjust the blur strength slider if you need it lighter or heavier.",
            "Click Blur this area, then repeat for any other spots.",
            "Download the finished image once every area is covered."
          ]}
          useCases={[
            "Blurring a stranger's face before posting a photo publicly",
            "Hiding a license plate in a car photo",
            "Covering a screen, document or ID card visible in the background",
            "Redacting a phone number or address shown in a screenshot",
            "Softening a distracting background element behind the main subject"
          ]}
          note="For content you plan to publish, it's worth zooming in on the result afterward to double-check the blurred area is fully unreadable before sharing."
        />
        <FAQ items={faqs} />
      </div>
    </>
  );
}
