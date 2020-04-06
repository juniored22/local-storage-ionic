import { Injectable }  from '@angular/core'
import { Collections } from './lib/collections'
import { SetupSystem } from './lib/setup-system'
import { log } from 'util'

@Injectable()
export class LocalStorageProvider {

  collections:any = Collections
  setupSystem:any = SetupSystem

  /**
   * Starts settings and data for application collect info, collection, _data
   * @constructor
   */
  constructor() {
    this.setupSystem.setDbs()
    this.setupSystem.setColections()
  }

  /**
   * 
   * @param name String
   * @param schema Object
   */
  schema(name = '', schema = {}) {

    this.collections.schema(name, schema);
  }

  /**
   * Show modules schema 
   * @exemple
   * users,groups and products
   */
  modules() {
    var colectionsSchema =  this.collections.collections()
    return colectionsSchema
  }

  /**
   * Creating a specific model
   * @param name 
   */
  module(name = '') {
    if (this.isEmpty(name)) {
      return null
    }
    return new Method(name,  this.collections.model(name));
  }

  /**
   * Function aux check is Empty
   * @param val  
   */
  isEmpty(val) {
    return val == null || !(Object.keys(val) || val).length
  };

 /**
  * Function aux check is Array
  * @param value 
  * @param array 
  */
  isInArray(value, array) {
    return array.indexOf(value) > -1;
  }

  /**
   * Check is Object
   * @param val 
   */
  isObject(val) {
    return val instanceof Object;
  }

}

class Method {

  id: any;
  name_schema: any;
  created_at: any;
  object: any;

/**
 * @constructor
 * @param name_schema 
 * @param schema 
 */
  constructor(name_schema, schema) {
    for (var member in schema) schema[member] = null;

    this.id = null
    this.name_schema = name_schema
    this.created_at = new Date()
    this.object = schema
  }

  create() {
    
    let { object, ...new_atrr } = this
    const new_object = { ...object, ...new_atrr }
    console.log("RESPONSE",this['name']);
    
    return new Promise((resolver)=>{

      let data_storage = JSON.parse(localStorage.getItem(this.name_schema+'_dt'))
      resolver(data_storage)

    })
    .then((data_storage)=>{
    
      if (data_storage) {
        console.log("EXISTE",data_storage[this.name_schema]);
        
        data_storage[this.name_schema].push(new_object)
        // debugger
      } else {
        let tmp = JSON.parse(`{ "${this.name_schema}" : [] }`)
        tmp[this.name_schema].push(new_object)
        data_storage = tmp
      }

      return data_storage
    })
    .then((data)=>{
  
      return localStorage.setItem(this.name_schema+'_dt', JSON.stringify(data));
      
    })
    .then((data)=>{
      let tmp = localStorage.getItem(this.name_schema+'_dt')
      console.log("RESULT",this['name'],JSON.parse(tmp));
      
      return tmp
    })

    
  }
}