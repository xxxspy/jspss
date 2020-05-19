import * as MLR from "ml-regression-multivariate-linear";
import {DataFrame} from '../data/dataframe'

interface RegConfig{
    depvar: string,
    indvars: Array<string>,
}

interface RegResult{
    weights: Array<number>,
    stdErrors: Array<number>,
    tStats: Array<number>,
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
    console.log(mlr.toJSON().summary)
    // console.log(mlr.summary )

    return {
        weights,
        stdErrors: mlr.stdErrors,
        tStats: mlr.tStats,
    }
}