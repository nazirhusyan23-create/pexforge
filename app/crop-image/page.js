import CropClient from "./Client";

export const metadata = {
  title: "Crop Image Online Free — Simple Drag & Drop Cropper",
  description:
    "Crop JPG, PNG and WEBP images online for free with a simple drag-and-drop tool. Fast, private, runs entirely in your browser.",
  alternates: { canonical: "/crop-image" }
};

export default function Page() {
  return <CropClient />;
}
