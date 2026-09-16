export const metadata = {
  title: "Terms of Service",
  description: "PixForge terms of service.",
  alternates: { canonical: "/terms" }
};

export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 prose prose-sm">
      <h1 className="text-3xl font-extrabold text-gray-900">Terms of Service</h1>
      <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>

      <p className="text-gray-600">
        PixForge is provided free of charge, "as is", without warranty of any kind. You are responsible
        for the images you process and for having the rights to edit and use them. We are not liable for
        any loss of data or damages arising from the use of this site.
      </p>

      <p className="text-gray-600">
        By using PixForge you agree not to use the tools for unlawful purposes, and you accept that
        features may change or be discontinued at any time.
      </p>
    </div>
  );
}
