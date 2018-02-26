# FIWARE OCB - sender  

[![https://nodei.co/npm/ocb-sender.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/ocb-sender.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/ocb-sender)

[![Build Status](https://travis-ci.org/cenidetiot/OCB.jsLibrary.svg?branch=master)](https://travis-ci.org/cenidetiot/OCB.jsLibrary)
[![devDependencies Status](https://david-dm.org/dwyl/hapi-auth-jwt2/dev-status.svg)](https://david-dm.org/dwyl/hapi-auth-jwt2?type=dev)

## What is ocb-sender?

ocb - sender is a npm module that handle a NGSI Object for them transportation to FIWARE Orion Context Broker. It makes possible send context information in easy way to the FIWARE Ecosystem.
***
## Indéx navigation

* [How to Install](#how-to-install)
* [Import npm module](#import-npm-module)
* [Module Usage](#module-usage)
	* [Connection configuration with Orion ContextBroker](#conecction-configuration-with-orion-contextbroker)
	* [Retrieve Orion ContextBroker API Rescources](#retrieve-orion-contextbroker-api-resources)
	* [Get EntityType of ContextBroker](#get-entitytype-of-contextbroker)
	* [Get EntitytTypes of ContextBroker](#get-entitytypes-of-contextbroker)
	* [Entities Functions](#)
		* [Get Entity Attribute Value](#get-entity-attribute-value)
		* [Get Entity Attribute](#get-entity-attribute)
		* [Get Entity Attributes](#get-entity-attributes)
		* [Get Entity](#get-entity)
		* [Get entities list of an entity type](#get-entities-list-of-an-entity-type)
		* [Get All Entities](#get-all-entities)
		* [Create Entity](#create-entity)
		* [Delete entity](#delete-entity)
* [License](#license)

## How to install

```
npm install ocb-sender
```

## Import npm module.

ES5

```js
    var cb = require('ocb-sender');
```
ES6
```js
    import OCB as cb from  ocb-sender;
```
## Module Usage

### Connection configuration with Orion ContextBroker.

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
### Retrieve Orion ContextBroker API Rescources.
> Example
```js
cb.retrieveAPIResources()
.then((result) => console.log(result))
.catch((err) console.log(err))
```
### Get EntityType of ContextBroker.
> Example
```js
cb.getEntityType("Device")
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
### Get EntityTypes of ContextBroker.
> Example
```js
cb.getEntityTypes()
.then((result) => console.dir(result))
.catch((err) => console.log(err))
```
## Entities Functions.

### Get Entity Attribute Value.
> Example
```js
cb.getEntityAttributeValue("Room1", "temperature")
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
### Get Entity Attribute.
> Example
```js
cb.getEntityAttribute("Room1", "temperature")
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
### Get Entity Attributes.
> Example
```js
cb.getEntityAttrs("Room1")
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
### Get Entity.
> Example
```js
cb.getEntity('Room1')
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
### Get entities list of an entity type.
> Example
 ```js
cb.getEntityListType('Room')
.then((entities) => {console.log(entities)})
.catch((err) => console.log(err))
```
### Get All Entities
> Example
 ```js
cb.listEntities()
.then((entities) => {console.log(entities)})
.catch((err) => console.log(err))
```
### Create Entity.
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
### Delete Entity.
> Example 
```js
cb.deleteEntity("Room1")
.then((result) => console.log(result))
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



