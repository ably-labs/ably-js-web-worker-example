# `ably-js` Web Worker example

This provides a simple example of how to use [`ably-js`](https://github.com/ably/ably-js) from within a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), following the instructions in `ably-js`’s `README`.

It was written for manually testing the Webpack version 5 migration in https://github.com/ably/ably-js/issues/1184, but I think serves as a generally useful example.

## Usage

### How to run it

1. Copy `.env.example` to `.env`, and replace `insert_key_here` with your Ably API key.
2. Run `npm install`.
3. Run `npm run serve`. This will launch a web browser.

### Expected results after running

You should see the following log messages in your browser’s console (the last two may appear in the opposite order):

- `Hello World, from worker!`
- `Attached to channel`
- `Published to Ably`
- `Got message from Ably`

### Using modular variant of the library

See [worker-modular.js](./src/worker-modular.js) for the example on how to use [modular variant](https://github.com/ably/ably-js/tree/integration/v2?tab=readme-ov-file#modular-tree-shakable-variant) of `ably-js` library.

Uncomment next line in [index.js](./src/index.js) to create a Web Worker using modular variant:

```javascript
// new Worker(new URL('./worker-modular.js', import.meta.url));
```

## Testing a non-published version of `ably-js`

These steps use `npm pack`, which emits a `.tgz` file similar to that uploaded by `npm publish`.

1. Check out the `ably-js` repository at the commit you wish to test.
2. At the root of the `ably-js` repository, run `npm run build && npm pack --pack-destination <path>`, where `<path>` is the directory you wish to output the `.tgz` file to.
3. In the current repository, change the `package.json`’s `dependencies.ably` entry to `"file:<tgz-file-path>"`, where `<tgz-file-path>` is the path to the `.tgz` file output by the previous step.
4. Run `npm install`.
