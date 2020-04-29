import {should} from 'chai'
import * as tf from '@tensorflow/tfjs'
import {DataFrame} from '../../src/data/dataframe'

should()
tf.setBackend('cpu')

describe('dataframe', ()=>{
    it('covariate matrix', ()=>{
        let df = new DataFrame(tf.tensor2d([	
            [90,60,90],
            [90,90,30],
            [60,60,60],
            [60,60,90],
            [30,30,30]]))
        let cov = df.var()
        cov.print()
        cov.arraySync().should.be.deep.equal([[504, 360, 180],
            [360, 360, 0  ],
            [180, 0  , 720]])
        let crr = df.crr().arraySync()
        crr[1][0].should.within(0.8451, 0.8452)
        crr[2][0].should.within(0.2988, 0.2989)
    })
})