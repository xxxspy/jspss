import {eigs} from 'mathjs'
import {DataFrame} from '../data/dataframe'


export function efa(data: DataFrame){
    let ans = eigs(data.crr().arraySync())
    console.log(ans.values)
    console.log(ans.vectors)
}