import { MongoClient } from "mongodb";

const options = {};

let client;
let clientPromise;

// Lazily create the connection so importing this module does NOT throw
// during `next build` (page-data collection) when MONGODB_URI is absent.
// The error is only raised when a connection is actually requested at runtime.
function getClientPromise() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  if (clientPromise) {
    return clientPromise;
  }

  const uri = process.env.MONGODB_URI;

  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so the value
    // is preserved across module reloads caused by HMR
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, create a new client
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  return clientPromise;
}

// Backwards-compatible default export: a thenable that resolves the lazy
// connection. Existing code doing `await clientPromise` keeps working,
// but the connection is only established when actually awaited at runtime.
const lazyClientPromise = {
  then(onFulfilled, onRejected) {
    return getClientPromise().then(onFulfilled, onRejected);
  },
  catch(onRejected) {
    return getClientPromise().catch(onRejected);
  },
  finally(onFinally) {
    return getClientPromise().finally(onFinally);
  },
};

export default lazyClientPromise;
