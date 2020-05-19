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


    let df2 = new DataFrame(tf.tensor2d([
        [5,4,5],
[5,4,5],
[4,4,4],
[2,1,1],
[5,5,5],
[3,3,3],
[4,4,2],
[4,2,3],
[5,5,4],
[3,2,2],
[4,3,5],
[5,4,4],
[4,4,3],
[2,2,1],
[5,4,5],
[3,3,3],
[4,3,4],
[4,4,4],
[2,2,2],
[4,3,4],
[3,3,2],
[5,5,4],
[4,3,4],
[4,2,4],
[4,3,3],
[3,4,4],
[3,3,4],
[5,5,5],
[2,2,2],
[3,3,2],
[4,3,4],
[4,3,4],
[4,2,3],
[3,3,5],
[5,4,5],
[4,2,4],
[4,5,4],
[5,5,5],
[4,3,3],
[2,2,2],
[4,4,4],
[4,3,3],
[4,3,4],
[3,4,4],
[4,3,4],
[5,4,4],
[2,2,2],
[5,4,4],
[5,2,3],
[5,4,4],
[2,3,2],
[5,4,5],
[4,4,4]
    ]))
describe('factor', ()=>{
    it('EFA1', ()=>{
        let results = efa(df, 1)
        results.loads2.arraySync()[0][0].should.within(0.9737612, 0.9737613)
        results.loads2.arraySync()[1][0].should.within(0.9180709, 0.91807099)
        results.loads2.arraySync()[2][0].should.within(0.324586, 0.324586999)
    })

    it('EFA2', ()=>{
        let results = efa(df2, 1)
        results.loads2.print()
        results.loads2.arraySync()[0][0].should.within(0.9047810, 0.9047812)
        results.loads2.arraySync()[1][0].should.within(0.8597697, 0.8597699)
        results.loads2.arraySync()[2][0].should.within(0.9028085, 0.9028087)
    })
})

// SPSS results:
// 0.973761
// 0.918071
// 0.324587