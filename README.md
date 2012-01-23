# content-type

Filename to content-type (aka mime type) mappings.

Largely extracted from http://github.com/felixge/node-paperboy

## Install

    npm install content-type

or

    git clone http://github.com/femto113/content-type.git
    cd content-type
    npm link

## Example

The package has three exports: {contentTypes}, an N-1 map from extensions to content-types;
{extensions}, the reverse (with collisions represented by lexically sorted arrays); and {byFilename()} a
helper function that handles the most common use case, determining the correct content
type for a given file.

    var contentType = require("content-type");

    // map extension to content-type 
    console.log(contentType.contentTypes.jpg);
    // output: "image/jpeg"

    // 
    console.log(contentType.extensions["image/jpeg"]);
    // output: ["jpeg", "jpg"]

    console.log(contentType.byFilename("foo.html"));
    // output: "text/html"

    // respond to http request with the content-type suggested by URL's extension
    var http = require("http"), url = require("url");
    http.createServer(function(request, response) {
        ct = contentType.byFilename(url.parse(request.url).pathname);
        if (typeof(ct) != "undefined" && ct) {
          response.writeHead(200, {"content-type": ct});
          // ...
        }
    });

## TODO

- move map into json file for easier maintenance
- some sane default extensions for commont types
