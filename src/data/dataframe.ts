import * as tf from "@tensorflow/tfjs"
import {Index, RangeIndex} from './index'
import {Series} from './series'
import { tensor } from "@tensorflow/tfjs";


export class DataFrame{
    values: tf.Tensor;
    columns: Index;
    index: Index;
    shape: Array<number>;

    constructor(values: tf.Tensor, columns?: Index|Array<number|string>, index?: Index){
        this.values = values
        if(Array.isArray(columns)){
            columns = new Index(columns)
        }
        if(columns){
            if(columns.length()==values.shape[1]){
                this.columns=columns;
            }else{
                throw new Error('Columns.lengt != values.shape[1]')
            }
        }else{
            this.columns = new RangeIndex(0, values.shape[1])
        }

        if(index){
            if(index.length()==values.shape[0]){
                this.index=index;
            }else{
                throw new Error('index.lengt != values.shape[0]')
            }
        }else{
            this.index = new RangeIndex(0, values.shape[0])
        }
        this.shape = this.values.shape;
    };

    select_col(name: string|number):Series{
        let i = this.columns.get_loc(name);
        let values = this.values.slice([0, i], [this.shape[0], 1]);
        let s = new Series(values.as1D())
        s.name = name.toString();
        return s
    };

    async mask(mask: Series):Promise<DataFrame>{
        console.log(mask.shape)
        console.log(this.shape)
        if(mask.shape[0]!=this.shape[0]){
            throw new Error('mask.shape[0]==this.shape[0]')
        }
        let values = await tf.booleanMaskAsync(this.values, mask.values)
        // let values = this.values.gather(mask.values)
        values.print()
        console.log('pppppppppppppp')
        return new DataFrame(values, this.columns)
    }
}