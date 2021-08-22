# ece-connect-client

Azure Static Web App + local dev config flow

## Dev

1. Start dev web server: `npm run start`
1. Start local db via (in another terminal): `npm run db`
1. Start dev Azure functions host (in another terminal): `npm run api`
1. Start Azure Static Web App emulator (in another terminal): `npm run azure:emu`
1. Hit webapp through emulator at `http://localhost:4280/`
1. Hit api through emulator at `http://localhost:4280/api/`
1. Reset db (data and password) via deleting Docker volume as specified in `db/start_dev.sh`

## Deployment

1. Creating PR triggers deploy to staging via github workflow
1. Merging PR to `main` branch triggers deploy to production via github workflow

## API

1. Add API method using Azure Static Web Apps Extension --> Create Function

## Migrations

## Settings

1. Values in `local.settings.json` must be pushed or manually entered into Azure Static Web App configuration

## TODO

1. Complete setup of live functions using ssl connections with live db instance
1. Setup migrations to run locally in dev
1. Setup migrations to run when pushed to prod and staging

1. Application config
1. Application settings
1. Authentication
1. Authorization
1. Linting

## LONG TERM TODO

1. Move from Managed Functions to BYOFunctions so that we can limit IP address range in firewall to Database