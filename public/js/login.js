(function () {

  var mainForm = $('#auth');

  function onError(err) {
    var message = err.responseText;
    $('.message').text(message);
    mainForm[0].reset();
  }

  function onSuccess(data) {
    if (data.redirect) {
      window.location = data.redirect;
    }
  }

  $("#auth").submit(function(e) {
    e.preventDefault();

    $.ajax({
      url: '/login',
      data: mainForm.serialize(),
      method: 'POST',
    })
    .fail(onError)
    .done(onSuccess);
  });

})();
