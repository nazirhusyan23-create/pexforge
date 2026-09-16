export const metadata = {
  title: "Privacy Policy",
  description: "PixForge privacy policy, how we handle your data and images.",
  alternates: { canonical: "/privacy-policy" }
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 prose prose-sm">
      <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
      <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>

      <h2 className="mt-8 text-xl font-bold text-gray-900">Your images stay on your device</h2>
      <p className="text-gray-600">
        PixForge's image tools run entirely in your web browser using JavaScript and WebAssembly. When
        you upload a photo to compress, resize, crop, convert, watermark, remove its background or
        upscale it, that file is processed locally on your device and is never transmitted to our
        servers.
      </p>

      <h2 className="mt-8 text-xl font-bold text-gray-900">AI model downloads</h2>
      <p className="text-gray-600">
        The Remove Background and Upscale Image tools download a machine-learning model file the first
        time you use them, so the tool can run locally afterwards. This download does not include your
        image, only the model itself.
      </p>

      <h2 className="mt-8 text-xl font-bold text-gray-900">Cookies and advertising</h2>
      <p className="text-gray-600">
        We use Google AdSense to display ads. Google and its partners may use cookies to serve ads based
        on your prior visits to this or other websites. You can opt out of personalized advertising by
        visiting Google's Ads Settings.
      </p>

      <h2 className="mt-8 text-xl font-bold text-gray-900">Contact</h2>
      <p className="text-gray-600">Questions about this policy can be sent to the site owner.</p>
    </div>
  );
}
