
  /**
   * Check is collection db
   * @param name 
   * 
   */
  function dbExists(name) {
     
    
    let collections = localStorage.getItem('col').split(',')
 
   
    let qt_collections = collections.length



   
    if (isInArray(name, collections)) {
      return true;
    }

    if (collections[0] == '[]' || collections[0] == '') {
      collections[0] = 'test'
    }


    collections[qt_collections] = name;

 
    
    localStorage.setItem('col', collections.toString())
    return false;
  }

  /**
   * Check is Object
   * @param val 
   */
  function isObject(val) {
    return val instanceof Object;
  }

   /**
  * Function aux check is Array
  * @param value 
  * @param array 
  */
 function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

export const Collections = {

  model: (name) => {
    let obj_collections = JSON.parse(localStorage.getItem(name));
    return obj_collections;
  },

  /**
   * Schema model for structure
   */
  schema: (name = '', keys = {}) => {
    
    if (dbExists(name)) {
      return false
    }

    if (isObject(keys)) {
      keys['_id'] = {
        type: 'String',
        index: true,
        unique: true
      }

      localStorage.setItem(name, JSON.stringify(keys))
    }
    return null;
  },

  /**
   * Show collections
   */
  collections: () => {
    console.log(`%c ${localStorage.getItem('col')}`,'background: #222; color: #bada55');
    
    let obj_collections = Object.assign({}, localStorage.getItem('col').split(','));
    return obj_collections;
  },

  /**
   * Get models
   */
  collection: {
    desc: (name) => {
      let obj_collections = JSON.parse(localStorage.getItem(name));
      return obj_collections;
    }
  },


  localStorage: () => {
    return localStorage
  },
}