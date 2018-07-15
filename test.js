
var ocb  = require("./lib/OCB")
ocb.config('http://130.206.113.226', 1026, 'v2');
ocb.retrieveAPIResources().then(console.log);
ocb.getWithQuery("?type=Alert", {'Fiware-Correlator': '3451e5c2-226d-11e6-aaf0-d48564c29d20'}).then(console.log);
