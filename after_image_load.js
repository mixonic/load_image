;(function($, undefined){
  'use strict';

  // Provides this syntax:
  //
  //   $(img).afterImageLoad(someUrl, successCallback, optionalFailureCallback);
  //
  $.fn.afterImageLoad = function(newSrc, successCallback, failureCallback) {

    var img = this,
        failureCallback = (failureCallback || function(){}),
        scannableSrc = newSrc.slice(0, 512);

    var loadedHandler = function(){
      img.unbind('load', loadedHandler);
      img.unbind('error', failureCallback);
      successCallback(img);
    }

    img.bind('error', failureCallback);
    img.bind('load', loadedHandler);

    img.attr('src', newSrc);

    // If the url is is cached and loaded,
    // call the callback by hand.
    //
    if (img[0].complete || img[0].readyState) {
      loadedHandler();
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
