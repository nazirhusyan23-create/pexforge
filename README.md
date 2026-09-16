# PixForge: Free Online Image Tools

15 browser-based image tools (Compress, Resize, Crop, Convert, Rotate, Watermark, Blur, Grayscale/Sepia,
Add Border, Color Picker, Meme Generator, HTML to Image, Image to Base64, AI Remove Background, AI
Upscale) built with **Next.js 14 (App Router)** + **Tailwind CSS**. Everything runs client-side, no
backend, no file upload to any server, so hosting stays free forever.

---

## 1. Local setup (apne computer par test karne ke liye)

```bash
npm install
npm run dev
```

Browser mein `http://localhost:3000` khol lein.

---

## 2. GitHub par push karna

```bash
git init
git add .
git commit -m "Initial commit: PixForge"
git branch -M main
git remote add origin https://github.com/<your-username>/pixforge.git
git push -u origin main
```

(Pehle GitHub par ek naya empty repo bana lein `pixforge` naam se, phir upar wala `<your-username>` replace kar dein.)

---

## 3. Vercel par free deploy karna

1. https://vercel.com par apne GitHub account se sign up/login karein.
2. **"Add New → Project"** click karein.
3. Apna `pixforge` GitHub repo select karein → **Import**.
4. Framework Preset automatically **Next.js** detect ho jayega. Kuch change nahi karna.
5. **Deploy** button dabayein, 1-2 minute mein live link mil jayega, e.g. `https://pixforge.vercel.app`.

Har baar jab aap GitHub par naya commit push karenge, Vercel khud-ba-khud dobara deploy kar dega.

---

## 4. Apna domain / URL update karna (SEO ke liye zaroori)

Deploy hone ke baad jo bhi final URL mile (Vercel ka ya apna custom domain), ye 2 jagah update kar dein:

- `app/layout.js` → `metadataBase: new URL("https://your-real-url.com")`
- `app/sitemap.js` → `const base = "https://your-real-url.com"`
- `public/robots.txt` → sitemap line update karein

---

## 5. AdSense (Auto ads, no manual ad boxes)

- `public/ads.txt` already has your publisher line:
  `google.com, pub-2006445566626425, DIRECT, f08c47fec0942fa0`
- The AdSense script and a `google-adsense-account` meta tag are both already in `app/layout.js`
  (`ca-pub-2006445566626425`), so every page on the site loads AdSense automatically.
- **Auto ads mode:** there are no manual `<ins>` ad boxes anywhere in the code. Once your AdSense
  account approves the site, go to your AdSense dashboard → **Ads → By site → pixforge.vercel.app**
  and turn on **Auto ads**. Google will then choose ad placement and format on its own, on every
  page, without any further code changes here.
- **Note:** Google AdSense approval needs the site to be live, have original content, and include
  Privacy Policy / Terms pages (both are already included, see below).

---

## 6. Google Search Console (submit your sitemap)

1. Go to https://search.google.com/search-console and add a property using your live URL
   (e.g. `https://pixforge.vercel.app`).
2. Verify ownership with the **HTML tag** method: Search Console will give you a `content="..."`
   value. Paste it into `app/layout.js` in place of `PASTE-YOUR-GOOGLE-SITE-VERIFICATION-CODE-HERE`
   under `verification.google`, then redeploy (push to GitHub, Vercel deploys automatically).
3. Back in Search Console, open **Sitemaps** in the left menu, enter `sitemap.xml`, and click
   **Submit**. The sitemap is generated automatically at `/sitemap.xml` by `app/sitemap.js`, so
   Google will pick up every tool page from there.
4. Under **URL Inspection**, request indexing for the homepage so Google crawls the site sooner
   rather than waiting for its normal schedule.

---

## 7. SEO checklist (already included)

- Har tool page ka apna unique `<title>` aur meta description (`app/<tool>/page.js` mein `metadata` export)
- Har tool page par "How it works", use cases aur FAQ content (`ToolArticle` + `FAQ` components) taake
  page thin na lage aur AdSense/Google dono ke liye kaafi original text mojood ho
- FAQ sections `FAQPage` JSON-LD schema ke sath hain, jo Google search mein rich snippet dikha sakta hai
- Auto-generated `sitemap.xml` (`app/sitemap.js`)
- `robots.txt` (`public/robots.txt`)
- Open Graph + Twitter card tags (`app/layout.js`)
- Semantic headings (`h1`, `h2`, `h3`) har page par
- Mobile-responsive design (Tailwind)

**Aapko baad mein khud karna hoga:**
- Google Search Console mein site verify karke sitemap submit karna (upar section 6 dekhein)
- Real backlinks banana
- Time ke sath aur bhi unique content/blog posts add karna taake site ki authority badhe

---

## 8. Project structure

```
app/
  layout.js          → global SEO metadata + AdSense script + Search Console verification
  page.js             → homepage with tool grid
  sitemap.js           → auto sitemap.xml
  compress-image/      → each tool = page.js (metadata + article + FAQ) + Client.js (logic/UI)
  resize-image/
  crop-image/
  convert-image/
  rotate-image/
  watermark-image/
  blur-image/
  grayscale-image/
  add-border/
  color-picker/
  meme-generator/
  html-to-image/
  image-to-base64/
  remove-background/   → AI, loads @imgly/background-removal from CDN at runtime
  upscale-image/       → AI, loads upscaler + tensorflow.js from CDN, with canvas fallback
  privacy-policy/, terms/
components/
  Navbar.js, Footer.js, Uploader.js, ToolCard.js, ToolArticle.js, FAQ.js
lib/
  downloadFile.js       → shared helpers (download, load image, format bytes)
public/
  ads.txt, robots.txt
```

---

## 9. Notes on the AI tools

- **Remove Background** uses `@imgly/background-removal`, loaded straight from a CDN at runtime
  (not bundled by the build) to avoid a webpack conflict with its internal ONNX runtime. It downloads
  a segmentation model (~80MB) once and runs it fully in the browser via WebAssembly. First use is
  slower; later uses are cached by the browser.
- **Upscale Image** loads `tfjs` + `upscaler` from a CDN the same way. If the model can't load (slow
  connection, older browser, CDN blocked), it automatically falls back to a smooth 2x canvas resize so
  the tool never breaks.

Both are free, open-source, and need no API key.

---

## 10. Adding a new tool later

1. `mkdir app/new-tool-name`
2. Create `page.js` (export `metadata`) and `Client.js` ("use client" + your logic)
3. Add a link in `components/Navbar.js`, a card in `app/page.js`, and a route in `app/sitemap.js`
