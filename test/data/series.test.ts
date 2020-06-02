import {should} from 'chai'
import * as tf from "@tensorflow/tfjs"
import {Series} from '../../src/data/series'
tf.setBackend("cpu")
should()

// import * as bs from '../src/data/basic-stats.ts'


describe('series:', ()=>{
    it('statics:', ()=>{
        let ser = new Series([0, 1, 1, 1, 1, 0, 1, 2, 1, 2])
        ser.mean().should.be.equal(1)
        ser.std().should.be.within(0.666, 0.667)
    })


})
