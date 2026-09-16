import Base64Client from "./Client";
import ToolArticle from "../../components/ToolArticle";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Image to Base64 Converter Online Free | Encode Images for Code",
  description:
    "Convert any image to a Base64 data URL online for free, ready to paste directly into HTML, CSS or JSON. Runs entirely in your browser.",
  alternates: { canonical: "/image-to-base64" }
};

const faqs = [
  {
    q: "What is a Base64 data URL used for?",
    a: "It's a way of embedding an image's actual data directly inside a piece of text, such as an HTML file or a CSS stylesheet, instead of linking to a separate image file. This is handy for small icons or inline images where you want everything in a single file."
  },
  {
    q: "Does encoding an image as Base64 make it bigger?",
    a: "Yes, Base64 text is roughly a third larger than the original binary file, so this approach works best for small images like icons and logos rather than large photos."
  },
  {
    q: "Can I paste the result straight into CSS?",
    a: "Yes, the copied data URL can be used directly as a background-image value in CSS, for example background-image: url(...), using the full string shown in the box."
  },
  {
    q: "Is the image uploaded to a server during conversion?",
    a: "No, the file is read locally using the browser's built-in file reader, so the Base64 string is generated entirely on your device."
  }
];

export default function Page() {
  return (
    <>
      <Base64Client />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ToolArticle
          heading="Encode an image for use directly in code"
          intro={[
            "Developers often need to embed a small image directly inside HTML, CSS or JSON rather than linking to a separate file, which is where a Base64-encoded data URL comes in. PixForge's Image to Base64 tool reads any uploaded image and instantly produces both the raw data URL and a ready-to-paste HTML img tag.",
            "Because the encoding happens with the browser's built-in file reading API, there's no server involved and no size limit beyond what your browser can comfortably handle."
          ]}
          steps={[
            "Upload the image you want to encode.",
            "Copy the Base64 data URL, or the ready-made <img> tag.",
            "Paste it directly into your HTML, CSS or JSON source."
          ]}
          useCases={[
            "Embedding a small icon directly in a single HTML file",
            "Using an image as a CSS background without a separate file request",
            "Including an image inline inside a JSON config or email template",
            "Quickly testing an image in code without hosting it anywhere",
            "Avoiding an extra network request for a tiny, frequently used graphic"
          ]}
          note="Base64 encoding is best suited to small images. For photos or larger graphics, keep them as separate files and link to them normally."
        />
        <FAQ items={faqs} />
      </div>
    </>
  );
}
