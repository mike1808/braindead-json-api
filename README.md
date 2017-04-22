# braindead-json-api
Very straightforward JSON serving server.

Created to work offline when API server is not available. Just put your JSON response files in `./db` folder and do `npm start`.

## Installation

This app  requires node v7.6.0 or higher for ES2015 and async function support.
```bash
$ npm install -g braindead-json-api
```


## Usage

```bash
$ bja  -h

    Usage: bja [options] <dir>

    Braindead Json Api

    Options:

      -h, --help             output usage information
      -V, --version          output the version number
      -p, --port [port]      Port to listen
      -a, --ip [ip]          IP address to listen
      -P, --prefix [prefix]  Prefix for api

```

`<dir>` should contain folders and json files. For example, if the content of your `<dir>` looks like this:

```
dir
├── cats
│   └── 53.json
└── cats.json
```

With the default config you will have following endpoints:

`GET /cats`
`GET /cats/53`


### Disclaimer

I thing you understand that you *SHOULD NOT USE THIS ON PRODUCTION BY ALL MEANS*.


## Settings

Settings is implemented using ENVIRONMENT variables.

- `BJA_API_FOLDER` the path of your JSON files. Default is `~/json-db`
- `BJA_API_PREFIX` prefix of the path to server your JSON files. Default is `/api`
- `BJA_PORT` port to listen on. Default is `3000`.

You can put your configs in `.env` file if you want to persist them.

## License

MIT


