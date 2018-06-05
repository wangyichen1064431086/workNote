# Events

 <https://nodejs.org/dist/latest-v9.x/docs/api/events.html>

中文文档: <http://nodejs.cn/api/events.html>

```js
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => { //register listeners
  console.log('an event occurred!');
});
myEmitter.emit('event');//trigger the event
```