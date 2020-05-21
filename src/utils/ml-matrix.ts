// utils based on ml-matrix
import { Matrix } from 'ml-matrix';


type MaybeMatrix = Matrix | number[][];

export function vecSum(data: MaybeMatrix){
    // 向量求和
    const n = data instanceof Matrix ? data.size[0]:data.length
    return Matrix.ones(1, n).mmul(data)
}

export function vecMean(data: MaybeMatrix){
    const n = data instanceof Matrix ? data.size[0]:data.length
    return vecSum(data).div(n).get(0, 0)
}

export function vecVariance(data: MaybeMatrix){
    if(data instanceof Array){
        data = new Matrix(data)
    }
    let dist = data.sub(vecMean(data))
    return dist.transpose().mmul(dist).get(0, 0)
}