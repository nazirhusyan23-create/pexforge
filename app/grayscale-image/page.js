import GrayscaleClient from "./Client";
import ToolArticle from "../../components/ToolArticle";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Black and White Photo Converter Online Free | Grayscale & Sepia",
  description:
    "Convert any photo to black and white or a warm sepia tone online for free, with an adjustable intensity slider, right in your browser.",
  alternates: { canonical: "/grayscale-image" }
};

const faqs = [
  {
    q: "What's the difference between black and white and sepia?",
    a: "Black and white removes all color information, leaving only shades of gray based on how light or dark each part of the photo is. Sepia keeps a similar tonal range but tints it with warm brown tones, giving the photo an old, vintage feel."
  },
  {
    q: "Can I apply a partial effect instead of full grayscale?",
    a: "Yes, the intensity slider goes from 0 to 100 percent, so you can dial in a subtly desaturated look rather than going fully black and white."
  },
  {
    q: "Will this work on already-black-and-white photos?",
    a: "It will, though there won't be a visible difference since there's no color left to remove. The sepia option can still add a tint to a black-and-white photo if you want that vintage look."
  },
  {
    q: "Does converting to grayscale reduce the file size?",
    a: "Not directly, since the image dimensions and format stay the same. If you also want a smaller file, run the result through the Compress Image tool afterward."
  }
];

export default function Page() {
  return (
    <>
      <GrayscaleClient />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ToolArticle
          heading="Give a photo a classic black and white or sepia look"
          intro={[
            "Removing color from a photo can shift the focus onto light, shadow and composition in a way a color version never quite shows. PixForge's Grayscale tool converts any image to black and white or a warm sepia tone with a single click, and the intensity slider lets you dial the effect anywhere from a subtle tint to the full classic look.",
            "The conversion happens instantly in the browser using a canvas filter, so you can compare the black and white and sepia versions side by side before deciding which one to keep."
          ]}
          steps={[
            "Upload the photo you want to convert.",
            "Choose Black & White or Sepia.",
            "Adjust the intensity slider to taste.",
            "Download the converted image."
          ]}
          useCases={[
            "Giving a modern photo a timeless, classic look",
            "Creating a consistent black-and-white portfolio or gallery",
            "Adding a vintage sepia feel to an old family photo",
            "Removing distracting colors so a subject stands out",
            "Preparing a photo for black-and-white printing"
          ]}
        />
        <FAQ items={faqs} />
      </div>
    </>
  );
}
