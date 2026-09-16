import CropClient from "./Client";
import ToolArticle from "../../components/ToolArticle";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Crop Image Online Free | Simple Drag & Drop Cropper",
  description:
    "Crop JPG, PNG and WEBP images online for free with a simple drag-and-drop tool. Fast, private, runs entirely in your browser.",
  alternates: { canonical: "/crop-image" }
};

const faqs = [
  {
    q: "How do I select the exact area I want to keep?",
    a: "After uploading a photo, a blue selection box appears on top of it. Click and drag anywhere inside the box to move it, or drag the small handle in the bottom-right corner to resize it, until it frames exactly the part of the image you want to keep."
  },
  {
    q: "What happens to the part of the image outside the box?",
    a: "Everything outside the selection box is discarded once you click Crop & Download. Only the pixels inside the box are kept in the final downloaded file."
  },
  {
    q: "Can I crop to a specific aspect ratio, like a square?",
    a: "Yes. Simply resize the selection box manually to whatever width-to-height ratio you need, for example dragging it into a square for a profile picture or a wide rectangle for a banner."
  },
  {
    q: "What format does the cropped image save as?",
    a: "Cropped images are downloaded as PNG so that no additional compression artifacts are introduced during the crop itself."
  }
];

export default function Page() {
  return (
    <>
      <CropClient />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ToolArticle
          heading="Crop out exactly what matters"
          intro={[
            "Cropping is one of the fastest ways to improve a photo: removing a distracting background, tightening a composition, or cutting an image down to a square for a social media post. PixForge's cropper draws a movable, resizable selection box directly over your image so you can see exactly what will be kept before you download.",
            "Because cropping only ever removes pixels rather than adding new ones, it never introduces blur or artifacts. The kept area is copied at its original resolution."
          ]}
          steps={[
            "Upload the image you want to crop.",
            "Drag the blue box to position it over the area you want to keep.",
            "Drag the corner handle to resize the box to the right dimensions.",
            "Click Crop & Download to save just that area as a new image."
          ]}
          useCases={[
            "Cutting a photo down to a square for Instagram",
            "Removing unwanted background or edges from a screenshot",
            "Isolating a single product from a group photo",
            "Creating a tighter, more focused composition",
            "Trimming white space around a scanned document"
          ]}
        />
        <FAQ items={faqs} />
      </div>
    </>
  );
}

