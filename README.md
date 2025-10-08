# 🚀 Portfolio - Abhi Surya Nugroho

Portfolio website pribadi yang menampilkan project, skills, dan informasi profesional saya sebagai Fullstack Developer.

![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Fitur

- 🎨 **Modern UI/UX** - Desain yang clean dan responsive
- 🌊 **Liquid Glass Effects** - Efek glassmorphism yang smooth dengan @liquidglass/react
- ⚡ **Smooth Animations** - Menggunakan Framer Motion & GSAP
- 🎯 **Interactive Particles** - Background particles dengan Three.js
- 📱 **Fully Responsive** - Optimized untuk semua devices
- 🌙 **Theme Support** - Context-based theme management
- 🚀 **Performance Optimized** - Built with Next.js 15 App Router

## 🛠️ Tech Stack

### Core
- **Next.js 15.4.5** - React Framework dengan App Router
- **React 19.1.0** - UI Library
- **Tailwind CSS v4** - Utility-first CSS Framework

### Animation & Effects
- **Framer Motion 12.23.12** - Animation library
- **GSAP 3.13.0** - Professional-grade animation
- **Three.js 0.179.1** - 3D graphics & particles
- **Liquid Glass React 1.1.1** - Glassmorphism effects

### UI Components
- **Lucide React 0.539.0** - Icon library
- **React Icons 5.5.0** - Additional icons

## 📂 Struktur Project

```
porto/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.js          # Root layout dengan ThemeProvider
│   │   ├── page.js            # Main page component
│   │   └── globals.css        # Global styles & Tailwind
│   │
│   ├── components/
│   │   ├── navigation/        # Navigation components
│   │   │   └── BottomNavbar.js    # Bottom navigation bar dengan liquid glass
│   │   │
│   │   ├── particles/         # Particle effects
│   │   │   └── BgParticles.js     # Background particle system
│   │   │
│   │   ├── sections/          # Page sections
│   │   │   ├── Hero.js            # Hero section dengan animasi
│   │   │   ├── AboutMe.js         # About me section
│   │   │   ├── WhatIDo.js         # Services/expertise
│   │   │   ├── Skills.js          # Technical skills
│   │   │   └── Footer.js          # Footer dengan social links
│   │   │
│   │   └── ui/                # Reusable UI components
│   │       └── Button.js          # Custom button component
│   │
│   └── context/
│       └── ThemeContext.js    # Theme management context
│
├── public/
│   └── assets/
│       └── hero/              # Hero section assets
│           ├── profile.jpg        # Profile image
│           ├── awan.gif          # Cloud animation
│           └── matahari.png      # Sun decoration
│
└── Configuration Files
    ├── next.config.mjs        # Next.js configuration
    ├── tailwind.config.mjs    # Tailwind configuration (v4)
    ├── postcss.config.mjs     # PostCSS configuration
    └── eslint.config.mjs      # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 atau lebih tinggi
- npm, yarn, pnpm, atau bun

### Installation

1. Clone repository:
```bash
git clone https://github.com/abhisn15/porto.git
cd porto
```

2. Install dependencies:
```bash
npm install
# atau
yarn install
# atau
pnpm install
```

3. Jalankan development server:
```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

4. Buka [http://localhost:3000](http://localhost:3000) di browser

## 📝 Available Scripts

```bash
# Development server dengan Turbopack
npm run dev

# Build untuk production
npm run build

# Jalankan production build
npm run start

# Lint code
npm run lint
```

## 🎨 Customization

### Theme

Theme dikelola melalui `src/context/ThemeContext.js`:

```javascript
const theme = {
  background: '#FFF9E5',
  text: '#000000',
  yellow: '#FFC107',
  pink: '#FF69B4',
  teal: '#26C6DA'
};
```

### Content

Semua content dapat diubah langsung di component masing-masing:
- **Personal Info**: `src/components/sections/Hero.js`
- **About**: `src/components/sections/AboutMe.js`
- **Services**: `src/components/sections/WhatIDo.js`
- **Skills**: `src/components/sections/Skills.js`
- **Social Links**: `src/components/navigation/BottomNavbar.js` & `src/components/sections/Footer.js`

## 📱 Social Links

- **LinkedIn**: [linkedin.com/in/abhisuryanugroho](https://linkedin.com/in/abhisuryanugroho)
- **GitHub**: [github.com/abhisn15](https://github.com/abhisn15)
- **Email**: abhisuryanu9roho@gmail.com

## 📄 License

© 2025 Abhi Surya Nugroho. All rights reserved.

## 🙏 Acknowledgments

- Desain & Development oleh [Abhi Surya Nugroho](https://github.com/abhisn15)
- Built with ❤️ using Next.js
- "Code with intention, design with compassion"

---

<p align="center">
Made with ☕ and 💻 by Abhi Surya Nugroho
</p>
