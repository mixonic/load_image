**load_image** is a small JavaScript library providing a reliable
callback after an image is loaded. It is dependent on jQuery. In modern
browsers, cached data may not trigger a `load` event. We check for that
state, and immediately resolve the returned promise if the file is
cached.

Usage is simple:

``` javascript
// This creates an img on the fly
$.loadImage('http://google.com/foo.png').done(function(img){
  // `img` is a jQuery image object.
});

// It also accepts an image argument
var rawImg = new Image();
$.loadImage(rawImg, 'http://google.com/foo.png').done(function(img){
  // `img` is the rawImage wrapped with jQuery.
});

// And you can use the normal jQuery syntax
$('<img id="foo" />').loadImage('http://google.com/foo.png').done(function(img){
  // `img` is the image wrapped as jQuery.
});

// There is an optional failure callback
$.loadImage('http://google.com/foo.png').done(function(img){
  // On success!
}).fail(function(){
  // On failure!
});
```

An earlier version of **load_image** had built-in support for CORS
and special handling of data-urls. This has been removed, but is easy to
handle in a custom manner:

``` javascript
$('<img crossOrigin="Anonymous" />').loadImage('http://google.com/foo.png').done(function(img){
  // `foo.png` was requested with CORs headers.
});

$('<img '+(imgSrc.indexOf('data:') === 0 ? '' : 'crossOrigin="Anonymous" ')+'/>').loadImage(imgSrc).done(function(img){
  // `imgSrc` is requested with CORs headers if it is an image, and
  // without CORs headers if it is a data-url.
})
```

Contributing
------------

Fork, clone, write some code, commit, push, send a pull request.

This script is partially based on techniques in: https://github.com/desandro/imagesloaded

This script is licensed under the MIT license. Matthew Beale 2012-2013.
