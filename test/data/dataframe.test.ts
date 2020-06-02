import {should} from 'chai'
import {DataFrame} from '../../src/data/dataframe'
import {efa} from '../../src/factor/api'


should()


let df = new DataFrame([	
    [90,60,90],
    [90,90,30],
    [60,60,60],
    [60,60,90],
    [30,30,30]])

    let df2 = new DataFrame([
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
    ])

describe('dataframe', ()=>{
    // it('covariate matrix', ()=>{
    //     let cov = df.var()
    //     cov.print()
    //     cov.arraySync().should.be.deep.equal([[504, 360, 180],
    //         [360, 360, 0  ],
    //         [180, 0  , 720]])
    //     let crr = df.crr().arraySync()
    //     crr[1][0].should.within(0.8451, 0.8452)
    //     crr[2][0].should.within(0.2988, 0.2989)
    // })

    it('omega', ()=>{

        let om = df.omega()
        console.log(om)
        let om2 = df2.omega()
        console.log(om2)
    })


})