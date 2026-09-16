import ConvertClient from "./Client";

export const metadata = {
  title: "Convert Image Online Free — JPG, PNG, WEBP Converter",
  description:
    "Convert images between JPG, PNG and WEBP for free, right in your browser. No upload, no watermark, no signup.",
  alternates: { canonical: "/convert-image" }
};

export default function Page() {
  return <ConvertClient />;
}
