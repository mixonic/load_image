**after_image_load** is a small JavaScript library providing a reliable
callback after an image is loaded. It is dependent on jQuery. In modern
browsers, cached data may not trigger a `load` event. We check for that
state, and force the load event to fire.

Usage is simple:

``` javascript
// This creates an img on the fly
$.afterImageLoad('http://google.com/foo.png', function(img){
  // `img` is a jQuery image object.
});

// It also accepts an image argument
var rawImg = new Image();
$.afterImageLoad(rawImg, 'http://google.com/foo.png', function(img){
  // `img` is the rawImage wrapped with jQuery.
});

// And you can use the normal jQuery syntax
$('<img id="foo" />').afterImageLoad('http://google.com/foo.png', function(img){
  // `img` is the image wrapped as jQuery.
});

// There is an optional failure callback
$.afterImageLoad('http://google.com/foo.png', function(img){
  // On success!
}, function(e){
  // On failure!
});
```

An earlier version of **after_image_load** had built-in support for CORS
and special handling of data-urls. This has been removed, but is easy to
handle in a custom manner:

``` javascript
$('<img crossOrigin="Anonymous" />').afterImageLoad('http://google.com/foo.png', function(img){
  // `foo.png` was requested with CORs headers.
})

$('<img '+(imgSrc.indexOf('data:') === 0 ? '' : 'crossOrigin="Anonymous" ')+'/>').afterImageLoad(imgSrc, function(img){
  // `imgSrc` is requested with CORs headers if it is an image, and
  // without CORs headers if it is a data-url.
})
```

Contributing
------------

Fork, clone, write some code, commit, push, send a pull request.

This script is partially based on techniques in: https://github.com/desandro/imagesloaded

This script is licensed under the MIT license. Matthew Beale 2012-2013.
