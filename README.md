# ece-connect-client

Azure Static Web App + local dev config flow

## Dev

1. Start dev web server: `npm run start`
1. Start local db via: `npm run db`
1. Start dev Azure functions host (in another terminal): `npm run api`
1. Start Azure Static Web App emulator (in another terminal): `npm run azure:emu`
1. Hit webapp at `http://localhost:4280/`
1. Hit api at `http://localhost:4280/api/`
1. Reset db via deleting Docker volume as specified in `db/start_dev.sh`

## Deployment

1. Creating PR triggers deploy to staging via github workflow
1. Merging PR to `main` branch triggers deploy to production via github workflow

## API

1. Add API method using Azure Static Web Apps Extension --> Create Function
1. 

## Migrations


## TODO

1. Setup `localsettings.json` to have env vars of local db creds passed into local Functions
1. Modify HelloWorld function to call into database
1. Setup env vars of live db creds sent into prod/staging Funcions + deal with 
1. setup migrations to run locally and when deployed
1. Validate data in live database is being rendered (start live db)

1. application config -> 
1. application settings
1. Authentication
1. Authorization of 