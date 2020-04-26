import * as tf from '@tensorflow/tfjs'
import * as jst from 'jstat'
// import {betainc} from 'tfjs-special'

// export function cdf(x: tf.Scalar, df: tf.Scalar, loc = tf.scalar(0), scale= tf.scalar(1)): tf.Scalar{
//     let y = tf.div(
//         x.sub(loc),
//         tf.abs(scale),
//     )
//     let beta1 = df.mul(0.5)
    
//     let x_t = df.div(y.square().add(df))
//     return betainc(beta1, 0.5, x_t).asScalar()

// }

// y = (x - loc) / tf.abs(scale)
// x_t = df / (y**2. + df)
// neg_cdf = 0.5 * tf.math.betainc(
//     0.5 * tf.broadcast_to(df, prefer_static.shape(x_t)), 0.5, x_t)
// return tf.where(y < 0., neg_cdf, 1. - neg_cdf)


export function pvalue(t:number, df:number, ntail=1):number{
    let p = jst.studentt.cdf(t, df)
    if(t>0){
        p = 1-p
    }
    return p*2
}