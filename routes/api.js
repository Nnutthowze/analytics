// app.get('/addSiteVisit/:siteId/:url/:page?', (req, res) => {
//   // params appended to url after `/?` => req.query
//   // params in url `:url` or `:page` => req.params
//   const { siteId, url, page } = req.params;
//   const tempUrl = url.replace('__x__', '');
//   const tempPageUrl = typeof page !== 'undefined' ? `/${page}` : '';
//   const spurl = `${tempUrl}${tempPageUrl}`;
//   const tzTime = getTime();
//   const currentDate = `${tzTime.year}${tzTime.month}${tzTime.day}`;

//   const datePath = path.join(DB_PATH, currentDate);
//   const siteIdPath = path.join(datePath, siteId);

//   res.send(spurl);
// });
