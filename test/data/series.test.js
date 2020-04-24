import chai from "chai"
import * as tf from "@tensorflow/tfjs"
tf.setBackend("cpu")

// import * as bs from '../src/data/basic-stats.ts'
import Series from '../../src/data/series.ts'

describe('data-series', ()=>{
    let ser = new Series([0, 1, 1, 1, 1, 0, 1, 2, 1, 2])
    ser.print()
})