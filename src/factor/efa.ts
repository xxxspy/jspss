import * as mathjs from 'mathjs'
import {DataFrame, Series} from '../data/api'
import * as tf from '@tensorflow/tfjs'
import * as mutils from '../utils/mathjs'



export function efa(data: DataFrame, nfactor=-1){
    let ans = mathjs.eigs(data.crr())
    
    console.log('>>>>>>>>特征值<<<<<<<<<')
    // console.log(ans.values)
    // console.log(ans.vectors)
    console.log(mathjs.sqrt(ans.values))
    // let sorted = mathjs.sort(ans.values, 'desc')

    let vectors = ans.vectors
    let n = vectors.size()[0]
    let broad = mathjs.multiply(
        mathjs.ones(n, 1), mathjs.reshape(mathjs.sqrt(ans.values), [1, n]))
    // let broad = sorted.values.sqrt().reshape([1, n]).broadcastTo([n, n])
    // let loads = vectors.mul(broad)
    let loads = mathjs.multiply(vectors, broad)
    if(nfactor<0){
        // nfactor = ans.values.greaterEqual(1).sum()
        nfactor = mathjs.sum(
            mathjs.largerEq(ans.values, 1)
        )
    }

    let [r,c] = loads.size()
    return {
        values: ans.values,
        vectors: ans.vectors,
        loads: loads,
        // loads2: loads.slice([0,0], [loads.shape[0], nfactor])
        loads2: mutils.slice(loads, [0, c-nfactor], [r, nfactor])
    }
}