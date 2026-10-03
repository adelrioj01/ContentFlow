# Codex Reels Studio

Generador local de vídeos verticales para TikTok, Instagram Reels y YouTube Shorts.
Codex puede investigar tendencias, crear las ideas y escribir un archivo JSON; Remotion convierte ese archivo en un MP4.

## Qué incluye

- Formato vertical 1080 × 1920 a 30 FPS.
- Escenas, colores y duración controlados mediante JSON.
- Texto y subtítulos animados.
- Voz opcional con Edge TTS, sin clave API.
- Música, imágenes y audio propios opcionales.
- Render completamente local con Remotion.

## Instalación

El proyecto usa Bun, que ya está disponible en este equipo:

```powershell
bun install
```

## Uso rápido

1. Edita `content/example.json`.
2. Genera la narración:

```powershell
bun run voice
```

3. Abre la previsualización:

```powershell
bun run studio
```

4. Renderiza el MP4:

```powershell
bun run render
```

El resultado se guarda en `out/video.mp4`.

## Imágenes y música

Guarda imágenes en `public/images` y música en `public/music`. En una escena usa una ruta como `images/foto.jpg`. Para música añade al JSON:

```json
"music": "music/cancion.mp3"
```

Utiliza únicamente material propio o con licencia adecuada para redes sociales.

## Workflow con Codex

Pide a Codex:

> Busca tendencias actuales de [NICHO], selecciona una idea verificable y crea un vídeo de 30 segundos. Actualiza `content/example.json`, genera la voz y renderiza el MP4. No publiques nada.

Codex investigará las tendencias con fuentes actuales, escribirá el guion y producirá el archivo final. La publicación continúa siendo manual.
