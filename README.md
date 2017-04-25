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
$ bja -h

  Usage: bja [options] <dir>

  Braindead Json Api

  Options:

    -h, --help                        output usage information
    -V, --version                     output the version number
    -p, --port [port]                 Port to listen
    -a, --ip [ip]                     IP address to listen
    -P, --prefix [prefix]             Prefix for api
    -l, --log                         Log HTTP requests
    --update-method [updateMethod]    HTTP method for partial update
    --replace-method [replaceMethod]  HTTP method for replace
    -R, --routes [routes]             Custom HTTP routes

```

`<dir>` should contain folders and json files. For example, if the content of your `<dir>` looks like this:

```
dir
├── cats
│   └── 53.json
└── cats.json
```

With the default config you will have following endpoints:

- `GET /cats` - will return the content of `<dir>/cats.json`
- `GET /cats/53` - will return the content of `<dir>/cats/53.json`

### Update and replace methods

By default the HTTP method used to update the document is `PATCH` and for the full replace with the request is `PUT`.
You can change them by specifying `--update-method` and `--replace-method` arguments accordinglyy.


### Custom routes

If you want to provide custom routes which cannot be mapped to the folder structure you can provide `json` or `js` file
which will export an array with the following structure:

- Each array item describes one route
- Route has the following structure:

```js
{
    route: <route path>,
    method: <route method (GET, POST, PUT, etc),
    response: <path to the response json file without .json extension>,
    statusCode: <status code, 200 by default>
}
```

An example of route:

```js
{
    route: '/auth/login/',
    method: 'POST',
    response: '_custom/login',
    statusCode: 200
}
```

Response JSON file is relative to the specified `<dir>`. In this case the response file should be located in
`<dir>/_custom/login.json`


### Disclaimer

I thing you understand that you *SHOULD NOT USE THIS ON PRODUCTION BY ALL MEANS*.

## License

MIT


