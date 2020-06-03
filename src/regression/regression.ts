import * as MLR from "ml-regression-multivariate-linear";
import {DataFrame} from '../data/dataframe'
import { Matrix } from 'ml-matrix';
import * as jst from 'jstat'

export interface RegConfig{
    depvar: string,
    indvars: Array<string>,
}

export interface DegreeOfFreedoms{
    dfm: number,
    dfe: number,
    dft: number,
}

export interface RegResult{
    weights: Array<number>, // 系数: x1,x2...intercept
    stdErrors: Array<number>,
    tStats: Array<number>,
    r2: number,
    sse: number,
    sst: number,
    stdError: number,
    f: number,
    sig: number,
    dfs: DegreeOfFreedoms,
}

export function regressionRaw(x: number[][], y: number[][]):RegResult{
    const n = y.length;
    const mlr = new MLR(x, y)
    const p = x[0].length + 1
    let weights = []
    mlr.weights.forEach(w=>{
        weights.push(w[0])
    })
    let yhat = mlr.predict(x)
    const es = Matrix.sub(y, yhat)
    const sse = es.transpose().mmul(es).get(0, 0)
    const ones = Matrix.ones(y.length, 1)
    const meany = ones.transpose().mmul(y).div(y.length).get(0, 0)
    const disy = Matrix.sub(y, meany)
    const sst = disy.transpose().mmul(disy).get(0, 0)
    const r2 = 1 - sse / sst
    const dfm = p - 1
    const dfe = n - p
    const dft = n - 1
    const msm = (sst-sse)/dfm
    const mse = sse / dfe
    const f = msm/mse;
    let sig = 1 - jst.centralF.cdf(f, dfm, dfe)
    return {
        weights,
        stdErrors: mlr.stdErrors,
        tStats: mlr.tStats,
        stdError: mlr.stdError,
        r2,
        sse,
        sst,
        f,
        sig,
        dfs: {dfm, dfe, dft},
    }
}


// F test reference: http://facweb.cs.depaul.edu/sjost/csc423/documents/f-test-reg.htm
export function regression(data: DataFrame, config: RegConfig):RegResult{
    const x = data.select_cols(config.indvars).toArray();
    const y = data.select_cols([config.depvar]).toArray();
    return regressionRaw(x, y)
}