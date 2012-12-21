**after_image_load** is a small JavaScript library providing a reliable
callback after an image is loaded. It is dependent on jQuery. This library
handles several quirks:

* Handle cached data. In modern browsers, cached data may not trigger a
`load` event. We check for that state, and force the load event to fire.
* Handle CORS. Any image URL not on the `window.location` host will
have the `crossOrigin` attribute set.
* Return immediately for data urls.

Usage is simple:

``` javascript
// This creates an img on the fly
$.afterImageLoad('http://google.com/foo.png', function(img){
  // `img` is a jQuery image object.
});

// It also accepts an image argument
var rawImg = new Image();
$.afterImageLoad(rawImg, 'http://google.com/foo.png', function(img){
  // `img` is a jQuery image object.
});

// And you can use via the normal jQuery syntax
var rawImg = new Image();
$(rawImg).afterImageLoad('http://google.com/foo.png', function(img){
  // `img` is the image wrapped as jQuery.
});
```

Contributing
------------

Fork, clone, write some code, commit, push, send a pull request. This is
a quick, young script, and items like CORS may be unreliable across all
browsers. This is due to bugs that don't have known work-arounds yet. So
lend a hand.

This script is partially based on techniques in: https://github.com/desandro/imagesloaded

This script is licensed under the MIT license. Matthew Beale 2012.
