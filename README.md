# GZ Training · Landing de Giuliana Zitella

Landing page en Next.js 16 (App Router, Turbopack), Tailwind CSS v4 y [Motion](https://motion.dev) para animaciones. Tema oscuro y un solo acento coral tomado de la identidad de GZ Training.

Tipografía en dos niveles: Archivo variable para los titulares (clase `.display`, condensada al 68% de ancho y peso 900; `.display-soft` baja a 450 para contrastar líneas dentro de un mismo titular) e Inter para cuerpo de texto, subtítulos, interfaz y la marca (clases `.display-wide` y `.wordmark`). El ancho máximo de la página vive en una sola clase, `.shell` en `src/app/globals.css`.

## Correr el proyecto

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Configuración

Copiá `.env.example` a `.env.local` y completá:

| Variable | Qué hace |
| --- | --- |
| `NEXT_PUBLIC_CAL_LINK` | Enlace de Cal.com con formato `usuario/evento` (ej. `giulianazitella/llamada`). Sin esta variable la sección "Agendar" muestra un aviso de configuración. |
| `NEXT_PUBLIC_SITE_URL` | Opcional. URL pública del sitio, solo para los metadatos Open Graph. Si falta, se usa la URL que Vercel expone para el deploy. No la dejes definida y vacía en Vercel: borrala del proyecto o cargale el dominio real. |

Datos de contacto, redes y textos de navegación: `src/lib/site.ts`.

## Contenido a reemplazar antes de publicar

- **Testimonios y cambios físicos** (`src/lib/content.ts`): el primer caso es real (proceso de Giuliana). Los casos con `sample: true` son ejemplos de estructura y se muestran etiquetados como "Testimonio de ejemplo". Cargar nombre, texto y, si hay, fotos `before` / `after` en `public/images`.
- **Textos sobre Giuliana** (`src/components/About.tsx`, `src/components/Faq.tsx`): revisar afirmaciones (disciplinas, embarazo, El Talar) con ella.
- **Planes** (`src/components/Services.tsx`): agregar precios si se quieren mostrar.

## Fotos

Las fotos en `public/images` provienen del Instagram de Giuliana (@giulianazitella) y se usan con su permiso como dueña del sitio. En `assets/instagram-extra` hay más fotos descargadas que no se usan en la página, listas para intercambiar.

## Estructura

```
src/app/            layout (fuente, metadatos) y página principal
src/components/     una sección por archivo: Nav, Hero, PhotoMarquee, Services,
                    Method, About, AppSection, Results, Booking, Faq, Footer
src/components/motion/Reveal.tsx   wrapper de aparición al hacer scroll
src/lib/site.ts     constantes del sitio (WhatsApp, Instagram, Cal, navegación)
src/lib/content.ts  testimonios y preguntas frecuentes
```

## Animaciones

Todas las animaciones respetan `prefers-reduced-motion`. Hero con stagger y parallax por scroll, línea de progreso en "Así trabajamos", comparador antes/después arrastrable, acordeón en preguntas, menú móvil con AnimatePresence.

## Deploy

Proyecto estático listo para Vercel: `vercel deploy`. Recordá cargar las variables de entorno en el proyecto de Vercel.
