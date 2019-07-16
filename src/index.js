const create = f => {
  if (f instanceof Worker) return f;
  if (typeof f === "string" && f.endsWith(".js")) return new Worker(f);
  if (typeof f === "function") {
    const code = [
      `self.fn = ${f.toString()};`,
      "self.onmessage = (e) => {",
      " const r = self.fn(e.data);",
      " self.postMessage(r);",
      "}"
    ];

    const blob = new Blob(code, { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);

    worker.cleanup = () => {
      URL.revokeObjectURL(url);
      worker.terminate();
    };

    return worker;
  }
};

export const useWorker = (f, i) => {
  const worker = create(f);

  if (!worker) { throw new Error('Need correctly parameter!') }

  worker.postMessage(i);

  return new Promise((resolve, reject) => {
    worker.onmessage = e => {
      if (worker.cleanup) worker.cleanup();
      resolve(e.data);
    };

    worker.onerror = e => {
      if (worker.cleanup) worker.cleanup();
      reject(e.message)
    }

    worker.onmessageerror = () => {
      if (worker.cleanup) worker.cleanup();
      reject(e.message)
    }
  });
};
