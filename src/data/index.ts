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