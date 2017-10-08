"use strict";
var fetch = require('node-fetch');
class OCB {
    constructor(){
        this._host  = null;
        this._port = null;
        this._version = null;
        this._connect = null;
    }
    config(host, port, version ){
        this._host = host;
        this._port = port.toString();
        this._version = version;
        this._URLContext= this._host+':'+this._port+'/'+this._version;
    }
    testConnect(){
        let t = this
        const promise = new Promise(function (resolve, reject) {
            fetch(t._URLContext)
            .then((res) => {
                if(res.status === 200){
                    t.message = 'Success';
                    console.log(res.status+" "+t.message +" "+res.statusText);
                    resolve({statusCode : res.status})
                }
                if (res.status === 404){
                    reject(new Error("La entidad con el 'id':"+idEntity+" no se encuentra registrada"))
                }
            })
            .catch((err)=>{
                console.log(`Ha ocurrido un error en la conexión: ${err}`);
                reject(new Error(`Ha ocurrido un error en la conexión: ${err}`))
            })
        })
        return promise
    }    
    addTimeStampEntity(entity){
        let timeStamp = 
            {
                "value": new Date().toISOString(),
                "type" : "DateTime"
            };
        entity['timestamp'] = timeStamp;
        return entity;
    }
    addJSONAttributeToEntity(idEntity, JSONAttribute){
        let t = this
        const promise = new Promise(function (resolve, reject) {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(JSONAttribute)
            };
            fetch(t._URLContext+'/entities/'+idEntity+'/attrs', options)
                .then(function(res) {                    
                    if(res.status === 204){
                        console.log("El objeto JSON fue agregado a la entidad con 'id':"+idEntity);
                        resolve({statusCode : res.status})
                    }
                    if (res.status === 404){
                        reject(new Error("La entidad con el 'id':"+idEntity+" no se encuentra registrada"))
                    }
                })
                .catch(function(err){
                    reject(new Error(`Ha ocurrido un error en el ingreso de la entidad: ${err}`))
                });

        })
        return promise
    }
    createEntity(entity){
        //Add timestamp attribute to all entity that will be created
        this.addTimeStampEntity(entity);
        let t = this
        const promise = new Promise(function (resolve, reject) {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(entity)
            };
            fetch(t._URLContext+'/entities', options)
                .then(function(res) {                    
                    if(res.status === 201){
                        console.log("Entidad creada con éxito");
                        resolve({statusCode : res.status})
                    }
                    if (res.status === 422){
                        reject(new Error("Entidad con ID existente"))
                    }
                })
                .catch(function(err){
                    reject(new Error(`Ha ocurrido un error en el ingreso de la entidad: ${err}`))
                });

        })
        return promise
            
    }
    getEntity(idEntity){
        let t = this
        const promise = new Promise(function (resolve, reject) {
            const options = {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE'
                },
            };
            fetch(t._URLContext+'/entities/'+idEntity, options)
                .then(function(res) {              
                    if(res.status === 200){
                        //console.log("Entidad 'id': "+idEntity+"");
                        resolve(res.json());
                    }
                    if (res.status === 404){
                        reject(new Error("La entidad con 'id': "+idEntity+ " no ha sido encontrada"));
                    }
                })
               /* .then((json)=>{
                    resolve(json);
                })*/
                .catch((err) => {
                    reject(new Error(`Ha ocurrido un error en la búsqueda de la entidad: ${err}`))
                });
        })
        return promise

    }
    deleteEntity(idEntity){
        let t = this
        const promise = new Promise(function (resolve, reject) {
            const options = {
                method: 'DELETE',
                headers: {
                    'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE'
                },
            };
            fetch(t._URLContext+'/entities/'+idEntity, options)
                .then(function(res) {
                    if(res.status === 204){
                        resolve({statusCode : res.status})
                        //console.log("Entidad 'id': "+idEntity+" eliminada con exito");
                    }
                    if (res.status === 404){
                        reject(new Error("La entidad con 'id': "+idEntity+ " no ha sido encontrada"));
                    }
                })
                .catch(function(err){
                    reject(new Error(`Ha ocurrido un error en la eliminación de la entidad: ${err}`));
                });
        })
        return promise
    }
    updateJSONAttrEntity(idEntity, nameAttribute,jsonAttr){
        let t = this
        const promise = new Promise(function (resolve, reject) {
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE'
                },
                body: JSON.stringify(jsonAttr)
            };
            fetch(t._URLContext+'/entities/'+idEntity+'/attrs/'+nameAttribute, options)
                .then(function(res) {             
                    if(res.status === 204){
                        console.log("El JSON del atributo '"+nameAttribute+"'"+" de la entidad 'id': "+idEntity+ " ha sido actualizado con éxito");
                        resolve({statusCode : res.status})
                        //this.getEntity(idEntity);
                    }
                    if (res.status === 404){
                        reject(new Error("Solicitud fallida. Entidad no encontrada o atributo "));
                        
                    }
                })                
                .catch(function(err){
                    reject(new Error(`Ha ocurrido un error al obtener la entidad actualizada: ${err}`));
                });
        })
        return promise

    }
    updateEntityAttrs(idEntity,jsonObjectAttrs){
        let t = this
        const promise = new Promise(function (resolve, reject) {

            const options = { 
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE'
                },
                body: JSON.stringify(jsonObjectAttrs)
            };
            fetch(t._URLContext+'/entities/'+idEntity+'/attrs/', options)
                .then(function(res) {             
                    if(res.status === 204){
                        console.log("Los atributos de la entidad 'id': "+idEntity+ " ha sido actualizado con éxito");
                        //this.getEntity(idEntity);
                        resolve({statusCode : res.status})
                    }
                    if (res.status === 404){
                       reject(new Error("Solicitud fallida. Entidad no encontrada"))
                        //console.log(res.json());
                    }
                })
                .catch(function(err){
                    reject(new Error(`Ha ocurrido un error al obtener la entidad actualizada: ${err}`))
                });
        })
        return promise

    }
    updateEntityAttributeValue(idEntity, nameObjectAttribute, val){

        let t = this
        const promise = new Promise(function (resolve, reject) {
            
            const valueLength = val.length;
            const valueL = valueLength.toString();
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'text/plain',
                    'Content-Length': valueL
                },
                body: val
            };
            //console.log("longitud "+valueLength.toString())
            fetch(t._URLContext+'/entities/'+idEntity+'/attrs/'+nameObjectAttribute+'/value', options)
                .then((res) => {  
                    if(res.status === 204){
                        console.log("El atributo 'value' del objeto: "+nameObjectAttribute+" que pertenecen a la entidad 'id': "+idEntity+ " ha sido actualizado con éxito");
                        resolve({statusCode : res.status})
                        //this.getEntity(idEntity);
                    }
                    if (res.status === 404){
                        reject(new Error("Solicitud fallida. Entidad o atributo no encontrado"))
                        //console.log(res.json());
                    }
                    else{
                        reject(new Error("Solicitud fallida"))
                    }
                })
                .catch(function(err){
                    reject(new Error(`Ha ocurrido un error al obtener la entidad actualizada: ${err}`));
                });

        })
        return promise
    }
    listEntities(){
        let t = this
        const promise = new Promise(function (resolve, reject) {

            const options = {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE'
                }
            };

            fetch(t._URLContext+'/entities/', options)
                .then(function(res) {
                    
                    if(res.status === 200){
                        resolve(res.json())
                    }
                    if (res.status === 404){
                        reject(new Error("Solicitud fallida. Entidades no encontradas"))
                    }
                })
               /* .then(function(json) {
                    //console.log(json);
                    resolve(json);            
                })*/
                .catch((err)=>{
                    //console.log(`Ha ocurrido un error al obtener el listado de entidades: ${err}`);
                    reject(new Error(`Ha ocurrido un error al obtener el listado de entidades: ${err}`));
                });
        })

        return promise

    }

}
module.exports = new OCB()
// es6 default export compatibility
module.exports.default = module.exports;
