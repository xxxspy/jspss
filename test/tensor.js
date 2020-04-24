import chai from "chai"
import * as tf from "@tensorflow/tfjs"
tf.setBackend("cpu")

import * as bs from '../src/data/basic-stats.ts'

let data = tf.tensor([
    [9.00,9.00],
    [7.00,6.00],
    [8.00,7.00],
    [9.00,8.00],
    [8.00,7.00],
    [9.00,9.00],
    [9.00,8.00],
    [10.0,8.00],
    [9.00,8.00],
    [9.00,7.00],
], [10, 2])




describe('test mean std', ()=>{

    let cha = data.slice([0, 0], [10, 1]).sub(data.slice([0, 1], [10, 1])).flatten()
    cha.arraySync().should.deep.equal([0, 1, 1, 1, 1, 0, 1, 2, 1, 2])
    console.log(cha.dtype)
    let ms = bs.mean_std(cha)
    ms.mean.dataSync()[0].should.equal(1)
    ms.std.dataSync()[0].should.equal(0.6666666865348816)
})