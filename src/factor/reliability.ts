import {Series} from '../data/series'


export function omega(data: Series|Array<number>){
    if(Array.isArray(data)){
        data = new Series(data)
    }
    let squ = data.square()
    let sm = data.sum().square()
    let err = squ.values.mul(-1).add(1).sum()
    return sm.div(sm.add(err))
}