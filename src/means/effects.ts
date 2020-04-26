import {Series} from '../data/series'
import {DataFrame} from '../data/dataframe'
import * as tf from '@tensorflow/tfjs'
import {psd} from './ttests/ind-samples'


export function _cohens_d(m1:tf.Scalar, m2:tf.Scalar, std1:tf.Scalar, std2:tf.Scalar, n1:tf.Scalar, n2:tf.Scalar):tf.Scalar{
    let var1 = tf.square(std1)
    let var2 = tf.square(std2)
    let _fenzi = var1.mul(n1.sub(1)).add(var2.mul(n2.sub(1)));
    let fenmu = tf.sqrt(tf.div(
        _fenzi,
        n1.add(n2).sub(2),
    ))
    return tf.div(tf.sub(m1, m2), fenmu)
}

export async function cohens_d(data:DataFrame, varnames:Array<string>, groupvar: string, groupvalue: Array<number>):Promise<Array<tf.Scalar>>{
    let index1 = data.select_col(groupvar).equal(groupvalue[0])
    let index2 = data.select_col(groupvar).equal(groupvalue[1])
    let df1 = await data.mask(index1);
    let df2 = await data.mask(index2);
    let ds: Array<tf.Scalar> = [];
    varnames.forEach((vn, idx)=>{
        let s1 = df1.select_col(vn)
        let s2 = df2.select_col(vn)
        let m1 = s1.mean()
        let m2 = s2.mean()
        let n1 = tf.scalar(s1.shape[0])
        let n2 = tf.scalar(s2.shape[0])
        ds.push(_cohens_d(m1, m2, s1.std(), s2.std(), n1, n2))
    })
    return ds
}