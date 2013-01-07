;(function($, undefined){
  'use strict';

  var blankImage = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

  // Provides this syntax:
  //
  //   $(img).afterImageLoad(someUrl, successCallback, optionalFailureCallback);
  //
  $.fn.afterImageLoad = function(newSrc, successCallback, failureCallback) {

    var img = this,
        failureCallback = (failureCallback || function(){}),
        scannableSrc = newSrc.slice(0, 512);

    // Data URLs can be considered loaded.
    //
    if (scannableSrc.indexOf('base64') > 0) {
      var loadedHandler = function(){
        img.unbind('load', loadedHandler);
        img.unbind('error', failureCallback);
        successCallback(img);
      }

      img.bind('error', failureCallback);
      img.bind('load', loadedHandler);

      img.attr('src', newSrc);

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
        img.unbind('error', failureCallback);
        successCallback(img);
      }
    }

    img.bind('error', failureCallback);
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
  //   $.afterImageLoad(imgEl, someUrl, successCallback, optionalFailureCallback);
  //   $.afterImageLoad(someUrl, successCallback, optionalFailureCallback);
  //
  $.afterImageLoad = function(img, newSrc, successCallback, failureCallback) {
    if ($.type(img) == 'string') {
      var failureCallback = successCallback,
          successCallback = newSrc,
          newSrc = img,
          img = $('<img />');
    } else {
      var img = $(img);
    }
    img.afterImageLoad(newSrc, successCallback, failureCallback);
  }

}(jQuery));
