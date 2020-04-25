import {Series} from '../data/series'
import {DataFrame} from '../data/dataframe'
import * as tf from '@tensorflow/tfjs'



export async function cohens_d(data:DataFrame, varnames:Array<string>, groupvar: string, groupvalue: Array<number>):Promise<Array<tf.Scalar>>{
    let index1 = data.select_col(groupvar).equal(groupvalue[0])
    let index2 = data.select_col(groupvar).equal(groupvalue[1])
    let df1 = await data.mask(index1);
    let df2 = await data.mask(index2);
    df1.values.print()
    let ds: Array<tf.Scalar> = [];
    varnames.forEach((vn, idx)=>{
        let s1 = df1.select_col(vn)
        let s2 = df2.select_col(vn)
        let fenmu = tf.sqrt(tf.div(
            s1.std().mul(s1.shape[0]-1).add(s2.std().mul(s2.shape[0]-1)),
            s1.shape[0] + s2.shape[0],
        ))
        ds.push(tf.div(tf.sub(s1.mean(), s2.mean()), fenmu))
    })
    console.log(ds)
    return ds
}