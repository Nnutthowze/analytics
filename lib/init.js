const init = websites => () => { websites.test = 1; };

module.exports = init;

// ***********************************
// how `websites` object looks
// ***********************************
//
//
// websites = {
//   "20160831": {
//     "0": {
//       "story1": {
//         "count": 1000,
//         "params": {
//           "pas=1&as=123": { "count": 50 },
//           "as=123&pas=1": { "count": 50 },
//           "as=123": { "count": 50 },
//           "as=456&utm_source=Outbrain": { "count": 850 }
//         }
//       },
//       "shoe-store-inheritance": {
//         "count": 200,
//         "params": {
//           "pas=1&as=123" : { "count": 60 },
//           "as=123&pas=1" : { "count": 60 },
//           "as=123": { "count": 60 },
//           "as=456&utm_source=Outbrain": { "count": 20 }
//         }
//       },
//     },
//
//     "1": {
//
//     }
//   }
// };
//
// `20160803` - date,
// `1` - site id,
// `story1` - url,
// `params` - params which were specified after url
// `pas=1&as=123` - params in url
// `count` - amount of times page was accessed
// *********************************
