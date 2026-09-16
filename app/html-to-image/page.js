import HtmlToImageClient from "./Client";
import ToolArticle from "../../components/ToolArticle";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "HTML to Image Online Free | Convert HTML Snippet to PNG",
  description: "Paste any HTML snippet and turn it into a downloadable PNG image, free and right in your browser.",
  alternates: { canonical: "/html-to-image" }
};

const faqs = [
  {
    q: "What kind of HTML can I paste in?",
    a: "Any self-contained snippet of HTML with inline CSS styling works well, cards, quote graphics, simple layouts with text and colors, and basic shapes built from divs. External stylesheets and JavaScript won't be picked up, since the preview only renders the raw markup and inline styles you provide."
  },
  {
    q: "Why does my rendered image look slightly different from a normal webpage?",
    a: "The conversion uses a snapshot library that recreates each element visually on a canvas, which handles the vast majority of everyday CSS well but may not perfectly reproduce every advanced browser feature, such as some CSS filters or web fonts that aren't fully loaded yet."
  },
  {
    q: "Can I control the size of the exported image?",
    a: "The exported PNG matches the natural rendered size of your HTML content. To make the output larger or smaller, adjust the width, padding or font sizes defined in your HTML/CSS itself."
  },
  {
    q: "What is this useful for?",
    a: "It's a quick way to turn a styled quote, a simple info card, a code snippet block or any other small HTML layout into a shareable image for social media, a blog post, or a presentation slide."
  },
  {
    q: "Can I use web fonts or custom fonts in my HTML?",
    a: "Fonts that are already loaded on the page, including the system default fonts, will render correctly. A web font linked from an external stylesheet may not always be picked up in time for the snapshot, so for guaranteed results it's safest to stick with common system fonts."
  }
];

export default function Page() {
  return (
    <>
      <HtmlToImageClient />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <ToolArticle
          heading="Turn styled HTML into a shareable PNG"
          intro={[
            "Sometimes the easiest way to design a small graphic, a styled quote card, an announcement banner, a code snippet screenshot, is with plain HTML and CSS rather than a full design tool. PixForge's HTML to Image converter renders your markup live in the browser and lets you export the result as a crisp PNG at double resolution for sharp text.",
            "This is especially handy for developers who are more comfortable writing a few lines of styled HTML than dragging shapes around a canvas editor.",
            "The default example in the editor shows a simple gradient card with a heading and a line of text, which is a good starting point to edit directly rather than writing a snippet from scratch."
          ]}
          steps={[
            "Paste or edit your HTML (with inline styles) in the source box.",
            "Watch the live preview update on the right as you type.",
            "Click Export as PNG once the preview looks the way you want.",
            "Use the downloaded PNG anywhere images are accepted."
          ]}
          useCases={[
            "Creating a styled quote graphic for social media",
            "Exporting a code snippet as an image for a blog post",
            "Turning a small info card into a shareable image",
            "Making a simple banner without opening a design tool",
            "Generating a preview thumbnail for a link or document"
          ]}
        />
        <FAQ items={faqs} />
      </div>
    </>
  );
}

