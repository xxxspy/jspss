import * as tf from '@tensorflow/tfjs'

export function mean_std(data){
    let m = data.mean()
    let variance = tf.sum(tf.square(data.sub(m)))
    variance = variance.div(tf.scalar(data.shape[0]-1, 'float32'))
    return {
        'mean': m,
        'variance': variance,
        'std': tf.sqrt(variance),
    }
}

