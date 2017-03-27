# elm-css-brunch

Compile your [elm-css](https://github.com/rtfeldman/elm-css) stylesheets with Brunch.


## Quickstart

Follow the [instructions](https://github.com/rtfeldman/elm-css#approach-2-generating-css-files) in the elm-css README to set up an Elm program that is
responsible for compiling your stylesheets.  This code will likely go in a file
called Stylesheets.elm.

Install this plugin (with yarn or npm):

```
yarn add -D elm-css-brunch
```

Add a plugin config to your brunch-config.js telling the plugin where to find
your Stylesheets.elm.

```js
plugins: {
  elmCss: {
    sourcePath: 'elm/Stylesheets.elm'
  }
  ...
}
```


## Configuration

The implementation was mostly copied from the elm-css executable.  You can pass
the same [configuration options](https://github.com/rtfeldman/elm-css/blob/master/elm-css.js#L12-L16) as you would there.

For example, to configure the `outputDir` (which defaults to "css/" in the
current directory):

```js
outputDir: '../priv/static/'
```

You may also specify a pattern to watch for re-triggering elm-css.

Example:

```js
pattern: /Styles.elm/
```

If you do not specify a pattern, a new elm-css build will be triggered every
time a .elm file is written.


## License

MIT
