import {DataFrame} from '../../src/data/dataframe'
import * as tf from '@tensorflow/tfjs'

let df = new DataFrame(tf.tensor2d([[1,2], [3,4], [5,7]]), ['a', 'b'])

df.values.print()
df.select_col('a').values.print()

// import * as j from 'jstat'

let a = 1

function ttt(a:number):number{
    return 0
}