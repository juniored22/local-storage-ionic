import { Component } from '@angular/core';

import { LocalStorageProvider } from '../providers/localStorage-database'
import { promise } from 'protractor';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public localStorageProvider: LocalStorageProvider) {
    var storage = this.localStorageProvider
    
    
    let schema_user = {
    	name: { type: 'String' },
    	email: { type: 'String' },
    	password: { type: 'String' },
    	created_at : {}
    }

    let schema_product = {
    	name: { type: 'String', },
    	price: { type: 'String', },
    	create_at : {}
    }
   
    // console.log("Modulos => ",storage.modules());
     
    
    storage.schema('users', schema_user)
    storage.schema('products', schema_product)

    const user = storage.module('users')

    

    new Promise((resolver) =>{
      user['name'] = "Dereck"
      resolver(user.create())
    }).then(()=>{
      user['name'] = "Sara"
      user.create()
    })
    
 
    

 
  }

}
