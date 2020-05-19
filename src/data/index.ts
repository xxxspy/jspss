import * as tf from '@tensorflow/tfjs'

export class Index{
    name?:string;
    values: Array<string|number>;

    constructor(values: Array<string|number>, name:string=''){
        this.values=values;
        this.name=name;
    }


    length():number{
        return this.values.length;
    };

    get_loc(name:string|number){
        let loc = -1;
        for(let i=0;i<this.length();i++){
            if(name==this.values[i]){
                loc=i;
                break
            }
        }
        return loc
    }

    gather(indices:Array<number>|tf.Tensor):Index{
        let idc;
        if(indices instanceof tf.Tensor){
            idc = indices.arraySync()
        }else{
            idc = indices
        }
        let rtn = []
        idc.forEach(i => {
            rtn.push(this.values[i])
        });
        return new Index(rtn)
    }

    indexOf(cols: Array<number|string>):Array<number>{
        let idx = []
        cols.forEach(val=>{
            let i = -1;
            this.values.forEach((col, j)=>{
                if(i<0 && col==val){
                    i = j
                }
            })
            idx.push(i)
        })
        return idx
    }
}

export class RangeIndex extends Index{
    name?: string;
    start: number;
    stop: number;
    step: number;

    constructor(start: number, stop: number, step:number=1, name:string=''){
        let values = []
        for(let i=start;i<stop;i+=step){
            values.push(i)
        }
        super(values)
        this.start=start;
        this.stop=stop;
        this.step=step;
    }
}

