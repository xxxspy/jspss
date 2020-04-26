// import chai from 'chai';
import {should} from 'chai'
should()

import {DataFrame} from '../../src/data/dataframe'
import * as tf from '@tensorflow/tfjs'
import {cohens_d} from '../../src/means/effects'


tf.setBackend("cpu");
require('jsdom-global')()


let df = new DataFrame(tf.tensor2d([[1,2, 3], [1,4,4], [2,6,5], [2,7,4]]), ['a', 'b', 'c'])

describe('ddd', ()=>{
    it('chhens_d', async ()=>{
        let ds = await cohens_d(df, ['b', 'c'], 'a', [1,2])
        ds.length.should.equal(2)
        ds[0].dataSync()[0].should.within(-3.13050, -3.13049)
        ds[1].dataSync()[0].should.within(-1.41422, -1.41421)
    })
    
})
