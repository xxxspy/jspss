import * as MLR from "ml-regression-multivariate-linear";
import {DataFrame} from '../data/dataframe'
import { Matrix } from 'ml-matrix';

interface RegConfig{
    depvar: string,
    indvars: Array<string>,
}

interface RegResult{
    weights: Array<number>,
    stdErrors: Array<number>,
    tStats: Array<number>,
    r2: number,
    ssr: number,
    sst: number,
    stdError: number,
}

export function regression(data: DataFrame, config: RegConfig):RegResult{
    const x = data.select_cols(config.indvars).toArray();
    const y = data.select_cols([config.depvar]).toArray();
    const mlr = new MLR(x, y)
    let weights = []
    mlr.weights.forEach(w=>{
        weights.push(w[0])
    })
    // console.log(mlr)
    // console.log(mlr.toJSON().summary)
    // console.log(mlr.summary )

    let yhat = mlr.predict(x)
    const es = Matrix.sub(y, yhat)
    const ssr = es.transpose().mmul(es).get(0, 0)
    const ones = Matrix.ones(y.length, 1)
    const meany = ones.transpose().mmul(y).div(y.length).get(0, 0)
    const disy = Matrix.sub(y, meany)
    const sst = disy.transpose().mmul(disy).get(0, 0)
    const r2 = 1 - ssr / sst
    console.log('ssr:sst:r2::::::::::::')
    console.log(ssr)
    console.log(sst)
    console.log(r2)
    console.log(yhat)

    return {
        weights,
        stdErrors: mlr.stdErrors,
        tStats: mlr.tStats,
        stdError: mlr.stdError,
        r2,
        ssr,
        sst
    }
}