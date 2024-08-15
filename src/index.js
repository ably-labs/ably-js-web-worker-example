console.log('Hello World!');

// https://webpack.js.org/guides/web-workers/
// new Worker(new URL('./worker.js', import.meta.url));
// new Worker(new URL('./worker-modular.js', import.meta.url));

import Ably from 'ably';

const key = process.env.ABLY_KEY;

if (key === undefined || key.length === 0) {
  throw Error('ABLY_KEY not set in .env file. See README for instructions.');
}

const realtime = new Ably.Realtime({
  key,
  transports: ['web_socket'],
  logLevel: 2,
});

setInterval(() => {
  console.info('STATE: ' + realtime.connection.state);
}, 2000);

const channel = realtime.channels.get('someChannel');

channel
  .attach()
  .then(() => {
    console.log('Attached to channel');

    channel.subscribe((message) => {
      console.log('Got message from Ably: ', message);
    });

    return channel.publish('someName', { foo: 'bar' });
  })
  .then(() => console.log('Published to Ably'))
  .catch((error) => console.log('Caught error: ', error));
