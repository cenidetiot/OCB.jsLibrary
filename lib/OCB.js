"use strict";
var fetch = require('node-fetch');
class OCB {
	constructor(){
        this._host  = null;
        this._port = null;
        this._version = null;
        this._connect = null;
    }
    toString () {
        return `${this.port}`;
    }

    config(host, port, version ){
        this._host = host;
        this._port = port.toString();
        this._version = version;
        this._URLContext = this._host+':'+this._port+'/'+this._version;
    }
    testConnect(){
        let t = this
        fetch(this._URLContext)
        .then((res) => {
            if(res.status === 200){
                t.message = 'Success';
                console.log(res.status+" "+t.message +" "+res.statusText);
            }
        })
        .catch((err)=>{
            console.log(`Ha ocurrido un error en la conexión: ${err}`);
        })
        //this.message = t.message
        //console.log("Impresión de la variable t final "+this.message);
    }    
    createEntity(entity){
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entity)
        };
        fetch(this._URLContext+'/entities', options)
            .then(function(res) {
                
                if(res.status === 201){
                    console.log("Entidad creada con éxito");
                }
                if (res.status === 422){
                    console.log("Entidad con ID existente");
                }
            })
            .catch(function(err){
                console.log(`Ha ocurrido un error en el ingreso de la entidad: ${err}`);
            });
            
    }
    getEntity(idEntity){
        const options = {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE'
            },
        };
        fetch(this._URLContext+'/entities/'+idEntity, options)
            .then(function(res) {              
                if(res.status === 200){
                    console.log("Entidad 'id': "+idEntity+"");
                    return res.json();
                }
                if (res.status === 404){
                    console.log("La entidad con 'id': "+idEntity+ " no ha sido encontrada");
                }
            })
            .then((json)=>{
                console.log(json);
            })
            .catch(function(err){
                console.log(`Ha ocurrido un error en la búsqueda de la entidad: ${err}`);
            });

    }
    deleteEntity(idEntity){
        const options = {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE'
            },
        };
        fetch(this._URLContext+'/entities/'+idEntity, options)
            .then(function(res) {
                //console.log(res.status);
                //console.log(res.statusText);                
                if(res.status === 204){
                    console.log("Entidad 'id': "+idEntity+" eliminada con exito");
                }
                if (res.status === 404){
                    console.log("La entidad con 'id': "+idEntity+ " no ha sido encontrada");
                }
            })
            .catch(function(err){
                console.log(`Ha ocurrido un error en la eliminación de la entidad: ${err}`);
            });
            
    }
    updateJSONAttrEntity(idEntity, nameAttribute,jsonAttr){
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE'
            },
            body: JSON.stringify(jsonAttr)
        };
        fetch(this._URLContext+'/entities/'+idEntity+'/attrs/'+nameAttribute, options)
            .then(function(res) {             
                if(res.status === 204){
                    console.log("El JSON del atributo '"+nameAttribute+"'"+" de la entidad 'id': "+idEntity+ " ha sido actualizado con éxito");
                    //this.getEntity(idEntity);
                }
                if (res.status === 404){
                    console.log("Solicitud fallida. Entidad no encontrada o atributo ");
                    console.log(res.json());
                }
            })
            
            .catch(function(err){
                console.log(`Ha ocurrido un error al obtener la entidad actualizada: ${err}`);
            });

    }
    updateEntityAttrs(idEntity,jsonObjectAttrs){
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE'
            },
            body: JSON.stringify(jsonObjectAttrs)
        };
        fetch(this._URLContext+'/entities/'+idEntity+'/attrs/', options)
            .then(function(res) {             
                if(res.status === 204){
                    console.log("Los atributos de la entidad 'id': "+idEntity+ " ha sido actualizado con éxito");
                    //this.getEntity(idEntity);
                }
                if (res.status === 404){
                    console.log("Solicitud fallida. Entidad no encontrada o atributo ");
                    //console.log(res.json());
                }
            })
            .catch(function(err){
                console.log(`Ha ocurrido un error al obtener la entidad actualizada: ${err}`);
            });

    }
    updateEntityAttributeValue(idEntity, nameObjectAttribute, attrOfObject, val){
        const value = val;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'text/plain',
                'Content-Length': '1'
            },
            body:val
        };
        fetch(this._URLContext+'/entities/'+idEntity+'/attrs/'+nameObjectAttribute+'/'+attrOfObject, options)
            .then((res) => {  
                if(res.status === 204){
                    console.log("El valor del atributo: "+attrOfObject+" del objeto: "+nameObjectAttribute+" que pertenecen a la entidad 'id': "+idEntity+ " ha sido actualizado con éxito");
                    //this.getEntity(idEntity);
                }
                if (res.status === 404){
                    console.log("Solicitud fallida");
                    //console.log(res.json());
                }
            })
            .catch(function(err){
                console.log(`Ha ocurrido un error al obtener la entidad actualizada: ${err}`);
            });

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
                .then(function(json) {
                    console.log(json);            
                })
                .catch(function(err){
                    console.log(`Ha ocurrido un error al obtener el listado de entidades: ${err}`);
                });
        })

        return promise

    }

}
module.exports = new OCB()