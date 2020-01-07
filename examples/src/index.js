import '@babel/polyfill';
import { useWorker } from 'complex-calculations-worker';

// begin time
const runTime = Date.now();
console.log(runTime);

// without web worker
// for (let i = 0; i < 10000000; i++) {
// do something
// }

// use web worker
useWorker(() => {
  for (let i = 0; i < 10000000; i++) {
    // do something
  }
  return 'finish';
}).then(res => {
  console.log(res);
});

// time
console.log(Date.now() - runTime);
