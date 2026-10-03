from __future__ import annotations

import asyncio
import json
import sys
from pathlib import Path

import edge_tts


async def main() -> None:
    if len(sys.argv) not in {3, 4}:
        raise SystemExit(
            "Uso: python scripts/generate_voice.py <contenido.json> <salida.mp3> [voz]"
        )

    source = Path(sys.argv[1]).resolve()
    destination = Path(sys.argv[2]).resolve()
    voice = sys.argv[3] if len(sys.argv) == 4 else "es-ES-AlvaroNeural"
    payload = json.loads(source.read_text(encoding="utf-8"))
    narration = str(payload.get("narration", "")).strip()
    if not narration:
        raise SystemExit("El JSON no contiene una narración válida")

    destination.parent.mkdir(parents=True, exist_ok=True)
    await edge_tts.Communicate(narration, voice=voice).save(str(destination))
    print(f"Voz generada: {destination}")


if __name__ == "__main__":
    asyncio.run(main())
