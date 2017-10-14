# FIWARE OCB - sender

## What is ocb-sender?

ocb - sender is a npm module that handle a NGSI Object for them transportation to FIWARE Orion Context Broker. It makes possible send context information in easy way to the FIWARE Ecosystem.
***
## How to install

```
npm install ocb-sender
```
## Basic Usage

### Import npm module in a javascript file.

ES5

```js
    var cb = require('ocb-sender');
```
ES6
```js
    import OCB as cb from  ocb-sender;
```

### Connection configuration with the ContextBroker.

```js
 cb.config(urlContextBroker, port, version)
 .then((result) => console.log(result))
 .catch((err) => console.log(err))
 ```
> Example
```js
cb.config('http://207.249.127.149',1026,'v2')
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
### Testing comunication with the Context Broker.
> Example
```js
cb.testConnect()
.then((result) => console.log(result))
.catch((err) console.log(err))
```
###  Get NGSI object of an entity registered in the ContextBroker.
```js
cb.getEntity('idEntity')
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
> Example
```js
cb.getEntity('Room1')
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
### List all the NGSI entities that are stored in the ContextBroker.
 Example
 ```js
cb.listEntities()
.then((entities) => {console.log(entities)})
.catch((err) => console.log(err))
```
### Delete information NGSI entity stored in the ContextBroker.
```js
cb.deleteEntity('idEntity')
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
> Example 
```js
cb.deleteEntity('idEntity')
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
### Create NGSI entity in the ContextBroker.
```js
cb.createEntity({NGSI JSON OBJECT})
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
> Example
```js
cb.createEntity({
    "id": "Room1",
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
}).then((result) => console.log(result))
.catch((err) => console.log(err))
```
### Add a JSON Attribute to a NGSI entity.
```js
cb.addJSONAttributeToEntity('idEntity',{ JSON OBJECT })
```
> Example
```js
cb.addJSONAttributeToEntity("Room1",{
    "pressure":{
		      "value": 90,
		      "type": "Integer"
	    }
})
```
###  Update all the object attributes of an entity.
```js
cb.updateEntityAttrs('idEntity', {NGSI JSON OBJECT})
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
> Example 
```js
cb.updateEntityAttrs('Room1', { 
    "temperature": {
        "value": 75.9345,
        "type": "Float"
    }
})
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
###  Update the JSON Object of an atttribute of the entity.
```js
cb.updateJSONAttrEntity('idEntity', 'nameAttribute', {JSON OBJECT})
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
> Example
```js
cb.updateJSONAttrEntity('Room1', 'temperature', {
    "type": "Float",
    "value": 34.982398
})
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
###  Update the value attribute  of a JSON Object.
```js
cb.updateEntityAttributeValue('idEntity', 'nameAttribute', 'value')
.then((result) => {console.log(result)})
.catch((err) => console.log(err))
```
> Example
```js
cb.updateEntityAttributeValue('Room1', 'temperature', '2')
.then((result) => {console.log(result)})
.catch((err) => console.log(err))
```
## License

MIT © [Haidée Onofre & Daniel Torres]



