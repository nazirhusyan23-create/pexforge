import CompressClient from "./Client";
import ToolArticle from "../../components/ToolArticle";
import FAQ from "../../components/FAQ";

export const metadata = {
  title: "Compress Image Online Free | Reduce JPG, PNG, WEBP Size",
  description:
    "Compress JPG, PNG and WEBP images online for free. Reduce file size while keeping quality, directly in your browser, no upload, no signup.",
  alternates: { canonical: "/compress-image" }
};

const faqs = [
  {
    q: "Will compressing my image reduce its quality?",
    a: "Some quality is traded for a smaller file size, since compression works by simplifying fine visual detail that the human eye barely notices. Our slider lets you choose exactly how much to compress, so you can stop at the point where the image still looks sharp to you."
  },
  {
    q: "What's the difference between compressing and resizing?",
    a: "Compressing keeps the same pixel dimensions but re-encodes the image with less data, which is ideal when a photo just needs a smaller file size for email or a website. Resizing actually changes the width and height in pixels. If your image is both huge in dimensions and in file size, try our Resize Image tool first, then compress the result."
  },
  {
    q: "Is there a limit on file size or number of images?",
    a: "Since everything runs in your browser rather than on a server, there's no artificial upload limit. The only ceiling is how much memory your device and browser can handle, which in practice covers virtually any photo from a phone or camera."
  },
  {
    q: "Does PixForge store or see my images?",
    a: "No. The compression happens entirely on your device using the browser's built-in Canvas API. Your photo is never sent anywhere, so there's nothing for us to store, see, or lose."
  }
];

export default function Page() {
  return (
    <>
      <CompressClient />
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ToolArticle
          heading="Why compress an image before sharing it?"
          intro={[
            "Large photos straight out of a modern phone or camera can easily weigh several megabytes, which is far more data than most websites, emails or messaging apps actually need. A compressed image loads faster, uses less mobile data, and is far more likely to fit under the upload limits of platforms like WordPress, Gmail or job application portals.",
            "PixForge's Compress Image tool re-encodes your photo directly in the browser using the same JPEG compression algorithm found in professional photo editors, giving you a live preview of the size saved before you commit to downloading."
          ]}
          steps={[
            "Drop or select a JPG, PNG or WEBP image.",
            "Drag the quality slider to balance file size against visual quality.",
            "Click Compress Image to generate the smaller version.",
            "Compare the new size shown on screen, then download it."
          ]}
          useCases={[
            "Speeding up a slow-loading website or blog",
            "Fitting a photo under an email or form attachment limit",
            "Saving mobile data when sharing pictures",
            "Preparing product photos for an online store",
            "Reducing storage used by a photo archive"
          ]}
          note="Tip: for logos, screenshots or illustrations with flat colors, try converting to PNG or WEBP first, those formats often compress simple graphics better than JPEG."
        />
        <FAQ items={faqs} />
      </div>
    </>
  );
}

