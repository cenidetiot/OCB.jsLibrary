
# Entities Functions
***
## Indéx navigation

* [Entities Functions](#entities-functions)
    * [Read Functions](#read-functions)
	    * [Get Entity Attribute Value](#get-entity-attribute-value)
	    * [Get Entity Attribute](#get-entity-attribute)
	    * [Get Entity Attributes](#get-entity-attributes)
	    * [Get Entity](#get-entity)
	    * [Get entities list of an entity type](#get-entities-list-of-an-entity-type)
	    * [Get All Entities](#get-all-entities)
    * [Create Functions](#create-functions)
	    * [Create Entity](#create-entity)
    * [Update Functions](#update-functions)
    * [Delete Functions](#dele-functions)
	    * [Delete entity](#delete-entity)
        * [Delete entity attribute](#delete-entity-attribute)


## Read Functions.

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
## Create Functions.

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
##  Update Functions.

### Add a JSON Attribute to a NGSI entity.
> Example
```js
cb.addJSONAttributeToEntity("Room1",{
    "pressure":{
		      "value": 90,
		      "type": "Integer"
	    }
})
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
###  Update all the object attributes of an entity.
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
> Example
```js
cb.updateEntityAttributeValue('Room1', 'temperature', '2')
.then((result) => {console.log(result)})
.catch((err) => console.log(err))
```

## Delete Functions.

### Delete Entity.
> Example 
```js
cb.deleteEntity("Room1")
.then((result) => console.log(result))
.catch((err) => console.log(err))
```
### Delete Entity Attribute.

