# complex-calculations-worker
Use Web workers to allow complex computing without affecting page performance

#### Usage

```js
import { useWorker } from 'complex-calculations-worker'

useWorker(event).then(res => {
  // do something
});
```
