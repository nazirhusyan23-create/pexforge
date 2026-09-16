import MemeClient from "./Client";

export const metadata = {
  title: "Meme Generator Online Free — Add Top & Bottom Text",
  description: "Create memes online for free. Add classic top and bottom captions to any image and download instantly.",
  alternates: { canonical: "/meme-generator" }
};

export default function Page() {
  return <MemeClient />;
}
