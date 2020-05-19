import {omega} from '../src/factor/reliability'
import {should} from 'chai'
import * as tf from '@tensorflow/tfjs'

tf.setBackend("cpu");
should()

describe('reliability', ()=>{
    // jamovi使用的是Principal axis方法提取因子
    it('omega', ()=>{
        let loads = [
            0.856274547,
            0.728978383,
            0.776175521,
        ]
        let val = omega(loads)
        val.dataSync()[0].should.within(0.831138, 0.831139)
        loads = [
            0.869263365,
            0.754297177,
            0.863339896,
        ]
        val = omega(loads)
        val.dataSync()[0].should.within(0.86927676, 0.86927677)

    })
})


