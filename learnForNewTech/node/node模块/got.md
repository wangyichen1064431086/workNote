### 79. got
<https://www.npmjs.com/package/got>

<https://github.com/sindresorhus/got>

Simplified HTTP requests.

A nicer interface to the built-in http module.（node自建http模块的更好的接口）

#### API
##### got(url,[options])
Returns a Promise for a response object with a body property, a url property with the request URL or the final URL after redirects, and a requestUrl property with the original request URL.
###### params
- url{string|object}: The URL to request or a http.request options object.}

- options{object}: Any of the [http.request](https://nodejs.org/api/http.html#http_http_request_options_callback) options.
  
  - options.body{string|buffer| readableStream|object}:Body that will be sent with a POST request.
    - If present in options and options.method is not set, options.method will be set to POST***.
    - If body is a plain object, it will be stringified with querystring.stringify and sent as application/x-www-form-urlencoded.***
  
  - options.encoding {string|null}:Default: 'utf8'.Encoding to be used on setEncoding of the response data.

  - json{boolean}:default-false,Parse response body with JSON.parse and set accept header to application/json.

  - query{string| object}:Query string object that will be added to the request URL. This ***will override the query string in url***.

###### returns
一个Promise，其response object含有如下properties:

- body:
- url:  the request URL or the final URL after redirects
- requestUrl: original request URL
