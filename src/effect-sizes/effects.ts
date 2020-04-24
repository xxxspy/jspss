import {Series} from '../data/series'
import {DataFrame} from '../data/dataframe'
import * as tf from '@tensorflow/tfjs'



export function cohens_d(data:DataFrame, varnames:Array<string>, groupvar: string, groupvalue: Array<number>){
    let index1 = data.select_col(groupvar).equal(groupvalue[0])
    let index2 = data.select_col(groupvar).equal(groupvalue[1])
    let df1 = data.mask(index1);
    let df2 = data.mask(index2);
    let ds = {};
    varnames.forEach((vn, idx)=>{
        let s1 = df1.select_col(vn)
        let s2 = df2.select_col(vn)
        let fenmu = tf.sqrt(tf.div(
            tf.sum(s1.std().mul(s1.shape[0]-1), s2.std().mul(s2.shape[0]-1)),
            tf.sum(),
        ))
        ds[vn] = tf.sub(s1.mean(), s2.mean())
    })
}