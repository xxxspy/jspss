import chai from "chai";
import * as tf from "@tensorflow/tfjs"
import * as _ from './data/series.test'

tf.setBackend("cpu")
require('jsdom-global')()

// Import the ghost class instance.
import tfstat from "../src/index.ts";

chai.should();

// create mock html tag
// document.body.innerHTML = "<div>Sample text in div</div>";

// describe('#Ghost Library Test', function () {

//   describe('#Element Selector', function () {
//     it('should be an object', function () {
//       ghost('div').selector.should.be.an('object');
//     });
//   });

//   describe('#DivContent', function () {
//     it('should be a string', function () {
//       ghost('div').html().should.be.a('string');
//     });

//     it('should equal Sample text in div', function () {
//       ghost('div').html().should.equal('Sample text in div');
//     });

//     it('should equal paragraph text', function () {
//       ghost('div').html('<p>changed value</p>').should.equal('<p>changed value</p>');
//     });

//     it('should equal empty string', function () {
//       ghost('div').html('').should.equal('');
//     });

//   });

// });
