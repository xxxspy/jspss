import {efa} from '../../src/factor/efa'
import {should} from 'chai'
import * as tf from '@tensorflow/tfjs'
import {DataFrame} from '../../src/data/dataframe'
tf.setBackend('cpu')

should()

let df = new DataFrame(tf.tensor2d([	
    [90,60,90],
    [90,90,30],
    [60,60,60],
    [60,60,90],
    [30,30,30]]))

describe('factor', ()=>{
    it('efa', ()=>{
        efa(df)
    })
})