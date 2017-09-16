(function() {
  // initialize grid
  var masonry = new Masonry(document.querySelector('.grid'), {
    itemSelector: '.grid-item',
    gutter: 10,
    horizontalOrder: true,
    percentPosition: true
  });
  // re-render layout on image load
  document.querySelectorAll('.grid-item > img').forEach(function(image) {
    image.addEventListener('load', function() {
      masonry.layout();
    });
  });
})();
