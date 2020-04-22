import chai from "chai"
import * as tf from "@tensorflow/tfjs"


const a = tf.tensor([[1, 2], [3, 4]]);
console.log('shape:', a.shape);
a.print();

const shape = [2, 2];
const b = tf.tensor([1, 2, 3, 4], shape);
b.array(data=>{
    console.log('data:', typeof data)
})

console.log(b.array())
describe('test type', ()=>{
    b.should.be.an('object')
    let data =  b.arraySync()
    data.should.be.an('Array')
    data.should.deep.equal([[1, 2],[3, 4]])
})