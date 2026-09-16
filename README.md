# PixForge — Free Online Image Tools

10+ browser-based image tools (Compress, Resize, Crop, Convert, Rotate, Watermark, Meme Generator,
HTML to Image, AI Remove Background, AI Upscale) built with **Next.js 14 (App Router)** + **Tailwind CSS**.
Everything runs client-side — no backend, no file upload to any server, so hosting stays free forever.

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
5. **Deploy** button dabayein — 1-2 minute mein live link mil jayega, e.g. `https://pixforge.vercel.app`.

Har baar jab aap GitHub par naya commit push karenge, Vercel khud-ba-khud dobara deploy kar dega.

---

## 4. Apna domain / URL update karna (SEO ke liye zaroori)

Deploy hone ke baad jo bhi final URL mile (Vercel ka ya apna custom domain), ye 2 jagah update kar dein:

- `app/layout.js` → `metadataBase: new URL("https://your-real-url.com")`
- `app/sitemap.js` → `const base = "https://your-real-url.com"`
- `public/robots.txt` → sitemap line update karein

---

## 5. AdSense

- `public/ads.txt` mein aapki publisher ID already daal di gayi hai:
  `google.com, pub-2006445566626425, DIRECT, f08c47fec0942fa0`
- AdSense script `app/layout.js` mein already add hai (`ca-pub-2006445566626425`).
- Har page mein `<AdSlot slot="..." />` component use ho raha hai — AdSense dashboard se apni asal
  ad-unit IDs banayein aur `slot` prop mein replace kar dein taake real ads show hon (abhi placeholder
  numbers hain).
- **Note:** Google AdSense approval ke liye zaroori hai ke site live ho, original content ho, aur
  Privacy Policy / Terms pages hon (neeche dekhein).

---

## 6. SEO checklist (already included)

- Har tool page ka apna unique `<title>` aur meta description (`app/<tool>/page.js` mein `metadata` export)
- Auto-generated `sitemap.xml` (`app/sitemap.js`)
- `robots.txt` (`public/robots.txt`)
- Open Graph + Twitter card tags (`app/layout.js`)
- Semantic headings (`h1`, `h2`) har page par
- Mobile-responsive design (Tailwind)

**Aapko baad mein khud karna hoga:**
- Google Search Console mein site verify karke sitemap submit karna
- Har tool page ke liye thoda zyada unique content/FAQ likhna (jitna zyada original text, utni behtar ranking)
- Real backlinks banana

---

## 7. Project structure

```
app/
  layout.js          → global SEO metadata + AdSense script
  page.js             → homepage with tool grid
  sitemap.js           → auto sitemap.xml
  compress-image/      → each tool = page.js (metadata) + Client.js (logic/UI)
  resize-image/
  crop-image/
  convert-image/
  rotate-image/
  watermark-image/
  meme-generator/
  html-to-image/
  remove-background/   → AI (@imgly/background-removal)
  upscale-image/       → AI (upscaler + tensorflow.js, with canvas fallback)
components/
  Navbar.js, Footer.js, Uploader.js, ToolCard.js, AdSlot.js
lib/
  downloadFile.js       → shared helpers (download, load image, format bytes)
public/
  ads.txt, robots.txt
```

---

## 8. Notes on the AI tools

- **Remove Background** uses `@imgly/background-removal`, which downloads a segmentation model
  (~80MB) once and runs it fully in the browser via WebAssembly. First use is slower; later uses are
  cached by the browser.
- **Upscale Image** uses `upscaler` + `@tensorflow/tfjs`. If the model can't load (slow connection,
  older browser), it automatically falls back to a smooth 2x canvas resize so the tool never breaks.

Both are 100% free/open-source and need no API key.

---

## 9. Adding a new tool later

1. `mkdir app/new-tool-name`
2. Create `page.js` (export `metadata`) and `Client.js` ("use client" + your logic)
3. Add a link in `components/Navbar.js`, a card in `app/page.js`, and a route in `app/sitemap.js`
