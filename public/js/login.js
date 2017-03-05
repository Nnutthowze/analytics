(function () {
  $("#auth").submit(function () {
    $.ajax({
      beforeSend: function (xhr) {
        var token = localStorage.getItem('token');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      },
      url: '/login',
      data: $('#auth').serialize(),
      method: 'POST',
    })
    .done(function (t) {
        console.log(t.token);
        localStorage.setItem('token', t.token);
        window.location.replace('http://localhost:3000/dashboard/?bearer=' + t.token);
    })
    .fail(function (err) {
      console.error(err);
    });

    return false;
  });
})();
