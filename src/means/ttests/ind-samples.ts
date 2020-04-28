import * as tf from "@tensorflow/tfjs"
// import {cdf as tcdf} from '../../distributions/student_t'

// export function t(data: tf.Tensor2D)

export function psd(var1: tf.Scalar, var2: tf.Scalar, n1: tf.Scalar, n2: tf.Scalar): tf.Scalar{
    // Pooled standard deviation
    // s_{p} = \sqrt{\frac{(n_{1} - 1)s_{1}^{2} + (n_{2} - 1)s_{2}^{2}}{n_{1} + n_{2} - 2}}
    // ref: https://libguides.library.kent.edu/SPSS/IndependentTTest
    let denominator = n1.add(n2).sub(2)
    let numerator = var1.mul(n1.sub(1)).add(var2.mul(n2.sub(1)))
    return tf.sqrt(numerator.div(denominator)).asScalar()
}

export function t(m1: tf.Scalar, m2: tf.Scalar, var1: tf.Scalar, var2: tf.Scalar, n1: tf.Scalar, n2: tf.Scalar):tf.Scalar{
    // T value (EQUAL VARIANCES ASSUMED)
    let numer = m1.sub(m2)
    let denom = psd(var1, var2, n1, n2).mul(tf.sqrt(
        n1.reciprocal().add(n2.reciprocal())
    ))
    return numer.div(denom)
}

export function df(n1: tf.Scalar, n2: tf.Scalar):tf.Scalar{
    // degrees of freedom(EQUAL VARIANCES ASSUMED)
    return n1.add(n2).sub(2)
}

export function t_ne(m1: tf.Scalar, m2: tf.Scalar, var1: tf.Scalar, var2: tf.Scalar, n1: tf.Scalar, n2: tf.Scalar):tf.Scalar{
    // T value (EQUAL VARIANCES NOT ASSUMED)
    // t = \frac{\overline{x}_{1} - \overline{x}_{2}}{\sqrt{\frac{s_{1}^{2}}{n_{1}} + \frac{s_{2}^{2}}{n_{2}}}}
    // ref: https://libguides.library.kent.edu/SPSS/IndependentTTest
    let numer = m1.sub(m2)
    let denom = tf.sqrt(tf.add(
        var1.div(n1), var2.div(n2)
    ))
    return numer.div(denom)
}


export function df_ne(var1: tf.Scalar, var2: tf.Scalar, n1: tf.Scalar, n2: tf.Scalar):tf.Scalar{
    // degrees of freedom(EQUAL VARIANCES NOT ASSUMED)
    // df = \frac{ \left ( \frac{s_{1}^2}{n_{1}} + \frac{s_{2}^2}{n_{2}} \right ) ^{2} }{ \frac{1}{n_{1}-1} \left ( \frac{s_{1}^2}{n_{1}} \right ) ^{2} + \frac{1}{n_{2}-1} \left ( \frac{s_{2}^2}{n_{2}} \right ) ^{2}}
    // ref: https://libguides.library.kent.edu/SPSS/IndependentTTest
    let ms1 = var1.div(n1)
    let ms2 = var2.div(n2)
    let numer = tf.square(ms1.add(ms2))
    let denom = tf.add(
        ms1.square().div(n1.sub(1)),
        ms2.square().div(n2.sub(1)),
    )
    return numer.div(denom)
}

// export function p(t: tf.Scalar, df: tf.Scalar, loc: tf.Scalar, scale: tf.Scalar):tf.Scalar{
//     return tcdf(t, df, loc, scale)
// }