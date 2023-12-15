console.log('Hello World!');

// https://webpack.js.org/guides/web-workers/
new Worker(new URL('./worker.js', import.meta.url));
// new Worker(new URL('./worker-modular.js', import.meta.url));
