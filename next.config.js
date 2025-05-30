/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Migliora le performance
  images: {
    domains: ['images.unsplash.com', 'cdn.example.com'], // Aggiungi domini immagine esterni se usati
  },
  env: {
    NEXT_PUBLIC_OPENAI_KEY: process.env.NEXT_PUBLIC_OPENAI_KEY, // Variabile API visibile client-side
  },
  output: 'standalone', // Essenziale per deploy su Render o server personalizzati
};

module.exports = nextConfig;

