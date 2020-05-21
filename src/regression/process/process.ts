import { DataFrame } from '../../data/dataframe'
import {regressionRaw} from '../regression'
import {ProcessResult, ProcessConfig} from './interfaces'
import * as model4 from './model4'



function getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

function bootstrapSample(data: number[][]):number[][]{
    let samples = []
    while(samples.length<data.length){
        samples.push(data[getRndInteger(0, data.length-1)])
    }
    return samples
}


export function genCols(config: ProcessConfig):string[]{
    let cols=[];
    if(config.model==4){
        cols = model4.cols(config)
    }else{
        throw new Error('Not support model: ' + config.model)
    }
    return cols
}

export function genData(data: number[][], config: ProcessConfig):number[][][]{
    let rdata = []
    if(config.model==4){
        rdata.push(model4.splitData(data, 1))
        rdata.push(model4.splitData(data, 2))
        rdata.push(model4.splitData(data, 3))
    }else{
        throw new Error('Not support model: ' + config.model)
    }
    return rdata
}


export function process(data: DataFrame, config: ProcessConfig):ProcessResult{
    let cols = genCols(config)
    let rows = data.select_cols(cols).toArray()
    let result = {}
    let modelData = genData(rows, config)
    return {}
}