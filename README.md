# Dimuthu Mattress - Premium E-Commerce Site

A high-end, catalog-mode e-commerce website for Dimuthu Mattress. Built with Next.js 15, Sanity CMS, and TailwindCSS.

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router)
- **CMS**: Sanity.io (Headless CMS)
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Email**: Nodemailer

## 🎨 Design

- **Color Palette**: Deep Sleep Blue (#1e293b), Gold/Sand (#d4c4a8), Cream (#f8fafc)
- **Typography**: Inter (body), Playfair Display (headings)
- **Aesthetic**: Soft, premium, calming theme

## 📁 Project Structure

```
dimuthu-mattress/
├── app/                    # Next.js App Router pages
│   ├── api/contact/       # Email API endpoint
│   ├── shop/              # Product listing page
│   ├── product/[slug]/    # Product detail pages
│   ├── about/             # About page
│   └── contact/           # Contact page
├── components/            # React components
├── lib/                   # Utilities (Sanity client, queries)
├── sanity/schemas/        # Sanity CMS schemas
└── public/                # Static assets
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root with the following (see ENV_SETUP.md for details):

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-12-11

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=Dimuthu Mattress <noreply@dimuthumattress.com>
EMAIL_TO=admin@dimuthumattress.com
```

### 3. Initialize Sanity Studio

Navigate to the project directory and run:

```bash
npm install sanity @sanity/vision
npx sanity@latest init --env
```

When prompted:
- **Project name**: dimuthu-mattress-cms
- **Dataset**: production
- **Template**: Clean project (we already have schemas)

Then create a `sanity.config.ts` file in the project root:

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'dimuthumattress',
  title: 'Dimuthu Mattress CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
```

### 4. Add Sanity Scripts to package.json

Add these scripts to your `package.json`:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "sanity": "sanity dev",
  "sanity:deploy": "sanity deploy"
}
```

### 5. Run Development Servers

**Terminal 1** - Next.js:
```bash
npm run dev
```

**Terminal 2** - Sanity Studio:
```bash
npm run sanity
```

- Next.js app: http://localhost:3000
- Sanity Studio: http://localhost:3333

## 📊 Adding Content to Sanity

1. Open Sanity Studio at http://localhost:3333
2. Add **Products** with:
   - Title, slug, main image, gallery
   - Price, description, features
   - Comfort level (soft/medium/firm)
   - Available sizes
   - Toggle "Featured" for homepage display
3. Add **Testimonials** with customer reviews
4. Add **Team Members** for the About page

## ✨ Features

### Homepage
- Full-screen hero with gradient overlay
- Featured products (pulls from Sanity)
- USP section (100-night trial, free shipping, eco-friendly)
- Testimonials slider
- CTA sections

### Shop Page
- Product grid with filters
- Filter by comfort level and size
- Real-time filtering

### Product Detail
- Image gallery with thumbnails
- Product description (Portable Text)
- Features list with checkmarks
- Order inquiry modal
- Related products

### About Page
- Brand story
- Mission & values
- Team members (from Sanity)

### Contact Page
- Contact form with validation
- Email integration via Nodemailer
- Contact information display

## 🎭 Animations

- Scroll-reveal animations on all cards (framer-motion)
- Button hover scale effects
- Image zoom on hover
- Smooth page transitions
- Mobile menu slide-in

## 📱 Responsive Design

- Mobile-first approach
- Hamburger menu on mobile
- Responsive grids (1/2/3 columns)
- Touch-friendly interactions

## 🔒 Form Validation

- React Hook Form + Zod schema validation
- Email validation
- Required field checks
- Error messaging

## 📧 Email Setup (Gmail Example)

1. Enable 2FA on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password in `EMAIL_PASSWORD` environment variable
4. Set `EMAIL_USER` to your Gmail address

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

### Sanity Studio Deployment
```bash
npm run sanity:deploy
```

## 📝 License

CloudRest © 2024. All rights reserved.

## 🆘 Support

For questions or support, contact: info@cloudrest.com
