var cb = require('./lib/OCB.js');

// Configuration for the connection with the ContextBroker
/*cb.config('http://207.249.127.149',1026,'v2')
.then((result) => console.log(result))
.catch((err) => console.log(err))*/

// Configuration for the connection with the ContextBroker
cb.config('http://130.206.113.226',1026,'v2')
.then((result) => console.log(result))
.catch((err) => console.log(err))

/*
//Add new attribute to an entity
cb.addJSONAttributeToEntity("Room1",{
    "pressure":{
		"value": 90,
		"type": "Integer"
	} 
})
.then((result) => console.log(result))
.catch((err) => console.log(err))

//Get NGSI Entity
cb.getEntity("Room10")
.then((result) => console.log(result))
.catch((err) => console.log(err))

//Get list of entities storaged in ContextBroker
cb.listEntities()
.then((entities) => {console.log(entities)})
.catch((err) => console.log(err))
*/
/*
//MÉTODOS NUEVOS V1.3.0
//Get attributes of an entity
cb.getEntityAttrs("Room1")
.then((result) => console.log(result))
.catch((err) => console.log(err))

//Get content attribute of an entity
cb.getAttributeEntity("Room1", "temperature")
.then((result) => console.log(result))
.catch((err) => console.log(err))

//Get entity list per type 
cb.getEntityListType('Room')
.then((entities) => {console.log(entities)})
.catch((err) => console.log(err))
*/
/*var query = cb.queryEntitiesOnArea([
    [18.87574, -99.21975],
    [18.87681, -99.21932],
    [18.87697, -99.2203],
    [18.87656, -99.2202],
    [18.87627, -99.22014],
    [18.875874, -99.220155],
    [18.87574, -99.21975]
], ".*","Device",true);
console.log(query);

cb.geoQueryContext(query)
.then((result) => console.log(result))
.catch((err) => console.log(err))*/
/*cb.queryEntitiesOnArea([
    [18.87574, -99.21975],
    [18.87681, -99.21932],
    [18.87697, -99.2203],
    [18.87656, -99.2202],
    [18.87627, -99.22014],
    [18.875874, -99.220155],
    [18.87574, -99.21975]
]).then((result) => console.log(JSON.stringify(result)))

cb.queryEntitiesOnArea([
[
18.879751306118546,
-99.22197723761204
],
[
18.87991373199594,
-99.22199869528413
],
[
18.87996449005033,
-99.22190750017762
],
[
18.879984793267777,
-99.2218270339072
],
[
18.879939111025056,
-99.22174656763676
],
[
18.879893428769883,
-99.22165537253022
],
[
18.87973100287282,
-99.22145152464509
],
[
18.8795888800837,
-99.22130132094026
],
[
18.879390923140832,
-99.221076015383
],
[
18.87928940666914,
-99.22097945585847
],
[
18.87893917436966,
-99.22117793932557
],
[
18.87856356210443,
-99.22121012583375
],
[
18.878675230703656,
-99.22134960070255
],
[
18.878776747547473,
-99.22145152464509
],
[
18.87888841600463,
-99.22154808416965
],
[
18.87903053938793,
-99.22144079580903
],
[
18.879203117619838,
-99.22140860930085
],
[
18.87936554402868,
-99.22153199091554
],
[
18.87948228791276,
-99.22165537253022
],
[
18.879614259162025,
-99.22181630507114
],
[
18.879751306118546,
-99.22197723761204
]
],".*","Device",true).then((result) => console.log(JSON.stringify(result)))
*/
/*
cb.updateEntityAttributeValue('Room1', 'temperature', 16)
.then((result) => {console.log(result)})
.catch((err) => console.log(err))

cb.updateEntityAttrs('Room1', { 
    "temperature": {
        "value": 75,
        "type": "Integer"
    }
})
.then((result) => console.log(result))
.catch((err) => console.log(err))

cb.updateJSONAttrEntity('Room1', 'temperature', {
    "type": "Float",
    "value": 34.982398
})
.then((result) => console.log(result))
.catch((err) => console.log(err))

cb.deleteEntity('Room1')
.then((result) => console.log(result))
.catch((err) => console.log(err))

cb.getEntity("Room1")
.then((result) => console.log(result))
.catch((err) => console.log(err))
*/
/*cb.createEntity({
    "id": "Room4",
    "temperature": {
        "metadata": {
            "accuracy": {
                "type": "Float",
                "value": 8.2
            }
        },
        "type": "Float",
        "value": 29.9
    },
    "type": "Room"
})
.then((result) => console.log(result))
.catch((err) => console.log(err))*/
/*let query = "?id=.*&type=Device&georel=coveredBy&q=owner==Id owner&geometry=polygon&coords=18.879751306118546,-99.22197723761204;18.87991373199594,-99.22199869528413;18.87996449005033,-99.22190750017762;18.879984793267777,-99.2218270339072;18.879939111025056,-99.22174656763676;18.879893428769883,-99.22165537253022;18.87973100287282,-99.22145152464509;18.8795888800837,-99.22130132094026;18.879390923140832,-99.221076015383;18.87928940666914,-99.22097945585847;18.87893917436966,-99.22117793932557;18.87856356210443,-99.22121012583375;18.878675230703656,-99.22134960070255;18.878776747547473,-99.22145152464509;18.87888841600463,-99.22154808416965;18.87903053938793,-99.22144079580903;18.879203117619838,-99.22140860930085;18.87936554402868,-99.22153199091554;18.87948228791276,-99.22165537253022;18.879614259162025,-99.22181630507114;18.879751306118546,-99.22197723761204&options=keyValues"

cb.getWithQuery(query)
.then((result) => {
    console.log(result)
})
.catch((err) => console.log(err))*/

//=================NUEVAS FUNCIONES======================


/*OBTIENE TODOS LOS TIPOS DE DATOS DE LOS ATRIBUTOS DE LA ENTIDAD ESPECIFICADA
Y EL NÚMERO DE ENTIDADES QUE EXISTEN DE DICHA ENTIDAD*/
/*cb.getEntityType("Device")
.then((result) => console.log(result))
.catch((err) => console.log(err))*/

/*OBTIENE TODOS LOS TIPOS DE ENTIDADES QUE EXISTEN, 
LOS ATRIBUTOS Y TIPO DE DATO DEL ATRIBUTO DE CADA ENTIDAD
Y EL NUMERO DE ENTIDADES QUE EXISTEN DE CADA TIPO DE ENTIDAD*/
/*cb.getEntityTypes()
.then((result) => console.dir(result))
.catch((err) => console.log(err))*/

//OBTENER LA LISTA DE SUSCRIPCIONES.
cb.listSubscriptions()
.then((result) => console.log(result))
.catch((err) => console.log(err))
