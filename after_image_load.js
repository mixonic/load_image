;(function($, undefined){
  'use strict';

  var blankImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

  // Provides this syntax:
  //
  //   $(img).afterImageLoad(someUrl, callback);
  //
  $.fn.afterImageLoad = function(newSrc, callback) {

    var img = this,
        scannableSrc = newSrc.slice(0, 512);

    // Data URLs can be considered loaded.
    //
    if (scannableSrc.indexOf('base64') > 0) {
      img.attr('src', newSrc);
      callback(img);

      // Returns img
      //
      return img;
    }

    // Other domains need crossOrigin.
    //
    if (
      (
        scannableSrc.indexOf('http') == 0 ||
        scannableSrc.indexOf('//') == 0
      ) &&
      scannableSrc.indexOf(window.location.host) < 0
    ) {
      img.attr('crossOrigin', '');
    }

    // For other requests, attach a handler then
    // fire the src. If it is cached, quickly swap
    // it with a blank data-uri to trigger the
    // onload.
    //
    var loadedHandler = function(){
      if (img.attr('src') != blankImage) {
        img.unbind('load', loadedHandler);
        callback(img);
      }
    }

    img.bind('load', loadedHandler);

    img.attr('src', newSrc);

    if (img[0].complete || img[0].readyState) {
      img.attr('src', blankImage);
      img.attr('src', newSrc);
    }

    // Returns img
    //
    return img;
  }

  // Provides two additional syntaxes:
  //
  //   $.afterImageLoad(imgEl, someUrl, callback);
  //   $.afterImageLoad(someUrl, callback);
  //
  $.afterImageLoad = function(img, newSrc, callback) {
    if (!callback && $.type(img) == 'string') {
      var callback = newSrc,
          newSrc = img,
          img = $('<img />');
    } else {
      var img = $(img);
    }
    img.afterImageLoad(newSrc, callback);
  }

}(jQuery));
