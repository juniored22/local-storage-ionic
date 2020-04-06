import { NgModule, ModuleWithProviders } from '@angular/core';
import { LocalStorageProvider } from './localStorage-database'


@NgModule({
    imports:[
        LocalStorageProvider,
    ],
    declarations:[],
    exports:[]
})

export class LocalStorageModel{

}