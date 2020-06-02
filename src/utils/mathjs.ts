import * as mathjs from 'mathjs'

export function slice(m:mathjs.Matrix, starter: number[], lengther:number[]): mathjs.Matrix{
    let rngs=[]
    for(let i=0;i<starter.length;i++){
        let rng = []
        let start = starter[i]
        let length = lengther[i]
        for(let j=start;j<start+length;j++){
            rng.push(j)
        }
        rngs.push(rng)
    }
    return mathjs.subset(m, mathjs.index(...rngs))
}

// export class Matrix extends mathjs.Matrix{
//     get shape(){
//         return this.size()
//     }
// }