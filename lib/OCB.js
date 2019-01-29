"use strict";
/*
 * OCB-sender module is an Orion ContextBroker's client. 
 * This client manipulates the context information of FIWARE-NGSIv2 entities
 * 
 * Part of ngsijs-library for SMARTSDK
 * @autor Daniel Torres & Haidée Onofre
 * @version 2.4.5
 *
*/
var fetch = require('node-fetch'); // Import node-fetch

/**
 * Class used to analize non-structured JSON and transform into FIWARE-NGSIv2
 * @class OCB
 * @external node-fetch
 */
class OCB {  

    /** @constructs */
    constructor(){
        this._host  = null;
        this._port = null;
        this._version = null;
        this._connect = null;
    }

    /**
	 * Get a data model from a url
	 * @param {String} url
	 * @returns {Promise} 
	*/
    downloadModel(url) {
        // Implements a new promise 
        const promise = new Promise(function (resolve, reject) { // initialize the promise
            const options = { // Initialize the headers uses in the request
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE'
                },
            };

            fetch(url, options) // make the request 
            .then(function(res) {              
                if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                    resolve(res.json()); 
                }else{ // if the response is not between 200 and 208
                    reject({status : res.status , message : res.statusText});
                }
                
            })
            .catch((err) => { // if some error occurs
                reject(new Error(`An error has occurred in the search for the entity: ${err}`))
            });
        })
        return promise; // return the promise

    }

     /**
	 * Get entities using a query 
	 * @param {String} query
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    getWithQuery(query, headers = {}){

        const promise = new Promise(function (resolve, reject) { // Initialize the promise
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE'; //  add Access-Control-Allow-Methods to the header 
            const options = { // assign a options request
                method: 'GET',
                headers: headers, // assign the headers into the options
            };
            let temHeader = {}; 
            fetch(t._URLContext+`/entities${query}`, options) // Make the request 
                .then(async function(res) {              
                    if(res.status >= 200 && res.status <= 208){  // if the response status is between 200 and 208
                        temHeader = res.headers;
                        return res.json(); // to return the body of the request to next then
                    }else{  // if the response is not between 200 and 208
                        reject({status : res.status , message : res.statusText});
                    }
                }) 
                .then(async (res) => { // to get the body value
                    let response = { // prepare the response 
                        body : res, 
                        headers : temHeader
                    }
                    resolve(response)
                })
                .catch((err) => { // if any error occurs 
                    reject(new Error(`An error has occurred in the search for the entity: ${err}`))
                });
        })
        return promise; // return the promise
    }

    /**
	 * Config the Orion context broker url
     * 
	 * @param {String} _url
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    config(_url, headers = {}){
        this._URLContext= _url; // store the orion url
        return this.testConnect(headers); // test the connection 
    }

    /**
	 * Config the Orion context broker url
	 * @param {String} query
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    testConnect(headers = {}){
        let t = this 
        headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE'; // add Access-Control-Allow-Methods header 
        const options = {  // assign the request options 
            method: 'GET',
            headers: headers,
        };
        const promise = new Promise(function (resolve, reject) { // Initialize the promise
            fetch(t._URLContext, options) // make the request 
            .then((res) => {
                if(res.status >= 200 && res.status <= 208){ // if the response is between 200 and 208
                    resolve({status : res.status, message: "Connection successful with the Orion ContextBroker"})
                }
                else if (res.status === 404){ // if the response status is 404
                    reject(new Error("Request failed. URL not found"))
                }
                else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                    reject(new Error("The server failed to complete the request"))
                }
                else{ // if the response status is another 
                    reject({status : res.status , message : res.statusText});
                }
            })
            .catch((err)=>{ // if any error occurs 
                reject(new Error(`An error has occurred in the connection: ${err}`))
            })
        })
        return promise; // return the promise 
    }    

    /**
	 * Retreive the API Resources 
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    retrieveAPIResources(headers = {}){
        let t = this 
        const options = { // assign the request options 
            method: 'GET',
            headers: headers,
        };
        const promise = new Promise(function (resolve, reject) {  // Initialize the promise
            fetch(t._URLContext, options)  // make the request 
            .then((res) => {
                if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                    resolve(res.json())
                }
                else if (res.status === 404){ // if the response status is 404
                    reject(new Error("Request failed. Resources NOT Found"))
                }
                else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                    reject(new Error("The server failed to complete the request"))
                }
                else{ // if the response status is another 
                    reject({status : res.status , message : res.statusText});
                }
            })
            .catch((err)=>{ // if any error occurs 
                reject(new Error(`An error has occurred in the connection: ${err}`))
            })
        })
        return promise; // returns the promise
    }

    /**
	 * Add the time stamp to the entity
     * @param {JSON} entity
	 * @returns {Promise} 
	*/
    addTimeStampEntity(entity){
        let timeStamp =  // defines the actually time 
            {
                "value": new Date().toISOString(),
                "type" : "DateTime"
            };
        entity['dateCreated'] = timeStamp; // asings the time in dateCreated attribute
        return entity; // returns the entity modified
    }

    /**
	 * Create the entity in the Orion Context Broker
     * @param {JSON} entity
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    createEntity(entity, headers = {}){
        //Add timestamp attribute to all entity that will be created
        this.addTimeStampEntity(entity);
        let t = this
        const promise = new Promise(function (resolve, reject) {// Initialize the promise
            headers['Content-Type'] =  'application/json'; // add the header Content-Type 
            const options = { // assign the request options 
                method: 'POST',
                headers: headers,
                body: JSON.stringify(entity) // convert the entity to string and is included in the body
            };
            fetch(t._URLContext+'/entities', options) // make the request 
                .then(function(res) {                  
                    if(res.status >= 200 && res.status <= 208){  // if the response status is between 200 and 208
                        resolve({status : res.status, message:"Entity created successfully"})
                    }
                    else if (res.status === 422){ // if the response status is 422
                        reject(new Error("Existing entity with this ID: "+entity.id))
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                }) 
                .catch(function(err){ // if any error occurs
                    reject(new Error(`An error has occurred with the creation of the entity: ${err}`))
                });

        })
        return promise;   // returns the promise         
    }
    /**
	 * Create the entity in the Orion Context Broker
     * @param {String} idEntity
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    getEntity(idEntity ,headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ; // add the header Access-Control-Allow-Methods
            const options = { // assign the request options 
                method: 'GET',
                headers: headers,
            };
            fetch(t._URLContext+'/entities/'+idEntity, options)  // make the request 
                .then(function(res) {              
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve(res.json());
                    }
                    else if (res.status === 404){ // if the response status is 404
                        reject(new Error("The entity with 'id': "+idEntity+ " has not been found"));
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .catch((err) => { // if any error occurs
                    reject(new Error(`An error has occurred in the search for the entity: ${err}`))
                });
        })
        return promise; // returns the promise 

    }

     /**
	 * Get only the attributes of the entity
     * @param {String} idEntity
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    getEntityAttrs(idEntity, headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ; // add the header Access-Control-Allow-Methods
            const options = { // assign the request options 
                method: 'GET',
                headers: headers,
            };
            fetch(t._URLContext+'/entities/'+idEntity+'/attrs', options) // make the request 
                .then(function(res) {              
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve(res.json());
                    }
                    else if (res.status === 404){ // if the response status is 404
                        reject(new Error("The entity with 'id': "+idEntity+ " has not been found"));
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{  // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .catch((err) => { // if any error occurs
                    reject(new Error(`An error has occurred in the search for the entity: ${err}`))
                });
        })
        return promise; // returns the promise 

    }
    /**
	 * Get only the specified attribute of the entity
     * @param {JSON} idEntity
     * @param {String} attribute
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    getEntityAttribute(idEntity, attribute, headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ; // add the header Access-Control-Allow-Methods
            const options = { // assign the request options 
                method: 'GET',
                headers: headers,
            };
            fetch(t._URLContext+'/entities/'+idEntity+'/attrs/'+attribute, options)  // make the request 
                .then(function(res) {              
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve(res.json());
                    }
                    else if (res.status === 404){ // if the response status is 404
                        reject(new Error("The entity with 'id': "+idEntity+ " has not been found"));
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .catch((err) => { // if any error occurs
                    reject(new Error(`An error has occurred in the search for the entity: ${err}`))
                });
        })
        return promise
    }

    /**
	 * Get only the value of specified attribute of the entity
     * @param {String} idEntity
     * @param {String} attribute
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    getEntityAttributeValue(idEntity, attribute, headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ;  // add the header Access-Control-Allow-Methods
            const options = { // assign the request options 
                method: 'GET',
                headers: headers,
            };
            fetch(t._URLContext+'/entities/'+idEntity+'/attrs/'+attribute+'/value', options) // make the request 
                .then( function(res) {  
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        return res.json();  // returns to get only the value
                    }
                    else if (res.status === 404){ // if the response status is 404
                        reject(new Error("The entity or the attribute specified hast not been found"));
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .then( function (value){ // resolve the atribute 
                    resolve({value: value, attribute: attribute});
                })
                .catch((err) => { // if any error occurs
                    reject(new Error(`An error has occurred in the search for the entity: ${idEntity} Error: ${err}`))
                });
        })
        return promise
    }

     /**
	 * Delete only the specified attribute of the entity
     * @param {String} idEntity
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    deleteEntityAttribute(idEntity, attribute, headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ;  // add the header Access-Control-Allow-Methods
            const options = { // assign the request options 
                method: 'GET',
                headers: headers,
            };
            fetch(t._URLContext+'/entities/'+idEntity+'/attrs/'+attribute, options) // make the request 
                .then(function(res) {
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve({status : res.status, message: `Has been deleted the attribute: ${attribute} of the entity: ${idEntity}`})
                    }
                    else if (res.status === 404){ // if the response status is 404
                        reject(new Error("The attribute  or entity has not been found"));
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .catch(function(err){ // if any error occurs
                    reject(new Error(`An error has occurred when removing the attribute: ${attribute} of the entity: ${idEntity} Error: ${err}`));
                });
        })
        return promise
    }
     /**
	 * Get the entity types, attributes and count of the types entities in the Orion Context Broker
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    getEntityTypes(headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ;  // add the header Access-Control-Allow-Methods
            headers['Accept-Type'] = 'application/json' ; 
            const options = { // assign the request options 
                method: 'GET',
                headers: headers,
            };
            fetch(t._URLContext+'/types', options) // make the request 
                .then(function(res) {              
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve(res.text())
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .catch((err) => {
                    reject(new Error(`An error has occurred in the search for the entity types: ${err}`))
                });
        })
        return promise
    }
    
     /**
	 * Get the entity type, attributes and count of the types entity specified 
     * @param {String} entityType
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    getEntityType(entityType, headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ;  // add the header Access-Control-Allow-Methods
            headers['Accept-Type'] = 'application/json' ; 
            const options = { // assign the request options 
                method: 'GET',
                headers: headers,
            };
            console.log(t._URLContext+'/types/'+entityType)
            fetch(t._URLContext+'/types/'+entityType, options) // make the request 
                .then(function(res) {              
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve(res.text())
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .catch((err) => { // if any error occurs
                    reject(new Error(`An error has occurred in the search for the entities: ${entityType} Error: ${err}`))
                });
        })
        return promise
    }

    /**
	 * Get the entities with the type specified
     * @param {String} typeEntity
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    getEntityListType(typeEntity , headers ={}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ;  // add the header Access-Control-Allow-Methods
            headers['Accept-Type'] = 'application/json' ; 
            const options = { // assign the request options 
                method: 'GET',
                headers: headers,
            };
            fetch(t._URLContext+'/entities?type='+typeEntity, options) // make the request 
                .then(function(res) {              
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve(res.json());
                    }
                    else if (res.status === 404){ // if the response status is 404
                        reject(new Error("The entities of 'type': "+typeEntity+ " has not been found"));
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .catch((err) => { // if any error occurs
                    reject(new Error(`An error has ocurred in the search for the entities: ${err}`))
                });
        })
        return promise

    }

    /**
	 * Delete a specified entity
     * @param {String} idEntity
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    deleteEntity(idEntity, headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ;  // add the header Access-Control-Allow-Methods
            const options = { // assign the request options 
                method: 'DELETE',
                headers: headers,
            };
            fetch(t._URLContext+'/entities/'+idEntity, options) // make the request 
                .then(function(res) {
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve({status : res.status, message: "Has been deleted the entity: "+idEntity})
                    }
                    else if (res.status === 404){ // if the response status is 404
                        reject(new Error("The entity with 'id': "+idEntity+ " has not been found"));
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .catch(function(err){ // if any error occurs
                    reject(new Error(`An error has occurred to delete the entity: ${err}`));
                });
        })
        return promise
    }
    /**
	 * Update or append entity attributes
     * @param {String} idEntity
     * @param {JSON} JSONAttribute
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    addJSONAttributeToEntity(idEntity, JSONAttribute, headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            headers['Content-Type'] = 'application/json' ; 
            const options = { // assign the request options 
                method: 'POST',
                headers: headers,
                body: JSON.stringify(JSONAttribute)
            };
            fetch(t._URLContext+'/entities/'+idEntity+'/attrs', options) // make the request 
                .then(function(res) {                    
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve({status : res.status, message : "The JSON object has been added to the entity with 'id':"+idEntity})
                    }
                    else if (res.status === 404){ // if the response status is 404
                        reject(new Error("The entity with 'id':"+idEntity+" has not been found"))
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .catch(function(err){ // if any error occurs
                    reject(new Error(`An error has occurred to add a JSON attribute to the entity: ${idEntity}. Error: ${err}`))
                });

        })
        return promise
    }
    /**
	 * Update entity a specific attribute
     * @param {String} idEntity
     * @param {String} nameAttribute
     * @param {JSON} jsonAttr
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    updateJSONAttrEntity(idEntity, nameAttribute, jsonAttr, headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            headers['Content-Type'] = 'application/json' ; 
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ;  // add the header Access-Control-Allow-Methods
            const options = { // assign the request options 
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(jsonAttr)
            };
            fetch(t._URLContext+'/entities/'+idEntity+'/attrs/'+nameAttribute, options) // make the request 
                .then(function(res) {             
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve({statusCode : res.status , message : "The JSON object has been updated the entity with 'id':"+idEntity})
                    }
                    else if (res.status === 404){ // if the response status is 404
                        reject(new Error("Request failed. Entity or attribute not found"));
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })                
                .catch(function(err){ // if any error occurs
                    reject(new Error(`An error has occurred to get the entity updated: ${err}`));
                });
        })
        return promise
    }
    /**
	 * Update existing entity attributes
     * @param {String} idEntity
     * @param {JSON} jsonObjectAttrs
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    updateEntityAttrs(idEntity, jsonObjectAttrs, headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ;  // add the header Access-Control-Allow-Methods
            headers['Content-Type'] = 'application/json' ; 
            const options = { // assign the request options  
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(jsonObjectAttrs)
            };
            fetch(t._URLContext+'/entities/'+idEntity+'/attrs/', options) // make the request 
                .then(function(res) {             
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve({status : res.status, message : "The attributes of entity with 'id': "+idEntity+ " have been updated successfully"})
                    }
                    else if (res.status === 404){ // if the response status is 404
                       reject(new Error("Request failed. Entity not found"))
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .catch(function(err){ // if any error occurs
                    reject(new Error(`An error has occurred to update the entity attributes: ${err}`))
                });
        })
        return promise
    }
    /**
	 * Update only the value of an specific entity attribute
     * @param {String} idEntity
     * @param {JSON} JSONAttribute
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    updateEntityAttributeValue(idEntity, nameObjectAttribute, val, headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            const valueString = val.toString();
            const valueLength = valueString.length;
            headers['Content-Type'] = 'text/plain' ; 
            headers['Content-Length'] = valueLength;
            const options = { // assign the request options 
                method: 'PUT',
                headers: headers,
                body: valueString
            };
            fetch(t._URLContext+'/entities/'+idEntity+'/attrs/'+nameObjectAttribute+'/value', options) // make the request 
                .then((res) => {  
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve({status : res.status, message : "The attribute 'value' of the object: " + nameObjectAttribute + " that belongs to the entity with 'id': " + idEntity+ " has been updated successful"})
                    }
                    else if (res.status === 404){ // if the response status is 404
                        reject(new Error("Request failded. Etntity or attribute not found"))
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .catch(function(err){ // if any error occurs
                    reject(new Error(`An error has occurred to update the attributte value ${nameObjectAttribute} that corresponds to the entity ${idEntity}: ${err}`));
                });

        })
        return promise
    }
    /**
	 * Raplace all the entity attributes
     * @param {String} idEntity
     * @param {JSON} jsonObjectAttrs
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    replaceAllEntityAttributes(idEntity, jsonObjectAttrs, headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ;  // add the header Access-Control-Allow-Methods
            headers['Content-Type'] = 'application/json' ; 
            const options = { // assign the request options  
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(jsonObjectAttrs)
            };
            fetch(t._URLContext+'/entities/'+idEntity+'/attrs/', options) // make the request 
                .then(function(res) {             
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve({status : res.status, message: "The attributes of the entity with id: "+idEntity+ " has been replaced successfully"})
                    }
                    else if (res.status === 404){ // if the response status is 404
                       reject(new Error("Request failed. Entity not found"))
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .catch(function(err){ // if any error occurs
                    reject(new Error(`An error has occurred replacing the attributes of the entity: ${idEntity} Error: ${err}`))
                });
        })
        return promise
    }
    /**
	 * List entities
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    listEntities(headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ;  // add the header Access-Control-Allow-Methods
            headers['Accept-Type'] = 'application/json' ; 
            const options = { // assign the request options 
                method: 'GET',
                headers: headers
            };
            fetch(t._URLContext+'/entities/', options) // make the request 
                .then(function(res) {                    
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve(res.json())
                    }
                    else if (res.status === 404){ // if the response status is 404
                        reject(new Error("Request failed. Entities not found"))
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .catch((err)=>{ // if any error occurs
                    reject(new Error(`An error has occurred to get the entities list: ${err}`));
                });
        })
        return promise
    }

    /**
	 * Get entities inside the area
	 * @returns {Promise} 
	*/
    queryEntitiesOnArea() {
        let polygon = arguments[0]
        let query = "?"
        if (arguments[1] !== undefined && arguments[2] === undefined){
            if (typeof arguments[1] === 'boolean'){
                if(arguments[1]){
                    query+="options=keyValues&"
                }
            }else {
                return new Error('A value boolean was expected')
            }
        }else if (arguments[1] !== undefined && arguments[2] !== undefined ) {
                if (arguments[3] !== undefined && arguments[3]) 
                    query+="options=keyValues&"
                query+= `id=${arguments[1]}`
                query+= `&type=${arguments[2]}&`
            }else if(
                (arguments[1] === undefined && arguments[2] !== undefined) || 
                (arguments[1] !== undefined && arguments[2] === undefined)
            )
                return new Error('Error in the number of parameters')
            query+='georel=coveredBy&geometry=polygon&coords='
            query+=polygon.join(';')
        let t = this 
        const promise = new Promise(function (resolve, reject) {

            const options = {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE'
                },
            };
            
            fetch(t._URLContext+`/entities${query}`, options)
                .then(function(res) {              
                    if(res.status >= 200 && res.status <= 208){
                        resolve(res.json());
                    }
                    else if (res.status === 404){
                        reject(new Error("The entities has not been found"));
                    }
                    else{
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .catch((err) => {
                    reject(new Error(`An error has occurred in the search for the entities: ${err}`))
                });
        })
        return promise

    }   
    
    /** SUBSCRIPTIONS SECTION **/
    
    /**
	 * Create a new Subscription
     * @param {JSON} subscription
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    createSubscription(subscription, headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            headers['Content-Type'] = 'application/json' ; 
            const options = { // assign the request options 
                method: 'POST',
                headers: headers,
                body: JSON.stringify(subscription)
            };
            fetch(t._URLContext+'/subscriptions', options) // make the request 
                .then(function(res) {                    
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        let id = res.headers._headers.location[0].split("/")[3]; // get the id of the subscription created
                        resolve({
                            status : res.status,
                            message: "Subscription created successfully",
                            id 
                        })
                    }
                    else if (res.status === 422){ // if the response status is 422
                        reject(new Error("Existing subscription ID"))
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .catch(function(err){ // if any error occurs
                    reject(new Error(`An error has occurred to create the subscription: ${err}`))
                });
        })
        return promise            
    }
    /**
	 * Get the subscriptions list
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    listSubscriptions( headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ;  // add the header Access-Control-Allow-Methods
            headers['Accept-Type'] = 'application/json' ; 
            const options = { // assign the request options 
                method: 'GET',
                headers: headers
            };
            fetch(t._URLContext+'/subscriptions/', options) // make the request 
                .then(function(res) {                    
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve(res.json())
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .catch((err)=>{ // if any error occurs
                    reject(new Error(`Has occurred an error to get the subscriptions list: ${err}`));
                });
        })
        return promise
    }
    /**
	 * Get a specific subscription
     * @param {String} idSubscription
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    getSubscription(idSubscription, headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ;  // add the header Access-Control-Allow-Methods
            headers['Accept-Type'] = 'application/json' ; 
            const options = { // assign the request options 
                method: 'GET',
                headers: headers
            };
            fetch(t._URLContext+'/subscriptions/'+idSubscription, options) // make the request 
                .then(function(res) {                    
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve(res.json())
                    }
                    else if (res.status === 404){ // if the response status is 404
                        reject(new Error("Request failed. Subscription not found"))
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }
                })
                .catch((err)=>{ // if any error occurs
                    reject(new Error(`An error has occurred to get the subscription with 'id': ${idSubscription} Error: ${err}`));
                });
        })
        return promise
    }

    /**
	 * Udpate the subscription status
     * @param {String} idSubscription
     * @param {String} status
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    updateSubscriptionStatus(idSubscription, status, headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ;  // add the header Access-Control-Allow-Methods
            headers['Content-Type'] = 'application/json' ; 
            const options = { // assign the request options 
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify({
                    "status": status
                })
            };
            fetch(t._URLContext+'/subscriptions/'+idSubscription, options) // make the request 
                .then(function(res) { 
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve({status : res.status, message: "The subscription: "+idSubscription+" has change to status: "+status})
                    }
                    else if (res.status === 404){ // if the response status is 404
                        reject(new Error("Request failed. Subscription not found"))
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }  
                })
                .catch((err)=> { // if any error occurs
                    reject(new Error(`Has occurred an error to inactivate the subscription: ${idSubscription} Error: ${err}`));
                });
        })
        return promise
    }

    /**
	 * Update a specific subscription
     * @param {String} idSubscription
     * @param {JSON} jsonSubscription
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    updateSubscription(idSubscription, jsonSubscription, headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ;  // add the header Access-Control-Allow-Methods
            headers['Content-Type'] = 'application/json' ; 
            const options = { // assign the request options  
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(jsonSubscription)
            };
            fetch(t._URLContext+'/subscriptions/'+idSubscription, options) // make the request 
                .then(function(res) {             
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve({status : res.status, message: "The subscription: "+idSubscription+" has been updated successfully"})
                    }
                    if (res.status === 404){ // if the response status is 404
                       reject(new Error("Request failed. Subscription not found"))
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }  
                })
                .catch(function(err){ // if any error occurs
                    reject(new Error(`An error has occurred to update the subscription: ${idSubscription}. Error: ${err}`))
                });
        })
        return promise
    }

    /**
	 * Delete a specific subscription
     * @param {String} idSubscription
     * @param {JSON} headers
	 * @returns {Promise} 
	*/
    deleteSubscription(idSubscription, headers = {}){
        let t = this
        const promise = new Promise(function (resolve, reject) { // Initialize the promise 
            headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, PATCH, DELETE' ;  // add the header Access-Control-Allow-Methods
            const options = { // assign the request options 
                method: 'DELETE',
                headers: headers,
            };
            fetch(t._URLContext+'/subscriptions/'+idSubscription, options) // make the request 
                .then(function(res) {
                    if(res.status >= 200 && res.status <= 208){ // if the response status is between 200 and 208
                        resolve({status : res.status, message: "Has been removing the subscription with 'id': "+idSubscription})
                    }
                    else if (res.status === 404){ // if the response status is 404
                        reject(new Error("The subscription with 'id': "+idSubscription+ " has not been found"));
                    }
                    else if(res.status >= 500 && res.status <= 521){ // if the response status is between 500 and 521
                        reject(new Error("The server failed to complete the request"))
                    }
                    else{ // if the response status is another 
                        reject({status : res.status , message : res.statusText});
                    }  
                })
                .catch(function(err){ // if any error occurs
                    reject(new Error(`An error has occurred removing the subscription: ${err}`));
                });
        })
        return promise
    }
}
module.exports = new OCB(); // ES6 default export compatibility
module.exports.default = module.exports;
