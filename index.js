var cb = require('./lib/OCB.js');

// Configuracion para la conexion con el context broker
cb.config('http://207.249.127.149',1026,'v2'); 
cb.testConnect();
//cb.listEntities();
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
cb.getEntity('Room10');
/*cb.updateJSONAttrEntity('Room10', 'temperature', {
    "type": "Float",
    "value": 34.982398
});*/
/*cb.updateEntityAttributeValue('Room10', 'temperature', 'value', '2')
cb.updateEntityAttrs('Room10', { 
    "temperature": {
        "value": 75,
        "type": "Integer"
    }
});
cb.deleteEntity('Room10');*/