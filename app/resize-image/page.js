import ResizeClient from "./Client";

export const metadata = {
  title: "Resize Image Online Free — By Pixels or Percentage",
  description:
    "Resize JPG, PNG and WEBP images online for free by exact pixels or percentage. Fast, private, browser-based — no upload required.",
  alternates: { canonical: "/resize-image" }
};

export default function Page() {
  return <ResizeClient />;
}
