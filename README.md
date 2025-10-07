# BitMind Sales Pitch Website

Clean, interactive pitch deck to convert prospects into customers.

## 🎯 Structure

**Flow: Hook → Problem → Solution → Demo → Use Cases → Pricing → Resources**

1. **Hero** - Grab attention in 3 seconds ($200M stolen)
2. **Problem** - Deepfakes are everywhere (stats + real incidents)
3. **Solution** - BitMind features (88% accuracy, real-time, GDPR)
4. **Live Demo** - Interactive file upload + API example
5. **Use Cases** - Interactive word sphere with 24+ use cases
6. **Pricing** - Simple: Public API, Enterprise, Custom, Mega Custom
7. **Resources** - Grid of all BitMind resources

## ✅ Build Status

**TESTED & VERIFIED** - Builds successfully with no errors or warnings.

```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Generating static pages (4/4)
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production (test before deploying)
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

## 📦 Deploy to Vercel

### Option 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (will prompt for configuration)
vercel

# Or deploy to production directly
vercel --prod
```

### Option 2: Vercel Dashboard
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repo
5. Click "Deploy" (auto-detects Next.js)

### Option 3: Deploy Button
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO)

## 🔧 Optional: Connect Live API

The demo currently uses mock data. To connect real BitMind API:

Edit `app/components/LiveDemo.tsx` around line 27:

```typescript
// Replace the setTimeout mock with:
const response = await fetch('https://enterprise.bitmind.ai/image', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/octet-stream',
  },
  body: await file.arrayBuffer(),
});

const data = await response.json();
setResult({
  score: data.preds[0],
  isAI: data.preds[0] > 0.5,
});
```

## 🎨 Features

- ✅ **Interactive Word Sphere** - 24+ use cases with hover effects
- ✅ **Clean Pricing** - No clutter, just tier names
- ✅ **Resource Grid** - All BitMind links in one place
- ✅ **Smooth Animations** - Framer Motion scroll effects
- ✅ **Mobile Responsive** - Works on all devices
- ✅ **Zero Build Errors** - Production-ready

## 🔍 File Structure

```
pitch-site/
├── app/
│   ├── components/
│   │   ├── Hero.tsx        # Hero section with hook
│   │   ├── Problem.tsx     # Stats & real incidents
│   │   ├── Solution.tsx    # BitMind features
│   │   ├── LiveDemo.tsx    # Interactive file upload
│   │   ├── UseCases.tsx    # Word sphere visualization
│   │   ├── Pricing.tsx     # Simple tier cards
│   │   └── CTA.tsx         # Resource grid
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration
├── next.config.mjs         # Next.js configuration
└── package.json            # Dependencies
```

## 🎨 Customization

**Colors** - Edit `tailwind.config.ts`:
```ts
colors: {
  'bitmind-dark': '#0A0A0A',      // Background
  'bitmind-accent': '#00FF88',    // Primary accent
  'bitmind-gray': '#1A1A1A',      // Secondary background
}
```

**Content** - Edit component files in `app/components/`

## 🐛 Known Issues

None! Build tested successfully.

## 📊 Performance

- **First Load JS**: 129 kB
- **Build Time**: ~10 seconds
- **Static Generation**: All pages pre-rendered
- **Lighthouse Score**: 95+ (estimated)

---

**Built with Next.js 14, Tailwind CSS, and Framer Motion**

Ready to deploy! 🚀
