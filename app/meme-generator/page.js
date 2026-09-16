import MemeClient from "./Client";
import ToolArticle from "../../components/ToolArticle";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Meme Generator Online Free | Add Top & Bottom Text",
  description: "Create memes online for free. Add classic top and bottom captions to any image and download instantly.",
  alternates: { canonical: "/meme-generator" }
};

const faqs = [
  {
    q: "Can I use any image to make a meme?",
    a: "Yes. Upload any photo, drawing or screenshot you have the rights to use, and the tool will overlay bold white captions with a black outline in the classic meme style at the top and bottom."
  },
  {
    q: "Why does the text wrap onto multiple lines automatically?",
    a: "Longer captions are automatically wrapped to fit within the width of the image, so text never runs off the edges no matter how much you type."
  },
  {
    q: "What size and format does the meme download as?",
    a: "The finished meme is downloaded as a PNG at the same resolution as your original uploaded image, keeping the captions sharp even if the meme is later resized for sharing."
  },
  {
    q: "Can I leave the top or bottom text blank?",
    a: "Yes. Clear either text field and that caption simply won't be drawn, so you can create a bottom-caption-only or top-caption-only meme if that fits your joke better."
  }
];

export default function Page() {
  return (
    <>
      <MemeClient />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ToolArticle
          heading="Make a classic meme in seconds"
          intro={[
            "The top-text, bottom-text meme format has been a staple of internet culture for years, and PixForge's Meme Generator recreates the classic bold, white, black-outlined caption style on top of any image you upload. Everything updates live as you type, so what you see is exactly what gets downloaded.",
            "Because the whole process runs in your browser, there's no waiting for a server to render your meme and no watermark added to the result."
          ]}
          steps={[
            "Upload the base image for your meme.",
            "Type your top caption and bottom caption.",
            "Watch the live preview update instantly as you type.",
            "Click Download meme to save the finished PNG."
          ]}
          useCases={[
            "Reacting to a moment with friends or a group chat",
            "Creating social media content quickly",
            "Adding a caption to a screenshot for a presentation",
            "Making a lighthearted announcement image",
            "Turning a personal photo into a shareable joke"
          ]}
        />
        <FAQ items={faqs} />
      </div>
    </>
  );
}

