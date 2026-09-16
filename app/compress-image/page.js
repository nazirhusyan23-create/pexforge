import CompressClient from "./Client";

export const metadata = {
  title: "Compress Image Online Free — Reduce JPG, PNG, WEBP Size",
  description:
    "Compress JPG, PNG and WEBP images online for free. Reduce file size while keeping quality, directly in your browser — no upload, no signup.",
  alternates: { canonical: "/compress-image" }
};

export default function Page() {
  return <CompressClient />;
}
