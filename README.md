# useFetch
A React hook that provides data fetching behavior.

## Installation
Install it with npm:
```
npm install use-fetch-hook
```
or with yarn:
```
yarn add use-fetch-hook
```

## Example usage
```javascript
import React from 'react';
import useFetch from 'use-fetch-hook';

const url = "https://myservice.com/api";

function NiceComponent() {
  const [delay, setDelay] = useState(3000);
  const { value, isLoading, error } = useFetch({ url, delay });
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  
  return (
    <>
      <p>{value}</p>;
      <button onClick={() => setDelay(delay + 1000)}>Increase delay</button>
      <button onClick={() => setDelay(delay - 1000)}>Decrease delay</button>
    </>
  );
}
```

## What you can do with useFetch
* Render a loading screen or an error message depending on the state of a request.
* *Dynamically* specify a delay in milliseconds between requests. Internally, it uses another hook, `useInterval`, the code for which is taken from [this post](https://overreacted.io/making-setinterval-declarative-with-react-hooks/#just-show-me-the-code).
* Specify a custom function that performs a request (e.g. `axios.get`). Unless otherwise specified, `fetch` is used.
* Specify a custom function that parses a response. Unless otherwise specified, `Body.json()` is used.
* Provide an options object like `{ method: "POST" } `.

## Syntax
useFetch takes a single object with the following arguments:  
- `url` : a URL that is used to perform a request 
- `options` (*optional*) : an options object  (`undefined` by default)
- `delay` (*optional*) : a delay in milliseconds between requests  (`undefined` by default, meaning only *one* request is made)
- `fetchFn` (*optional*) : a custom function that performs a request  (`window.fetch` by default)
- `parseFn` (*optional*) : a custom function that takes a response returned by `fetchFn` and parses it

It returns an object with the following properties:
- `value` : a parsed response (`null` by default)
- `isLoading` : a Boolean value that represents whether a request is pending (`true` by default)
- `error` : an error returned by a fetch function (`null` by default)

