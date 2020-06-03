import {Series} from '../data/series'
import {DataFrame} from '../data/dataframe'
import {psd} from './ttests/ind-samples'
import * as mathjs from 'mathjs'


export function _cohens_d(m1:number, m2:number, std1:number, std2:number, n1:number, n2:number):number{
    let var1 = mathjs.square(std1)
    let var2 = mathjs.square(std2)
    let _fenzi = var1 * (n1-1) + var2*(n2-1)
    let fenmu = (_fenzi / (n1+n2-2))**0.5
    return (m1-m2)/fenmu
}

export function cohens_d(data:DataFrame, varnames:Array<string>, groupvar: string, groupvalue:number[]):number[]{
    let index1 = data.select_col(groupvar) as Series
    index1 = index1.equal(groupvalue[0])
    let index2 = data.select_col(groupvar) as Series
    index2 = index2.equal(groupvalue[1])
    let df1 = data.mask(index1);
    let df2 = data.mask(index2);
    let ds = [];
    varnames.forEach((vn, idx)=>{
        let s1 = df1.select_col(vn) as Series
        let s2 = df2.select_col(vn) as Series
        let m1 = s1.mean()
        let m2 = s2.mean()
        let n1 = s1.shape[0]
        let n2 = s2.shape[0]
        ds.push(_cohens_d(m1, m2, s1.std(), s2.std(), n1, n2))
    })
    return ds
}