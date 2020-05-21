import {RegResult} from '../regression'

export interface ProcessConfig{
    model: number,
    y: string,
    x: string,
    m?: Array<string>,
    covs?: Array<string>,
    moderW?: string,
    moderZ?: string,
    cofidence: 95,
    bootN: 5000,
}

export interface ProcessResult{
    config: ProcessConfig,
    modelResult: Model4,
}



