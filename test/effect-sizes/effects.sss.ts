// import chai from 'chai';
import {should} from 'chai'
should()

import {DataFrame} from '../../src/data/dataframe'
import * as tf from '@tensorflow/tfjs'
import {cohens_d} from '../../src/effect-sizes/effects'


tf.setBackend("cpu");
require('jsdom-global')()


let df = new DataFrame(tf.tensor2d([[1,2, 3], [1,4,4], [2,7,5], [2,7,5]]), ['a', 'b', 'c'])

describe('ddd', ()=>{
    it('chhens_d', async ()=>{
        let ds = await cohens_d(df, ['b', 'c'], 'b', [1,2])
        console.log('--------------')
        ds.length.should.equal(2)
        ds[0].dataSync()[0].should.equal(1)
    })
})
