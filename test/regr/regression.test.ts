

import {should} from 'chai'
import * as MLR from "ml-regression-multivariate-linear";
import {regression} from '../../src/regression/regression'
import {DataFrame} from '../../src/data/dataframe'
import * as tf from '@tensorflow/tfjs'
tf.setBackend("cpu");

should()



describe('regression', ()=>{
    it('use-test-data', ()=>{

        const x = [
            [0, 0],
            [1, 2],
            [2, 3],
            [3, 4]
          ];
          // Y0 = X0 * 2, Y1 = X1 * 2, Y2 = X0 + X1
          const y = [
            [0, 0, 0],
            [2, 4, 3],
            [4, 6, 5],
            [6, 8, 7]
          ];
          const mlr = new MLR(x, y);
        //   console.log(mlr.predict([3, 3]));
        //   console.log(mlr.toJSON())
        //   const res = mlr.toJSON()
        //   res.weights.should.equal('sdfs')
        mlr.weights[0].should.deep.equal([ 2.0000000000000515, 3.552713678800501e-14, 1.0000000000000426 ])
          
    })

    it('real-data', ()=>{
        let data = new DataFrame(
            [[15.31,57.3,74.8],
            [15.20,63.8,74.0],
            [16.25,65.4,72.9],
            [14.33,57.0,70.0],
            [14.57,63.8,74.9],
            [17.33,63.2,76.0],
            [14.48,60.2,72.0],
            [14.91,57.7,73.5],
            [15.25,56.4,74.5],
            [13.89,55.6,73.5],
            [15.18,62.6,71.5],
            [14.44,63.4,71.0],
            [14.87,60.2,78.9],
            [18.63,67.2,86.5],
            [15.20,57.1,68.0],
            [25.76,89.6,102.0],
            [19.05,68.6,84.0],
            [15.37,60.1,69.0],
            [18.06,66.3,88.0],
            [16.35,65.8,76.0],],
            ['z1', 'z2', 'y']
        )

        let res = regression(data, {depvar: 'y', indvars: ['z1', 'z2']})
        console.log(res)
        res.weights[0].should.within(2.63, 2.64)
        res.weights[1].should.within(0.0451, 0.0452)
        res.weights[2].should.within(30.966, 30.967)
    })

})


