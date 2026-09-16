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
  "/blur-image",
  "/grayscale-image",
  "/add-border",
  "/color-picker",
  "/image-to-base64",
  "/privacy-policy",
  "/terms"
];

export default function sitemap() {
  const base = "https://pixforge.vercel.app";
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8
  }));
}
