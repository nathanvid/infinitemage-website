# Infinite Mage Website

A Next.js website for the Korean web novel "Infinite Mage" (무한의 마법사) translation project.

## About

This website hosts the English translation of the Korean web novel "Infinite Mage" by Kim chi woo and Kiraz (REDICE Studio). The story follows Shirone, who was abandoned at birth but possesses remarkable insight and dreams of becoming a mage in a world that seeks to keep him down.

**Original Source:** [Kakao Page](https://page.kakao.com/content/60910969)

## Features

- **Chapter Reading**: Organized chapter navigation and reading experience
- **SEO Optimized**: Full metadata, Open Graph, and JSON-LD structured data
- **Mobile Responsive**: Optimized for all device sizes
- **Performance**: Built with Next.js 15 and Turbopack for fast loading
- **Modern UI**: Clean design with Tailwind CSS and Radix UI components

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

- `/app` - Next.js 13+ app router pages and layouts
- `/components` - React components (UI, layout, novel-specific)
- `/lib` - Utility functions and chapter management
- `/config` - Site configuration and metadata
- `/content/chapters` - Markdown files for novel chapters

## Configuration

Edit `/config/site.ts` to update:
- Site metadata and SEO settings
- Novel information and status
- Social links and analytics
- Keywords for SEO

## Adding New Chapters

1. Add new markdown files to `/content/chapters/`
2. Follow the naming convention: `chapter-xxxx.md`
3. Include proper frontmatter with title, number, date, and published status

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **Content**: Markdown with gray-matter
- **TypeScript**: Full type safety
- **Performance**: Turbopack for fast builds
