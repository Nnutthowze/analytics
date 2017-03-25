# Node.js PageView Analytics

When Client opens a page, script is doing an AJAX call to the Node.js server and passes necessary information.

##URL Sample:

```
https://localhost:3000/api/pageviews/:id/:page/:pagenum/?as=799&bdk=b799&abpas=8796109800064_16384_512&_server=web14&_ctime=174&_timestamp=1489353463.4465
```

####Params:
- ***id*** - site_id,
- ***page*** - page/post/article opened,
- ***pagenum*** - page number (optional),

####Query:
- ***abpas*** - Pas (embedded in the source code of a page),
- ***_server*** - Server Name,
- ***_ctime*** - Creation Time,
- ***_timestamp*** - Timestamp of page load
- ***and other*** - like as, as-source, bdk and so on...

###Representation of ***websites***:

```javascript
  websites = {
   "20160831": {
     "0": {
       "story1": {
         "count": 1000,
         "params": {
           "pas=1&as=123": { "count": 50 },
           "as=123&pas=1": { "count": 50 },
           "as=123": { "count": 50 },
           "as=456&utm_source=Outbrain": { "count": 850 }
         }
       },
       "shoe-store-inheritance": {
         "count": 200,
         "params": {
           "pas=1&as=123" : { "count": 60 },
           "as=123&pas=1" : { "count": 60 },
           "as=123": { "count": 60 },
           "as=456&utm_source=Outbrain": { "count": 20 }
         }
       },
     },

     "1": {}
   }
 };
```

####Params:
- ***20160803*** - date,
- ***1*** - site id,
- ***story1*** - url,
- ***params*** - params which were appended to url
- ***pas=1&as=123*** - params in url
- ***count*** - amount of times page was accessed
