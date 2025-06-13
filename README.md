# Smarthylle Monorepo

Dette er en monorepo som inneholder:

- **apps/web**: Hovedsiden (smarthylle.xyz)
- **apps/application**: Smarthylle-appen (smarthylle.xyz/application)

## Utvikling

\`\`\`bash
# Installer avhengigheter
npm install

# Start hovedsiden
npm run dev

# Start applikasjonen
npm run dev:app

# Bygg alt
npm run build
\`\`\`

## Deployment

Deploy til Vercel ved å koble til dette repository. Vercel vil automatisk:

- Bygge begge appene
- Sette opp routing så hovedsiden vises på `/` og appen på `/application`

## Struktur

- `smarthylle.xyz` → Hovedsiden
- `smarthylle.xyz/application` → Smarthylle-appen
