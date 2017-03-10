(function () {

  var mainForm = $('#auth');

  function onError(err) {
    var message = err.responseText;
    console.log(err);
    $('.message').text(message);
    mainForm[0].reset();
  }

  function onSuccess(data) {
    if (data.redirect) {
      window.location = data.redirect;
    }
  }

  $("#auth").submit(function () {
    $.ajax({
      url: '/login',
      data: mainForm.serialize(),
      method: 'POST',
    })
    .fail(onError)
    .done(onSuccess);

    return false;
  });

})();
