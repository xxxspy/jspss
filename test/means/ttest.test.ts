import {should} from 'chai'
import * as tf from '@tensorflow/tfjs'
import {Series} from '../../src/data/series'
import {t, df, p, psd} from '../../src/means/ttests/ind-samples'
tf.setBackend("cpu");
should()


let x = new Series([373,398,245,272,238,241,134,410,158,125,198,252,577,272,208,260])
let y = new Series([411,471,320,364,311,390,163,424,228,144,246,371,680,384,279,303])

let m1 = x.mean()
let m2 = y.mean()
let var1 = x.var()
let var2 = y.var()
let n1 = tf.scalar(x.shape[0])
let n2 = tf.scalar(y.shape[0])
let psdval = psd(var1, var2, n1, n2)


let tval = t(m1, m2, var1, var2, n1, n2)
let dfval = df(n1, n2)
let pval = p(tval, dfval, m1.sub(m2), psdval)

describe('ttest', ()=>{
    it('mean.var.n', ()=>{
        m1.dataSync()[0].should.equal(272.5625)
        m2.dataSync()[0].should.equal(343.0625)
        var1.dataSync()[0].should.within(13650.12, 13650.13)
        var2.dataSync()[0].should.within(16542.462, 16542.463)
    })
    it('tvalue.dfvalue', ()=>{
        tval.dataSync()[0].should.within(-1.622927, -1.622926)
        dfval.dataSync()[0].should.equal(30)
    })
    
})