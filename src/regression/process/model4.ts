import {ProcessConfig} from './interfaces'
import {RegResult, regressionRaw as regression} from '../regression'
import { DataFrame } from '../../data/dataframe'
import { input } from '@tensorflow/tfjs'
import {bootstrapSample} from './process'
import * as mutils from '../../utils/ml-matrix'
import {variance} from 'mathjs'
import * as jst from 'jstat'


export interface WeightsResult{
    c1: number, // model1 x的系数, 也是总效应
    a: number, // model2 m <-x 的系数, 
    c2: number, // model3 x的系数, 也是直接效应
    b: number, // model3 m 的系数
}

export interface WeightErrorResult extends WeightsResult{}

export interface TStats extends WeightsResult{}

export interface WeightSigs extends WeightsResult{}



export interface Model4Result{
    model1: RegResult,
    model2: RegResult,
    model3: RegResult,
    medEffect: number,
    mederr: number,
    weights: WeightsResult,
    errors: WeightErrorResult,
    tstats: TStats,
    sigs: WeightSigs,
}

export interface SplitedData{
    x: number[][],
    y: number[][],
}

export interface InputData{
    model1: SplitedData,
    model2: SplitedData,
    model3: SplitedData,
}


// 根据config生成变量名的数组
export function cols(config: ProcessConfig):string[]{
    if(config.ms == null){
        throw new Error('Model4Error:缺少中介变量')
    }else{
        if(config.ms.length>1){
            throw new Error('Model4Error:该模型仅支持1个中介变量')
        }
    }
    
    let cols = []
    cols.push(config.x)
    cols.push(config.ms[0])
    cols.push(config.y)
    return cols
}

// 将数据拆分为x和y的形式
export function splitData(data: number[][], model: number):SplitedData{
    let x = []
    let y = []
    let i = -1;
    if(model==1){
        while(x.length<data.length){
            i+=1;
            x.push([data[i][0]])
            y.push([data[i][2]])
        }
    }else if(model==2){
        while(x.length<data.length){
            i+=1;
            x.push([data[i][0]])
            y.push([data[i][1]])
        }
    }else if(model==3){
        while(x.length<data.length){
            i+=1;
            x.push(data[i].slice(0, 2))
            y.push([data[i][2]])
        }
    }
    return {
        x,y
    }
}

// 组装分析所用的数据
export function genData(data: number[][], config: ProcessConfig):InputData{
    return {
        model1: splitData(data, 1),
        model2: splitData(data, 2),
        model3: splitData(data, 3),
    }
}


export function _analysis(data: InputData):Model4Result{
    let result = {
        model1: regression(data.model1.x, data.model1.y),
        model2: regression(data.model2.x, data.model2.y),
        model3: regression(data.model3.x, data.model3.y),
        medEffect: null,
        mederr: null,
        weights: null,
        errors: null,
        tstats: null,
        sigs: null,
    }
    result.medEffect = result.model2.weights[0] * result.model3.weights[1]
    result.mederr = -1
    result.weights = {
        c1: result.model1.weights[0],
        a: result.model2.weights[0],
        c2: result.model3.weights[0],
        b: result.model3.weights[1],
    }
    result.errors = {
        c1: result.model1.stdErrors[0],
        a: result.model2.stdErrors[0],
        c2: result.model3.stdErrors[0],
        b: result.model3.stdErrors[1],
    }
    result.tstats = {
        c1: result.model1.tStats[0],
        a: result.model2.tStats[0],
        c2: result.model3.tStats[0],
        b: result.model3.tStats[1],
    }
    return result
}


export function analysis(data: DataFrame, config: ProcessConfig):Model4Result{
    let vnames = cols(config)
    let rows = data.select_cols(vnames).toArray()
    let inputs = genData(rows, config)
    let rtn = _analysis(inputs)
    let i=0;
    let effects = []
    while (i<config.bootN){
        let sample = bootstrapSample(rows)
        let ipt = genData(sample, config)
        let res = _analysis(ipt)
        effects.push(res.medEffect)
        i ++;
    }
    rtn.mederr = variance(effects) ** 0.5;
    rtn.sigs = {
        c1: jst.studentt.cdf(-rtn.tstats.c1, rtn.model1.dfs.dfe-1)*2,
        c2: jst.studentt.cdf(-rtn.tstats.c2, rtn.model3.dfs.dfe-1)*2,
        a: jst.studentt.cdf(-rtn.tstats.a, rtn.model2.dfs.dfe-1)*2,
        b: jst.studentt.cdf(-rtn.tstats.b, rtn.model3.dfs.dfe-1)*2,
    }
    return rtn
}