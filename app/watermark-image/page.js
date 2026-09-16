import WatermarkClient from "./Client";
import ToolArticle from "../../components/ToolArticle";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Watermark Image Online Free | Add Text Watermark",
  description:
    "Add a text watermark to your photos online for free. Protect your work, right in your browser, no upload required.",
  alternates: { canonical: "/watermark-image" }
};

const faqs = [
  {
    q: "Why should I watermark my photos?",
    a: "A visible watermark makes it harder for someone to reuse your photo without credit, discourages casual image theft, and helps promote your name or brand whenever the image is shared or reposted elsewhere."
  },
  {
    q: "Can I control how visible the watermark is?",
    a: "Yes. The opacity slider lets you make the watermark anywhere from a faint, subtle mark to a bold, fully opaque stamp, and the font size and color are also fully adjustable."
  },
  {
    q: "Can I add a logo image instead of text?",
    a: "This tool currently supports text watermarks, which cover the most common use case, a name, a website URL, or a copyright notice. For a logo overlay, our Watermark tool's text field can still hold a short brand name in a distinctive font size and color."
  },
  {
    q: "Where's the best place to position a watermark?",
    a: "Bottom-right is the most common choice since it rarely covers the main subject of a photo, but a centered, semi-transparent watermark is harder to crop out if protecting the image from theft is your main goal."
  },
  {
    q: "Will the watermark still be visible if someone resizes my photo?",
    a: "Yes, since the watermark is part of the image pixels themselves rather than a separate overlay, it scales along with the rest of the photo no matter how the file is later resized or compressed."
  }
];

export default function Page() {
  return (
    <>
      <WatermarkClient />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ToolArticle
          heading="Protect your photos with a custom watermark"
          intro={[
            "Whether you're a photographer sharing a portfolio preview, a small business protecting product photography, or just labeling a screenshot with your website, a watermark is a simple way to mark an image as yours before it's shared. PixForge lets you type any text, then adjust its size, color, position and transparency with an instant live preview.",
            "The watermark is drawn directly onto the image pixels using the Canvas API, so it becomes a permanent part of the downloaded file rather than an overlay that can be easily removed.",
            "A lighter, more transparent watermark tends to look more professional and less like it's fighting the photo for attention, while a bolder, higher-contrast mark is better suited to actively discouraging image theft."
          ]}
          steps={[
            "Upload the photo you want to watermark.",
            "Type your watermark text, a name, website or copyright notice.",
            "Choose a position, font size, color and opacity using the live preview.",
            "Download the watermarked image."
          ]}
          useCases={[
            "Adding a copyright notice to photography portfolio previews",
            "Branding product photos for an online store",
            "Labeling internal screenshots with 'Confidential' or a project name",
            "Marking draft designs shared with a client for feedback",
            "Adding a website URL to images shared on social media"
          ]}
        />
        <FAQ items={faqs} />
      </div>
    </>
  );
}

