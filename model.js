var async = require('async')

module.exports = {
  batch_save: function(db, docs, done){

    async.parallelLimit(

      docs.map(function(doc, i){

        return function(doneThis){
          db.collection('properties').insert(doc, function(err, res){
            if (err){ 
              console.error(err) 
              process.exit
            }
            // console.log('wrote doc['+i+'] to db')
            doneThis(null, docs[i])
          })
        }

      }), 1000, done

    )
  }
}