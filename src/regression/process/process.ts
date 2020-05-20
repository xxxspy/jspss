import { DataFrame } from '../../data/dataframe'
import {regression} from '../regression'

interface ProcessConfig{
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

interface ProcessResult{
    config: ProcessConfig,

}

export function process(data: DataFrame, config: ProcessConfig):ProcessConfig{

}