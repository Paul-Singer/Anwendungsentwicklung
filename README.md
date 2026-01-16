# GHCN Temperatur-App (Frontend + Backend)

Dieses Repo enthaelt eine Browser-GUI (SPA) und ein Node/Express-Backend
fuer die NOAA GHCN Daily Daten.

## Architektur und Plattform
- Client: SPA im Browser (Chrome/Firefox, aktuelle Versionen).
- Server: Node/Express im Docker-Container, optional mit statischer GUI-Auslieferung.
- Zielsystem: Windows 11 (Docker Desktop + aktueller Browser).

## Datenquelle
- Quelle: https://noaa-ghcn-pds.s3.amazonaws.com
- Metadaten: `ghcnd-stations.txt`, `ghcnd-inventory.txt`
- Tagesdaten: `csv/by_station/<station>.csv`

Das Backend laedt Metadaten automatisch, baut daraus eine SQLite-Datenbank
und laedt Stationsdateien bei Bedarf nach.

## Backend starten (lokal)
```bash
npm install
npm run sync:metadata   # optional: Metadaten vorab laden
npm start
```

Standardmaessig laeuft das Backend auf `http://localhost:8080`.
Wenn `SERVE_STATIC=1`, liefert der Server die GUI mit aus
(`http://localhost:8080` im Browser oeffnen).

## Wichtige Umgebungsvariablen
Siehe `.env.example`:
- `DATA_DIR` Speicherort fuer Metadaten, DB und Tagesdateien
- `CORS_ORIGIN` erlaubte Origins (z. B. GitHub Pages)
- `GHCN_BASE_URL` NOAA S3 Basis-URL
- `GHCN_DAILY_PATH` Unterordner fuer Tagesdateien (Standard: `csv/by_station`)
- `GHCN_DAILY_EXT` Dateiendung fuer Tagesdateien (Standard: `csv`)
- `CACHE_TTL_MINUTES` / `SEARCH_CACHE_TTL_MINUTES` Cache-Timeouts

## API
- `GET /stations?lat=..&lon=..&radius=..&start=..&end=..&limit=..`
- `GET /station/{id}/data?start=YYYY&end=YYYY`
- `GET /health`

## Frontend ueber GitHub Pages
GitHub Pages hostet nur das Frontend. Das Backend muss separat erreichbar
sein (HTTPS, sonst blockt Chrome).

1) Repo pushen
2) GitHub: `Settings` -> `Pages` -> Branch `main`, Folder `/ (root)`
3) URL: `https://<user>.github.io/<repo>/`

Im `index.html` die Backend-URL setzen:
```html
<body data-api-base="https://dein-backend.example.com">
```

## Docker
```bash
docker build -t ghcn-backend .
docker run -p 8080:8080 -e SERVE_STATIC=1 ghcn-backend
```

Oder via Compose:
```bash
docker compose up --build
```

## Autostart unter Windows 11
1) Docker Desktop so einstellen, dass es beim Login startet.
2) Task einmalig anlegen:
```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/windows/register-task.ps1
```

Der Task startet `docker compose up -d` beim Login.
Falls "Zugriff verweigert" erscheint, PowerShell als Administrator starten
und den Befehl erneut ausfuehren.

## CI/CD
Der GitHub Actions Workflow:
- Fuehrt Tests aus
- Baut das Docker-Image
- Pusht nach GHCR (bei `main`)

## Hinweise zur Bewertung
- Datenhaltung: SQLite fuer Metadaten, Dateicache fuer .csv
- Caching: Such- und Ergebnis-Caches (TTL)
- Effizienz: Bounding-Box + Haversine, Streaming-Parser
- Testbarkeit: Parser- und Geo-Tests im `tests/`
