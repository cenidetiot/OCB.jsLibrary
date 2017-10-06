# FIWARE OCB - sender

## What is ocb-sender?
***
ocb - sender is a npm module that handle a NGSI Object for them transportation to FIWARE Orion Context Broker. Makes easy send context information to Fiware Ecosystem
***
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
###  Get NGSI object of an entity registered in the Context Broker.
```
cb.getEntity('idEntity')
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
> Example
```
cb.getEntity('Room1')
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
### List all the NGSI entities that are stored in the Context Broker.
 Example
 ```
cb.listEntities()
.then((entities) => {console.log(entities)})
.catch((err) => console.log(err))
```
### Delete information of an NGSI entity stored in the Context Broker.
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
### Create an NGSI entity in the Context Broker
```
cb.createEntity({NGSI JSON OBJECT})
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
> Example
```
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
## License

MIT © [Haidee Onofre & Daniel EStrada]



