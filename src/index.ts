"use strict";
export * as facotr  from './factor/api'
export {DataFrame} from './data/dataframe'
export {Series} from './data/series'
export {process} from './regression/process/process'
export * as utils from './utils/main'

const config = require('../package.json');


export let version=config.version

// import {factor} from './factor/api' 
// // const factor = require('factor')

// export class tfstat {
//     version: string
//     factor: object
//     constructor(){
//         this.version='0.01'
//         this.factor = omega
//     }
// }

// we export the class instance via a function call
// module.exports = () => {
//     return new tfstat()
// };



