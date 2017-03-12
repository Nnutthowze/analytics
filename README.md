# Node.js PageView Analytics

When Client opens a page, script is doing an AJAX call to the Node.js server and passes necessary information.

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



###Representation of ***serverStats***

```javascript
 date: {
     siteId: {
         webServerName: {
             time in minutes: {
                 "maxCURL": "post_name/?as=799",
                 "real": 522,
                 "CF": 5223,
                 "totalms": "231232",
                 "maxCTime": "22",
                 "avtime": "15"
             }
         }
     }
 }
```

####Params:
- ***date*** - The same like in `websites`
- ***siteId*** - The same siteId like in `websites`
- ***webServerName*** - Server from where request came from
- ***real*** - Total real server traffic, only if _timestemp is new.
- ***CF*** - Total traffic from CF (if _timestemp is not new).
- ***totalms*** - Total _ctime of only real server traffic.
- ***maxCTime*** - Max value for page creation time(ms) - only for real traffic.
- ***maxCURL*** - URL of ***maxCTime***.
- ***avtime*** - Average creation time ***totalms*** / ***real***
