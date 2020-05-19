import {Series} from '../data/series'
import * as tf from '@tensorflow/tfjs'


export function omega(data: Series|Array<number>|tf.Tensor){
    if(Array.isArray(data) || data instanceof tf.Tensor){
        data = new Series(data)
    }
    let squ = data.square()
    let sm = data.sum().square()
    let err = squ.values.mul(-1).add(1).sum()
    return sm.div(sm.add(err))
}