import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF primero: a igual peso conserva más detalle que WebP.
    formats: ["image/avif", "image/webp"],
    // 75 para el resto del sitio, 90 para las fotos del hero.
    qualities: [75, 90],
  },
  // La versión blanca pasó a ser la portada: el link viejo lleva ahí
  async redirects() {
    return [{ source: "/claro", destination: "/", permanent: true }];
  },
};

export default nextConfig;
