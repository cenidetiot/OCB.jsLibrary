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
	* [Entities Functions](docs/EntitiesFunctions.md)
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

## License
MIT © [Haidée Onofre & Daniel Torres]



