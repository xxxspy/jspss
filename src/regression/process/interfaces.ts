import {RegResult} from '../regression'
import {Model4Result} from './model4'

export interface ProcessConfig{
    model: number,
    y: string,
    x: string,
    m?: Array<string>,
    covs?: Array<string>,
    moderW?: string,
    moderZ?: string,
    cofidence?: number,
    bootN?: number,
    defaultBootN?: 1000,
    defaultConfidence?: 95,
}

export interface ProcessResult{
    config: ProcessConfig,
    modelResult: Model4Result,
}



