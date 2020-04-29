import * as tf from "@tensorflow/tfjs"
import {Index, RangeIndex} from './index'

export class Series{
    values:tf.Tensor|tf.Tensor<tf.Rank>;
    index:Index;
    name:string;
    shape:Array<number>;

    constructor(values:tf.Tensor1D|Array<number>|tf.Tensor<tf.Rank>, index?:Index, name:string='') {
        if(Array.isArray(values)){
            values = tf.tensor(values)
        }
        this.values = values
        if(index){
            if(index.length()==values.shape[0]){
                this.index=index;
            }else{
                throw new Error('index.length!=values.shape[0]')
            }
        }else{
            this.index = new RangeIndex(0, values.shape[0])
        }
        this.name = name;
        this.shape = [this.values.shape[0], ];
    };


    select(begin: number, size?:number): Series{
        return new Series(this.values.slice(begin, size))
    }

    print(detail=false){
        this.values.print(detail)
    }

    mean():tf.Scalar{
        return tf.mean(this.values)
    };

    sum():tf.Scalar{
        return tf.sum(this.values)
    };

    var():tf.Scalar{
        let m = tf.sub(this.values, this.mean());
        let ss = tf.sum(tf.square(m))
        return tf.div(ss, this.shape[0]-1)
    };

    std():tf.Scalar{
        return tf.sqrt(this.var())
    };

    equal(val: number):Series{
        let vals = tf.tensor1d([val, ])
        console.log('==========')
        tf.equal(this.values, vals).as1D().print()
        return new Series(tf.equal(this.values, vals).as1D(), this.index)
    }

    square():Series{
        let vals = tf.square(this.values)
        return new Series(vals, this.index)
    }

    sub(val:Series|number|tf.Tensor1D):Series{
        let new_val;
        if(val instanceof tf.Tensor){
            new_val = this.values.sub(val)    
        }else if(val instanceof Series){
            new_val = this.values.sub(val.values)
        }else{
            new_val = this.values.sub(val)
        }
        return new Series(new_val, this.index)
    }
}