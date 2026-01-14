# GHCN GUI ueber GitHub Pages

Diese GUI kann ueber GitHub Pages veroeffentlicht werden. GitHub Pages hostet
nur das Frontend. Das Backend muss separat oeffentlich erreichbar sein (HTTPS)
und CORS fuer die Pages-Domain erlauben.

## Deployment (Pages)
1) Neues GitHub-Repository anlegen.
2) Dateien pushen (`index.html`, `styles.css`, `app.js`).
3) In GitHub: `Settings` -> `Pages` -> `Build and deployment`
   - Source: `Deploy from a branch`
   - Branch: `main` und Folder: `/ (root)`
4) Nach dem Deploy ist die Seite unter
   `https://<user>.github.io/<repo>/` erreichbar.

## Backend-URL setzen
GitHub Pages und dein Backend sind getrennt. Trage die Backend-URL in
`index.html` ein:

```
<body data-api-base="https://dein-backend.example.com">
```

Wichtig: Die Backend-URL muss HTTPS sein, sonst blockt Chrome die Requests.

## CORS
Das Backend muss `https://<user>.github.io` in CORS erlauben, sonst werden
die API-Requests blockiert.
