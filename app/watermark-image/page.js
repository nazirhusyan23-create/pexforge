import WatermarkClient from "./Client";

export const metadata = {
  title: "Watermark Image Online Free — Add Text Watermark",
  description:
    "Add a text watermark to your photos online for free. Protect your work, right in your browser — no upload required.",
  alternates: { canonical: "/watermark-image" }
};

export default function Page() {
  return <WatermarkClient />;
}
