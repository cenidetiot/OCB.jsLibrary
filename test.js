
var ocb  = require("./lib/OCB")
var fetch = require("node-fetch")
ocb.config('http://130.206.113.226:1026/v2');

ocb.getWithQuery(
    "?type=Alert&id=Alert:Device_Smartphone_b0234f7b3f365bf3:1518820773476&options=keyValues"
    , 
    {
        'Fiware-Correlator': '3451e5c2-226d-11e6-aaf0-d48564c29d20'
    })
    .then((body) => {
        console.log(JSON.stringify(body.body));
        console.log(JSON.stringify(body.headers));
    });

