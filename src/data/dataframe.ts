import {Index, RangeIndex} from './index'
import {Series} from './series'
import {omega} from '../factor/reliability'
import {efa} from '../factor/api'

import * as mathjs from 'mathjs'
import {Matrix} from 'mathjs'
import * as mutils from '../utils/mathjs'

export class DataFrame{
    values: Matrix;
    columns: Index;
    index: Index;
    shape: Array<number>;

    constructor(values: Matrix|Array<Array<number>>, columns?: Index|Array<number|string>, index?: Index){
        if(values instanceof Array){
            this.values = mathjs.matrix(values)
        }else{
            this.values = values
        }
        this.shape = this.values.size();
        if(Array.isArray(columns)){
            columns = new Index(columns)
        }
        if(columns){
            if(columns.length()==this.shape[1]){
                this.columns=columns;
            }else{
                throw new Error('Columns.lengt != values.shape[1]')
            }
        }else{
            this.columns = new RangeIndex(0, this.shape[1])
        }

        if(index){
            if(index.length()==this.shape[0]){
                this.index=index;
            }else{
                throw new Error('index.lengt != values.shape[0]')
            }
        }else{
            this.index = new RangeIndex(0, this.shape[0])
        }
    };

    select_col(name: string|number, asDatraFrame=false):Series|DataFrame{
        let i = this.columns.get_loc(name);
        let values = mutils.slice(this.values, [0, i], [this.shape[0], 1]);
        if(asDatraFrame){
            return new DataFrame(values, [name,])
        }
        else{
            let s = new Series(values.as1D())
            s.name = name.toString();
            return s
        }
        
    };

    mask(mask: Series):DataFrame{
        if(mask.shape[0]!=this.shape[0]){
            throw new Error('mask.shape[0]==this.shape[0]')
        }
        let rows = []
        for(let i=0;i<this.shape[0];i++){
            if(mask.iloc(0)){
                rows.push(i)
            }
        }
        let cols = []
        for(let c=0;c<this.shape[1];c++){
            cols.push(c)
        }
        let values = mathjs.subset(this.values, mathjs.index(rows, cols))
        return new DataFrame(values as Matrix, this.columns)
    }

    crr():Matrix{
        let df = this.values;
        let n = this.shape[0]
        let means = mathjs.reshape(mathjs.mean(df, 0), [1, this.shape[1]])
        means = mathjs.multiply(mathjs.ones(n, 1), means)
        let std = mathjs.sqrt(
            mathjs.divide(
                mathjs.sum(
                    mathjs.square(
                        mathjs.subtract(df, means)
                    ), 0), n)
        )
        std = mathjs.reshape(std, [1, this.shape[1]])
        std = mathjs.multiply(mathjs.ones(n, 1), std)
        let df2 = new DataFrame(mathjs.dotDivide(df, std))
        return df2.var()
    }

    var():Matrix{
        let df = this.values;
        let n = this.shape[0]
        let ones = mathjs.ones(n, n)
        let df_dev = mathjs.subtract(df, mathjs.divide(
            mathjs.multiply(ones, df), n
        ))
        return mathjs.divide(
            mathjs.multiply(
                mathjs.transpose(
                    df_dev), df_dev), n)
    }

    gather(indices: Array<number>|Matrix): DataFrame{
        return new DataFrame(this.values.gather(indices, 1), this.columns.gather(indices))
        
    }

    efa(nfacotr: number){
        return efa(this, nfacotr)
    }

    omega(){
        let res = this.efa(1)
        return omega(res.loads2.reshape([res.loads2.size()[0]]))
    }

    toArray():number[][]{
        return this.values._data
    }

    select_cols(cols: string[]):DataFrame{
        let t = mathjs.transpose(this.values)
        if(cols.length==1){
            return this.select_col(cols[0], true) as DataFrame
        }
        let cols_data = []
        cols.forEach(col=>{
            cols_data.push(this.select_col(col, true).values)
        })
        return new DataFrame(
            mathjs.concat(...cols_data, 1),
            cols,
        )
    }
}