import {DataFrame} from '../../src/data/dataframe'
import {process, } from '../../src/regression/process/process'
import {ProcessResult, ProcessConfig} from '../../src/regression/process/interfaces'
import {should} from 'chai'
import * as MLR from "ml-regression-multivariate-linear";
import {regression} from '../../src/regression/regression'
import * as tf from '@tensorflow/tfjs'
tf.setBackend("cpu");

should()
let _data = [
    [3.50,4.36,5.47,],
    [3.13,3.79,4.40,],
    [1.67,1.86,1.33,],
    [2.46,3.57,4.93,],
    [3.67,4.57,6.47,],
    [3.17,4.07,5.73,],
    [3.46,3.00,6.07,],
    [3.08,4.07,5.20,],
    [2.75,2.29,3.67,],
    [3.79,4.64,6.93,],
    [2.42,2.71,3.87,],
    [2.21,3.14,6.53,],
    [2.54,2.43,3.07,],
    [3.88,4.36,6.33,],
    [2.92,3.79,4.27,],
    [2.08,3.64,2.80,],
    [2.96,3.43,3.60,],
    [2.42,3.14,4.07,],
    [2.21,2.86,3.40,],
    [3.04,2.36,4.00,],
    [2.58,3.07,3.73,],
    [2.75,3.07,4.40,],
    [2.38,2.50,2.87,],
    [2.75,3.79,3.20,],
    [3.42,3.71,5.00,],
    [3.00,3.79,4.27,],
    [3.96,4.21,6.13,],
    [3.25,2.79,5.07,],
    [2.92,3.36,3.80,],
    [2.71,3.36,3.40,],
    [2.79,4.21,4.67,],
    [3.08,3.21,3.20,],
    [3.54,3.36,5.00,],
    [2.58,4.14,4.13,],
    [2.83,3.71,4.47,],
    [2.00,1.79,1.60,],
    [3.13,3.07,5.33,],
    [3.42,3.79,4.80,],
    [2.63,3.14,4.80,],
    [2.21,2.29,3.47,],
    [3.21,3.64,6.00,],
    [3.00,3.50,5.13,],
    [2.92,3.57,4.60,],
    [2.67,2.79,2.53,],
    [3.25,3.71,5.53,],
    [3.83,3.64,4.73,],
    [2.88,3.43,4.60,],
    [2.08,1.57,5.73,],
    [3.38,3.43,3.40,],
    [3.50,4.43,5.93,],
    [2.33,3.79,2.93,],
    [3.50,3.79,3.47,],
    [3.58,3.79,6.13,],
    [2.79,2.29,2.13,],
    [2.58,3.00,4.27,],
    [3.50,3.79,4.47,],
    [2.79,3.79,4.80,],
    [2.71,3.29,4.13,],
    [2.25,2.50,3.67,],
    [2.13,3.00,2.60,],
    [2.75,3.07,3.40,],
    [2.63,3.93,3.20,],
    [3.00,3.64,3.93,],
    [2.96,3.14,4.47,],
    [3.21,3.71,4.00,],
    [2.58,4.21,3.27,],
    [2.96,3.50,2.93,],
    [3.08,3.07,4.60,],
    [2.13,1.64,1.40,],
    [3.29,4.14,5.13,],
    [2.83,3.57,4.27,],
    [2.75,4.00,4.07,],
    [3.58,4.14,5.53,],
    [3.42,3.21,5.13,],
    [2.54,2.36,3.67,],
    [3.00,4.00,3.60,],
    [4.13,4.00,6.60,],
    [2.54,2.36,2.27,],
    [3.38,3.50,5.27,],
    [3.13,3.79,3.67,],
    [2.96,3.07,2.93,],
    [1.96,2.43,2.53,],
    [3.21,4.00,6.00,],
    [2.29,3.21,3.40,],
    [3.42,3.64,5.67,],
    [2.46,3.57,3.87,],
    [2.42,4.57,6.27,],
    [3.71,3.64,5.07,],
    [3.25,3.57,4.53,],
    [2.50,2.86,1.67,],
    [2.83,3.14,3.80,],
    [3.58,4.36,5.60,],
    [3.42,3.64,4.73,],
    [3.42,2.93,5.20,],
    [2.96,3.29,5.27,],
    [2.96,3.71,4.80,],
    [3.83,3.86,6.07,],
    [1.96,2.79,1.67,],
    [2.92,2.93,3.27,],
    [2.21,3.79,4.27,],
    [2.92,3.07,3.07,],
    [2.54,2.57,4.73,],
    [3.46,2.86,3.33,],
    [2.29,3.14,4.07,],
    [2.75,4.21,6.07,],
    [3.33,3.43,3.80,],
    [2.75,4.07,4.33,],
    [3.00,1.43,3.47,],
    [2.79,3.14,6.60,],
    [3.50,4.43,6.00,],
    [3.17,3.14,4.07,],
    [2.63,3.00,3.80,],
    [3.75,3.43,6.07,],
    [2.88,4.43,3.80,],
    [2.75,2.71,3.13,],
    [3.63,4.07,6.13,],
    [3.38,4.36,6.07,],
    [3.71,4.71,7.00,],
    [3.83,4.43,6.07,],
    [1.96,3.14,2.47,],
    [2.83,2.79,4.80,],
    [3.38,4.14,5.80,],
    [2.38,3.50,4.47,],
    [3.63,4.43,5.60,],
    [3.42,4.21,6.40,],
    [3.33,3.50,5.73,],
    [3.58,3.79,5.87,],
    [2.50,2.29,3.87,],
    [2.33,2.86,4.07,],
    [2.63,3.50,3.47,],
    [3.17,3.79,5.27,],
    [3.21,3.29,5.33,],
    [3.50,3.50,4.47,],
    [2.54,2.86,4.67,],
    [3.08,4.36,5.53,],
    [2.88,3.71,4.13,],
    [3.63,3.93,4.53,],
    [3.00,4.21,4.67,],
    [2.79,3.43,3.73,],
    [3.13,3.64,3.87,],
    [3.58,3.86,5.00,],
    [2.88,3.64,2.67,],
    [2.96,4.07,5.07,],
    [2.54,3.86,4.67,],
    [2.00,2.50,3.80,],
    [2.50,2.64,4.80,],
    [1.67,2.50,5.07,],
    [3.13,3.43,3.73,],
    [2.67,2.21,2.53,],
    [2.46,3.93,2.93,],
    [3.25,2.86,4.33,],
    [2.33,3.71,2.20,],
    [2.17,3.07,4.40,],
    [3.38,3.86,5.93,],
    [2.79,2.79,4.53,],
    [2.67,2.36,2.13,],
    [2.63,2.50,4.80,],
    [2.00,3.79,2.80,],
    [3.13,3.79,3.27,],
    [2.92,3.36,3.07,],
    [3.04,4.57,1.73,],
    [3.58,3.64,5.60,],
    [2.88,4.29,4.07,],
    [2.92,3.07,4.53,],
    [2.38,4.00,4.20,],
    [3.38,4.43,6.40,],
    [3.17,2.93,2.00,],
]

const data = new DataFrame(_data, ['努力', '要求', '投入'])

let s = process(data, {
    model: 4,
    x: '努力',
    y: '投入', 
    m: ['要求'],
    bootN: 100,
})

describe('process:model4', ()=>{
    it('mederr:', ()=>{
        s.modelResult.mederr.should.within(0.09, 0.2)
    })
})



