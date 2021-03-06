# azure-swa-learning

Learn Azure Static Web App (i.e. Netlify/Jamstack) + Azure Postgres + Other things

Started out as ECE Memory Sharer type app but ended up a cross-social-app posting thing.

## Dev

1. Start dev web server: `npm run dev`
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

1. Create new flyway migration file in /db/migrations
1. Local dev migrations are done during `npm run db`
1. Live dev migrations are done during deploy in `/home/mattmoore/Code/ece-connect-client/.github/workflows/azure-static-web-apps-thankful-river-02dfee710.yml`
1. NOTE: Flyway migrations will fail if Azure PG instances are not running, thus code cannot be merged unless PG instances are turned on.

## Settings

1. Values in `local.settings.json` must be pushed or manually entered into Azure Static Web App configuration

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "PGUSER": "postgres",
    "PGHOST": "localhost",
    "PGDATABASE": "ececonnect",
    "PGPORT": "5432"
  }
}
```

## Database

1. Create database called `ececonnect` manually in staging, prod and local dev.

## TODO

1. Make ASWA staging settings the same as last staging settings and not same as prod
1. Put reply url of staging envs in AAD config to make auth work in staging
1. Make user schema that holds social media auth keys
1. Use user's social media auth keys to make posts
1. Linting
1. Client-side analytics

## TODO LONG TERM

1. Move from Managed Functions to BYOFunctions so that we can limit IP address range in firewall to Database
1. Lockdown PG (Separate db owner doing migrations and db user used by API to query db)
1. Move dupe dbuser and dbpassword in github actions...it's in ASWA config as well...maybe this is ok?  Or move all secrets to Azure Vault?
