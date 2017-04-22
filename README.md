# braindead-json-api
Very straightforward JSON serving server.

Created to work offline when API server is not available. Just put your JSON response files in `./db` folder and do `npm start`.

## Usage

To start the server on default port (3000).
```bash
npm start
```

I thing you understand that you *SHOULD NOT USE THIS ON PRODUCTION BY ALL MEANS*.

## Settings

Settings is implemented using ENVIRONMENT variables.

- `BJA_API_FOLDER` the path of your JSON files. Default is `./db`
- `BJA_API_PREFIX` prefix of the path to server your JSON files. Default is `/api`
- `BJA_PORT` port to listen on. Default is `3000`.

You can put your configs in `.env` file if you want to persist them.

## License

MIT


