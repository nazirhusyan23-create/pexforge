import ConvertClient from "./Client";
import ToolArticle from "../../components/ToolArticle";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Convert Image Online Free | JPG, PNG, WEBP Converter",
  description:
    "Convert images between JPG, PNG and WEBP for free, right in your browser. No upload, no watermark, no signup.",
  alternates: { canonical: "/convert-image" }
};

const faqs = [
  {
    q: "What's the difference between JPG, PNG and WEBP?",
    a: "JPG is best for photos and produces small files but doesn't support transparency. PNG supports transparency and is lossless, which makes it ideal for logos, screenshots and graphics with sharp edges or text, though files tend to be larger. WEBP is a newer format that usually gives the smallest file size while supporting both photos and transparency, and is well supported by modern browsers."
  },
  {
    q: "Will converting to JPG remove transparency?",
    a: "Yes, JPG has no transparency channel, so any transparent areas in a PNG or WEBP will be filled in with white when converted to JPG. If you need to keep transparency, convert to PNG or WEBP instead."
  },
  {
    q: "Does converting reduce image quality?",
    a: "Converting to PNG is lossless and won't reduce quality. Converting to JPG or WEBP uses a small amount of compression, similar to our Compress Image tool, but at the default quality setting used here the difference is generally invisible to the eye."
  },
  {
    q: "Can I convert multiple images at once?",
    a: "This tool currently handles one image at a time so you can preview the result before downloading. For batch conversion of many files, run them through one after another. Each conversion only takes a couple of seconds."
  }
];

export default function Page() {
  return (
    <>
      <ConvertClient />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ToolArticle
          heading="Switch between JPG, PNG and WEBP instantly"
          intro={[
            "Not every image format works everywhere, some platforms only accept JPG uploads, some designs need PNG transparency, and modern websites increasingly prefer WEBP for its smaller file size. PixForge's Convert Image tool re-encodes your picture into whichever format you choose without ever leaving your browser tab.",
            "Because the conversion is done locally using the browser's Canvas API, there's no queue, no server round-trip, and your original file is never uploaded anywhere."
          ]}
          steps={[
            "Upload the image you'd like to convert.",
            "Choose JPG, PNG or WEBP as the target format.",
            "Click Convert & Download to save the new file instantly."
          ]}
          useCases={[
            "Turning a PNG screenshot into a smaller JPG for email",
            "Converting a photo to WEBP for a faster-loading website",
            "Getting a transparent PNG version of a logo",
            "Meeting a platform's specific upload format requirement",
            "Standardizing a batch of mixed-format images to one type"
          ]}
        />
        <FAQ items={faqs} />
      </div>
    </>
  );
}

