(function () {
  var search = window.location.search;

  // $.ajax({
  //     beforeSend: function (xhr) {
  //       var token = localStorage.getItem('token');
  //       xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  //     },
  // });

  if (search.indexOf('?bearer=') === 0) {
    var token = window.location.search.split('=')[1];
    sessionStorage.clear();
    sessionStorage.setItem('token', token);
  }

  window.history.replaceState(null, null, window.location.pathname);

})();
