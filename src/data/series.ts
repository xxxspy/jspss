import * as tf from "@tensorflow/tfjs"
import {Index, RangeIndex} from './index'

export class Series{
    values:tf.Tensor1D;
    index:Index;
    name:string;
    shape:Array<number>;

    constructor(values:tf.Tensor1D, index?:Index, name:string='') {
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

    variance():tf.Scalar{
        let m = tf.sub(this.values, this.mean());
        let ss = tf.sum(tf.square(m))
        return tf.div(ss, this.shape[0]-1)
    };

    std():tf.Scalar{
        return tf.square(this.variance())
    };

    equal(val: string|number):Series{
        return new Series(this.values.equal(val), this.index)
    }
}