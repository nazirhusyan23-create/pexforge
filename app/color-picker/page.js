import ColorPickerClient from "./Client";
import ToolArticle from "../../components/ToolArticle";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Image Color Picker Online Free | Get Hex & RGB from a Photo",
  description:
    "Click anywhere on a photo to instantly grab its exact hex and RGB color code, free and right in your browser. No upload required.",
  alternates: { canonical: "/color-picker" }
};

const faqs = [
  {
    q: "How accurate is the color that's picked?",
    a: "The tool reads the exact pixel value at the spot you click, so the hex and RGB codes match that pixel precisely. Keep in mind that a single pixel in a photo can look slightly different from the overall area around it, especially in busy or grainy parts of an image."
  },
  {
    q: "Can I build a small palette from one photo?",
    a: "Yes, every color you click is added to the Recently picked row below the image, so you can click around a photo and build up a short palette, then copy each swatch as you go."
  },
  {
    q: "What formats does it give me, hex or RGB?",
    a: "Both. Each picked color shows as a hex code (like #3382ff) and as an RGB value (like rgb(51, 130, 255)), and either one can be copied to your clipboard with a single click."
  },
  {
    q: "Does the image need to be uploaded to get a color?",
    a: "No, the color is read directly from the image data already loaded in your browser, so nothing is sent anywhere just to pick a color."
  }
];

export default function Page() {
  return (
    <>
      <ColorPickerClient />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ToolArticle
          heading="Pull exact colors straight out of any photo"
          intro={[
            "Matching a color from a photo, a screenshot or a piece of inspiration usually means opening a full design program just to use its eyedropper tool. PixForge's Image Color Picker skips that step: upload a picture, click anywhere on it, and the exact hex and RGB values for that spot appear instantly.",
            "Every color you click is kept in a small running palette underneath the image, so you can sample a handful of colors from the same photo and copy each one out as you build a design or brand palette."
          ]}
          steps={[
            "Upload the photo or screenshot you want to sample colors from.",
            "Click anywhere on the image to read the color at that point.",
            "Copy the hex or RGB value shown, or click a swatch from your recent picks.",
            "Repeat for as many colors as you need from the same image."
          ]}
          useCases={[
            "Matching a brand color from a logo or product photo",
            "Building a quick color palette from a photograph",
            "Getting the exact background color of a screenshot for CSS",
            "Sampling skin tones or nature colors for illustration reference",
            "Checking the hex code of a color before using it in a design tool"
          ]}
        />
        <FAQ items={faqs} />
      </div>
    </>
  );
}
