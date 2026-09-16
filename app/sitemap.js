const routes = [
  "",
  "/compress-image",
  "/resize-image",
  "/crop-image",
  "/convert-image",
  "/rotate-image",
  "/watermark-image",
  "/meme-generator",
  "/html-to-image",
  "/remove-background",
  "/upscale-image",
  "/privacy-policy",
  "/terms"
];

export default function sitemap() {
  const base = "https://pexforge.vercel.app";
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8
  }));
}
