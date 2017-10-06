# OCB.jsLibrary

## What is ocb-sender?

> ocb - sender is a npm module that handle a NGSI Object for them transportation to FIWARE Orion Context Broker. Makes easy send context information to Fiware Ecosystem

## Install
```
npm install ocb-sender
```
## Basic Usage

### Configuration to the connection with the Context Broker.

```
 cb.config(urlContextBroker, port, version);
 ```
> Example
```
cb.config('http://207.249.127.149',1026,'v2'); 
```
### Testing comunication with the Context Broker.
> Example
```
cb.testConnect();
```
###  Get JSON object of an entity registered in the Context Broker.
```
# cb.getEntity('idEntity')
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
> Example
```
# cb.getEntity('Room1')
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
### List all the entities that are stored in the Context Broker.
 Example
 ```
 # cb.listEntities()
.then((entities) => {console.log(entities)})
.catch((err) => console.log(err))
```
### Delete information of an entity stored in the Context Broker.
```
cb.deleteEntity('idEntity')
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
> Example 
```
cb.deleteEntity('idEntity')
.then((result) => console.log(result))
.catch((err) => console.log(err))
```


