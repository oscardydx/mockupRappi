'use strict'

class StoreController {
    index({view}){
        return view.render('store.index')
        //return 'HolaMundo1';
    }
}

module.exports = StoreController
