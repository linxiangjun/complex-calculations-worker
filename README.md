# complex-calculations-worker

Use Web workers to allow complex computing without affecting page performance

## Install

```bash
npm install complex-calculations-worker
```

## Usage

```js
import { useWorker } from 'complex-calculations-worker'

useWorker(event).then(res => {
  // do something
});
```

## Example

### without web worker

```js
const runTime = Date.now();
console.log(runTime);

for (let i = 0; i < 10000000; i++) {
// do something
}

console.log(Date.now() - runTime); // 10 milliseconds or more
```

### use web worker

```js
const runTime = Date.now();
console.log(runTime);

useWorker(() => {
  for (let i = 0; i < 10000000; i++) {
    // do something
  }
  return 'finish';
}).then(res => {
  console.log(res);
});

// time
console.log(Date.now() - runTime); // within 5 milliseconds
```
