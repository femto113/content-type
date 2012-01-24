// this code adapted from https://github.com/felixge/node-paperboy/
exports.contentTypes = JSON.parse(require("fs").readFileSync("content-type.json", "UTF8"));
console.log(exports.contentTypes);

// provide the reverse mapping as well (collisions yield a sorted array)
exports.extensions = {};
for (var key in exports.contentTypes) {
  if (exports.contentTypes[key] in exports.extensions) {
    if (!(exports.extensions[exports.contentTypes[key]] instanceof Array))  {
      exports.extensions[exports.contentTypes[key]] = [exports.extensions[exports.contentTypes[key]]];
    }
    exports.extensions[exports.contentTypes[key]].push(key);
  } else {
    exports.extensions[exports.contentTypes[key]] = key;
  }
}
for (var key in exports.extensions) if (exports.extensions[key] instanceof Array) exports.extensions[key].sort();

// a useful helper so callers don't always have to parse out the extension themselves
exports.byFilename = function (filename) { 
  return exports.contentTypes[require('path').extname(filename).replace(/^\./,"")];
}
