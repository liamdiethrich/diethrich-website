# Composer Portfolio Placeholder (Next.js + TypeScript + Tailwind)

This project recreates the layout rhythm and UX pattern of a composer portfolio using original code and placeholder content.

## Stack

- Next.js App Router + TypeScript
- TailwindCSS
- Static content models in `/content/*.ts`
- Web Audio API layered intensity demo on `/game-music`

## Run locally

```bash
npm install
npm run dev
```

## Implemented routes

- `/` Home
- `/film-music`
- `/film-music/[slug]`
- `/game-music`
- `/about`

## Audio layer demo

Mandatory files are stored in:

- `/public/audio/intensity-demo/Diethrich.Liam.Combat.Layer.Three.Ambient.wav`
- `/public/audio/intensity-demo/Diethrich.Liam.Combat.Layer.Two.Intense.wav`
- `/public/audio/intensity-demo/Diethrich.Liam.Combat.Layer.Three.Combat.mp3`

The layered crossfade mapping is editable in `/content/gameMusic.ts`.

## Replace placeholders checklist

- [ ] Update site branding/nav/social/contact links in `/content/site.ts`
- [ ] Replace home hero title/subtitle placeholder copy in `/app/page.tsx`
- [ ] Replace featured media placeholders on Home with real assets
- [ ] Add real film items/embed URLs in `/content/filmMusic.ts`
- [ ] Add real game project descriptions/images/tracks in `/content/gameMusic.ts`
- [ ] Keep `/game-music` layered intensity track pointed at the 3 audio files unless intentionally changed
- [ ] Replace About page TODO bio copy in `/app/about/page.tsx`
- [ ] Replace portrait placeholder on About page
- [ ] Replace any remaining IMAGE/VIDEO/AUDIO placeholder labels across the site
- [ ] Update footer text if needed in `/components/Footer.tsx`
