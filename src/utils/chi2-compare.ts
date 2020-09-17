import * as jst from 'jstat'

export interface ChiDiffResult{
    chidelta: number,
    dfdelta: number,
    p: number,
    chis1: number,
    df1: number,
    chis2: number,
    df2: number,
    describe: string,
}

/**
 * calculate chi squared difference significance
 *
 * @export
 * @param {number} chis1
 * @param {number} df1
 * @param {number} chis2
 * @param {number} df2
 * @returns {ChiDiffResult}
 */
export function chidelta(chis1: number, df1: number, chis2: number, df2: number):ChiDiffResult{
    let res = {
        chis1: chis1,
        df1: df1,
        chis2: chis2,
        df2: df2,
        chidelta: Math.abs(chis1-chis2),
        dfdelta: Math.abs(df1-df2),
        p: 0,
        describe: '',
    }
    res.p = 1 - jst.chisquare.cdf(res.chidelta, res.dfdelta)
    res.describe = describe(res)
    return res
}

export function describe(res: ChiDiffResult): string{
    return `卡方${res.chis1.toFixed(3)}(df=${res.df1.toFixed(0)})
    与卡方${res.chis2.toFixed(3)}(df=${res.df2.toFixed(0)})的差值为
    ${res.chidelta.toFixed(3)}(df=${res.dfdelta.toFixed(0)}), 
    ${res.p>0.05 ? '没': ''}达到显著水平(p${res.p>0.05? '>':'<'} 0.05)。`.replace(/ /g, '').replace(/\n/g, '')
}