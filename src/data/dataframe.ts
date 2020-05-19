import * as tf from "@tensorflow/tfjs"
import {Index, RangeIndex} from './index'
import {Series} from './series'
import { tensor, mean } from "@tensorflow/tfjs";
import {omega} from '../factor/reliability'
import {efa} from '../factor/api'


export class DataFrame{
    values: tf.Tensor2D;
    columns: Index;
    index: Index;
    shape: Array<number>;

    constructor(values: tf.Tensor2D|Array<Array<number>>, columns?: Index|Array<number|string>, index?: Index){
        if(values instanceof Array){
            this.values = tf.tensor2d(values)
        }else{
            this.values = values
        }
        if(Array.isArray(columns)){
            columns = new Index(columns)
        }
        if(columns){
            if(columns.length()==this.values.shape[1]){
                this.columns=columns;
            }else{
                throw new Error('Columns.lengt != values.shape[1]')
            }
        }else{
            this.columns = new RangeIndex(0, this.values.shape[1])
        }

        if(index){
            if(index.length()==this.values.shape[0]){
                this.index=index;
            }else{
                throw new Error('index.lengt != values.shape[0]')
            }
        }else{
            this.index = new RangeIndex(0, this.values.shape[0])
        }
        this.shape = this.values.shape;
    };

    select_col(name: string|number, asDatraFrame=false):Series|DataFrame{
        let i = this.columns.get_loc(name);
        let values = this.values.slice([0, i], [this.shape[0], 1]);
        if(asDatraFrame){
            return new DataFrame(values, [name,])
        }
        else{
            let s = new Series(values.as1D())
            s.name = name.toString();
            return s
        }
        
    };

    async mask(mask: Series):Promise<DataFrame>{
        console.log(mask.shape)
        console.log(this.shape)
        if(mask.shape[0]!=this.shape[0]){
            throw new Error('mask.shape[0]==this.shape[0]')
        }
        let values = await tf.booleanMaskAsync(this.values, mask.values)
        // let values = this.values.gather(mask.values)
        return new DataFrame(values as tf.Tensor2D, this.columns)
    }

    crr():tf.Tensor{
        let df = this.values;
        let means = df.mean(0)
        let std = df.sub(means).square().sum(0).div(df.shape[0]).sqrt()
        let df2 = new DataFrame(df.div(std) as tf.Tensor2D)
        return df2.var()
    }

    var():tf.Tensor{
        let df = this.values;
        let ones = tf.ones([df.shape[0], df.shape[0]])
        let df_dev = df.sub(ones.matMul(df).div(df.shape[0]))
        return df_dev.transpose().matMul(df_dev).div(df.shape[0])
    }

    gather(indices: Array<number>|tf.Tensor): DataFrame{
        return new DataFrame(this.values.gather(indices, 1), this.columns.gather(indices))
        
    }

    efa(nfacotr: number){
        return efa(this, nfacotr)
    }

    omega(){
        let res = this.efa(1)
        return omega(res.loads2.reshape([res.loads2.shape[0]]))
    }

    toArray():number[][]{
        return this.values.arraySync()
    }

    select_cols(cols: string[]):DataFrame{
        let t = this.values.transpose().arraySync()
        // let idxs = this.columns.indexOf(cols)
        if(cols.length==1){
            return this.select_col(cols[0], true) as DataFrame
        }
        let cols_data = []
        cols.forEach(col=>{
            cols_data.push(this.select_col(col, true).values)
        })
        return new DataFrame(
            tf.concat(cols_data, 1),
            cols,
        )
    }
}