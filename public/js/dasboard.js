// (function () {
//   $.ajax({
//     beforeSend: function (xhr) {
//       var token = localStorage.getItem('token');
//       xhr.setRequestHeader('Authorization', 'Bearer ' + token);
//     },
//     url: '/dashboard',
//     method: 'GET',
//     success: function (t) {
//       console.log(t);
//       localStorage.setItem('token', t.token);
//       // window.location.replace('http://localhost:3000/dashboard');
//     },
//     error: function (err) {
//       console.error(err);
//       alert('Error occurred');
//     }
//   });
// })();
