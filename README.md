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
