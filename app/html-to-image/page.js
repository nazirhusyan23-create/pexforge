import HtmlToImageClient from "./Client";

export const metadata = {
  title: "HTML to Image Online Free — Convert HTML Snippet to PNG",
  description: "Paste any HTML snippet and turn it into a downloadable PNG image, free and right in your browser.",
  alternates: { canonical: "/html-to-image" }
};

export default function Page() {
  return <HtmlToImageClient />;
}
