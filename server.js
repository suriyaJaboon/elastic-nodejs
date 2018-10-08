var elastic = require('./elastic');
var fs = require('fs');

async function insert() {
    // create 
    // let data = JSON.parse(fs.readFileSync('./data.json', 'utf8'))
    // let create = elastic.createIndex(data)
    // create.then(res => console.log(res))
    // try {
    //     let cat = await elastic.catIndices()
    //     console.log(cat)
    // } catch(e) {
    //     console.log(e)
    // }
    // existsIndices indices
    // let exists_indices = await elastic.existsIndices('dataconnection')
    // console.log(exists_indices)

    // get Index
    // let get = {"index": "dataconnection", "type": "google", "id": 20181001 }    
    // let gethits = await elastic.getIndex(get)
    // console.log(gethits)

    // count
    // let hits = await elastic.countIndex('dataconnection')
    // console.log(hits)

    // Object.assign(data.data, {update: 'updateIndex'})
    // let update = await elastic.updateIndex(data)
    // console.log(update)

    // delete index
    // let index_delete = {"index": "dataconnection", "type": "google", "id": 20181001 }
    // let deleted = await elastic.deleteIndex(index_delete)
    // console.log(deleted)

    // delete indices
    // let delete_indices = await elastic.deleteIndices('dataconnection')
    // console.log(delete_indices)

    let aa = await elastic.search({inde: 'product', q: 'name:Basil'})
    console.log(aa)
}

insert()
// console.log('server -> ', elastic.clientPing().then(j => {console.log(j)}).catch(e => { console.log(e)}))