# ece-connect-

## Dev

1. Start dev web server: `npm run start`
1. Start dev Azure functions host (in another terminal): `npm run api`
1. Start Azure Static Web App emulator: `npm run azure:emu`
1. Hit webapp at `http://localhost:4280/`
1. Hit api at `http://localhost:4280/api/HelloWorld`

## Deployment

1. Creating PR triggers deploy to staging via github workflow
1. Merging PR to `main` branch triggers deploy to production via github workflow