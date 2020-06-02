import {Index, RangeIndex} from './index'
import {Matrix} from 'mathjs'
import * as mathjs from 'mathjs'

export class Series{
    values: Matrix;
    index:Index;
    name:string;
    shape:Array<number>;

    constructor(values:Array<number>|Matrix, index?:Index, name:string='') {
        if(Array.isArray(values)){
            values = mathjs.matrix(values)
        }
        this.values = values
        this.shape = [this.values.size()[0], ];
        if(index){
            if(index.length()==this.shape[0]){
                this.index=index;
            }else{
                throw new Error('index.length!=shape[0]')
            }
        }else{
            this.index = new RangeIndex(0, values.size()[0])
        }
        this.name = name;
    };

    iloc(i: number):number|boolean|string{
        return this.values.get([i])
    };


    select(begin: number, size?:number): Series{
        return new Series(this.values.slice(begin, size))
    }

    print(detail=false){
        this.values.print(detail)
    }

    mean(): number{
        return mathjs.mean(this.values)
    };

    sum():number{
        return mathjs.sum(this.values)
    };

    var():number{
        let m = mathjs.subtract(this.values, this.mean());
        console.log('m'+ m)
        let ss = mathjs.sum(mathjs.square(m))
        console.log('ss:'+ss)
        console.log(this.shape)
        return mathjs.divide(ss, this.shape[0]-1)
    };

    std():number{
        console.log('var:' + this.var())
        return mathjs.sqrt(this.var())
    };

    equal(val: number):Series{
        return new Series(mathjs.equal(this.values, val), this.index)
    }

    square():Series{
        return new Series(mathjs.square(this.values), this.index)
    }

    sub(val: number|Array<number>|Matrix|Series):Series{
        let new_val;
        if(val instanceof Series){
            new_val = mathjs.subtract(this.values, val)
        }else{
            new_val = mathjs.subtract(this.values, val.values)
        }
        return new Series(new_val, this.index)
    }

    // greater(val: Series|number|mathjs.Tensor1D):Series{
    //     return new Series(
    //         this.values.greater(
    //             this._to_tf_val(val)
    //         ),
    //         this.index
    //     )
    // }

    // topk(k=1, sorted=false){
    //     const {values, indices} = this.values.topk(k, sorted)
    //     return {values, indices}
    // }
}