(function() {
  var interval = null;
  var sendData = function() {
    $.ajax({
      method: 'PUT',
      url: '/api/pageviews/?id=1',
    })
    .done(function(data) {
      if (interval) {
        interval = null;
      }
      console.log(data);
    })
    .fail(function() {
      // interval = setInterval(function() {
      //   sendData();
      // }, 1000);
    });
  };
  sendData();
})();

