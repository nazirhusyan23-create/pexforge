import AddBorderClient from "./Client";
import ToolArticle from "../../components/ToolArticle";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Add Border to Image Online Free | Photo Frame Maker",
  description:
    "Add a colored border or rounded-corner frame to any photo online for free, with adjustable thickness and radius, right in your browser.",
  alternates: { canonical: "/add-border" }
};

const faqs = [
  {
    q: "Can I make the corners fully round, like a circle?",
    a: "Setting the corner radius slider close to its maximum on a square photo will round the corners heavily, though a perfect circle crop is better handled with a dedicated crop shape. For most framing purposes, a moderate radius gives a soft, rounded-rectangle look."
  },
  {
    q: "Will the border change the size of my image?",
    a: "Yes, the border is added around the outside of the photo, so the final downloaded image is larger than the original by twice the border thickness in both width and height."
  },
  {
    q: "Can I match the border color to my brand or website?",
    a: "Yes, the color picker accepts any color, so you can match a brand color exactly if you know its hex code, or just pick visually from the color swatch."
  },
  {
    q: "What format does the framed image download as?",
    a: "It downloads as a PNG, which keeps the border and rounded corners crisp, including any transparency around rounded edges."
  }
];

export default function Page() {
  return (
    <>
      <AddBorderClient />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ToolArticle
          heading="Frame a photo with a clean border"
          intro={[
            "A simple colored border can turn an ordinary photo into something that looks intentionally designed, whether it's a white frame for a polaroid-style look or a bold color border that matches a social media theme. PixForge's Add Border tool lets you control the thickness, color and corner rounding with a live preview before downloading.",
            "The border and rounded corners are drawn using the canvas, so the result stays sharp at any thickness and works with photos of any size or aspect ratio."
          ]}
          steps={[
            "Upload the photo you want to frame.",
            "Adjust the border thickness to taste.",
            "Add a corner radius if you want a softened, rounded look.",
            "Pick a border color, then download the framed image."
          ]}
          useCases={[
            "Creating a polaroid-style white-framed photo",
            "Adding a brand-colored border to social media posts",
            "Softening a photo's edges with rounded corners for a card layout",
            "Giving a product photo a clean, gallery-style frame",
            "Making a photo stand out on a busy background"
          ]}
        />
        <FAQ items={faqs} />
      </div>
    </>
  );
}
