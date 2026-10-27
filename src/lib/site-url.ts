/**
 * URL pública del sitio, para los metadatos.
 * Una variable definida pero vacía rompía el build, porque `??` no cubre la
 * cadena vacía y `new URL("")` lanza. Acá se descarta cualquier valor que no
 * sirva y se cae a la URL que Vercel expone, o al dominio propio.
 */
export function resolveSiteUrl(): URL {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
    "https://gztraining.com.ar",
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;
    try {
      return new URL(/^https?:\/\//.test(value) ? value : `https://${value}`);
    } catch {
      // valor mal formado: se prueba el siguiente
    }
  }

  return new URL("https://gztraining.com.ar");
}
