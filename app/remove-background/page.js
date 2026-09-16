import RemoveBgClient from "./Client";

export const metadata = {
  title: "Remove Background Online Free — AI Background Remover",
  description:
    "Remove the background from any photo online for free using on-device AI. No upload to a server — the model runs entirely in your browser.",
  alternates: { canonical: "/remove-background" }
};

export default function Page() {
  return <RemoveBgClient />;
}
