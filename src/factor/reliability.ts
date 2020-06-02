import {Series} from '../data/series'
import * as mathjs from 'mathjs'


export function omega(data: Array<number>|Series){
    if(Array.isArray(data)||data instanceof mathjs.Matrix){
        data = new Series(data)
    }
    let squ = data.square()
    let sm = data.sum()**2
    // let err = squ.values.mul(-1).add(1).sum()
    let err = mathjs.sum(mathjs.add(mathjs.multiply(squ.values, -1), 1))
    return mathjs.divide(sm, mathjs.add(sm, err))
}