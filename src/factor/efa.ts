import * as mathjs from 'mathjs'
import {DataFrame, Series} from '../data/api'
import * as tf from '@tensorflow/tfjs'



export function efa(data: DataFrame, nfactor=-1){
    console.log('<<<<<<<<<<<<<<<<<<<<')
    let ans = mathjs.eigs(data.crr().arraySync())
    console.log(ans.values)
    console.log(ans.vectors)
    let sorted = tf.tensor(ans.values).topk(data.shape[1])
    console.log('>>>>>>>>特征值<<<<<<<<<')
    sorted.values.print()

    let vectors = tf.tensor(ans.vectors).gather(sorted.indices, 1)
    vectors.print()
    let n = vectors.shape[0]
    let broad = sorted.values.sqrt().reshape([1, n]).broadcastTo([n, n])
    let loads = vectors.mul(broad)
    if(nfactor<0){
        nfactor = ans.values.greaterEqual(1).sum()
    }
    return {
        values: ans.values,
        vectors: ans.vectors,
        loads: loads,
        loads2: loads.slice([0,0], [loads.shape[0], nfactor])
    }
}