var cb = require('./lib/OCB.js');

// Configuration for the connection with the ContextBroker
cb.config('http://207.249.127.149',1026,'v2')
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

cb.createEntity({
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

