var cb = require('./lib/OCB.js');

// Configuracion para la conexion con el context broker
cb.config('http://207.249.127.149',1026,'v2'); 
cb.testConnect();



cb.listEntities().then((entities) => {
    //console.log(entities)
})

cb.updateEntityAttributeValue('Room10', 'temperature', 'value', '2')
.then((status) => {
    //console.log(status)
}).catch((err) => console.log(err))

cb.updateEntityAttrs('Room10', { 
    "temperature": {
        "value": 75,
        "type": "Integer"
    }
}).then((result) => console.log(result)).catch((err) => console.log(err))


/*cb.createEntity({
    "id": "Room10",
    "temperature": {
        "metadata": {
            "accuracy": {
                "type": "Float",
                "value": 0.8
            }
        },
        "type": "Float",
        "value": 26.5
    },
    "type": "Room"
});*/
//cb.getEntity('Room10');
/*cb.updateJSONAttrEntity('Room10', 'temperature', {
    "type": "Float",
    "value": 34.982398
});*/
/*
cb.updateEntityAttrs('Room10', { 
    "temperature": {
        "value": 75,
        "type": "Integer"
    }
});
cb.deleteEntity('Room10');*/