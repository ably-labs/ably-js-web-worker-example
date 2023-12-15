// Taken from "WebWorkers" in https://github.com/ably/ably-js#supported-platforms
import {
  BaseRealtime,
  WebSocketTransport,
  FetchRequest,
  RealtimePresence,
  Rest,
} from 'ably/modules';

console.log('Hello World from modular worker!');

const key = process.env.ABLY_KEY;

if (key === undefined || key.length === 0) {
  throw Error('ABLY_KEY not set in .env file. See README for instructions.');
}

const realtime = new BaseRealtime(
  { key },
  {
    WebSocketTransport,
    FetchRequest,
    RealtimePresence,
    Rest,
  }
);

const channel = realtime.channels.get('someChannel');

channel
  .attach()
  .then(() => {
    console.log('Attached to channel');

    channel.subscribe((message) => {
      console.log('Got message from Ably: ', message);
    });

    return channel.publish('someName', { foo: 'bar-modular' });
  })
  .then(() => console.log('Published to Ably'))
  .catch((error) => console.log('Caught error: ', error));
