import {should} from 'chai'
import {chidelta} from '../../src/utils/chi2-compare'

should()


describe('chi2-comapre', ()=>{
    it('chidelta', ()=>{
        let res = chidelta(148.326, 40, 171.324, 41)
        res.chidelta.should.equal(22.99800000000002)
        res.dfdelta.should.equal(1)
        res.p.should.equal(0.0000016217002101193145)
        console.log(res.describe)
    })
})