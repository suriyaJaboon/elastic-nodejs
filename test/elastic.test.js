const assert = require('assert')
const elasticsearch = require('elasticsearch')
const fs = require('fs')
const path = require('path')
const elastic = require('../elastic')
const conf = path.join(__dirname, '../')
let data = JSON.parse(fs.readFileSync(`${conf}/data.json`, 'utf8'))
let hosts = JSON.parse(fs.readFileSync(`${conf}/config.json`, 'utf8'))
let datas, client, clientElastic

describe('Elastic Server ', () => {
    before('Start Initail', () => {
        if(Array.isArray(hosts.elastic) || hosts.elastic.length > 0) {
            clientElastic = elasticsearch.Client({hosts: hosts})
        } else {
            clientElastic = elasticsearch.Client()
        }        
    })
    beforeEach('Connection Elasticsearch', async () => {
        client = clientElastic
        datas = data
        await elastic.createIndex(datas)
    })
    it('Should be ping check connection to elasticsearch return true', async () => {
        let actualResult = await elastic.clientPing()
        assert.equal(true, actualResult)
    })
    it('Should be create indexing in elasticsearch return object creaate for check true', async () => {
        await elastic.deleteIndices(datas.index)
        let actualResult = await elastic.createIndex(datas)
        assert.equal(true, actualResult.created)
    })
    it('Should be getindex in elasticsearch return object getindex for check true', async () => {
        let mock_get_index = {"index": "dataconnection", "type": "google", "id": 20181001 }
        let actualResult = await elastic.getIndex(mock_get_index)
        let {_source:{report_data}} = actualResult
        assert.deepEqual(datas.data.report_data, report_data)
    })
    it('Should be getindices in elasticsearch return ojbect getdices for check name', async () => {
        let getindices = await elastic.getIndices(datas.index)
        assert.equal(datas.index, Object.keys(getindices)[0])
    })
    it('Should be updateindex in elasticsearch return ojbect updateindex for check object', async () => {
        Object.assign(datas.data.report_data, {update: 'updateIndex'})
        let actualResultUpdate = await elastic.updateIndex(datas)

        let mock_get_index = {"index": "dataconnection", "type": "google", "id": 20181001 }
        let actualResultGet = await elastic.getIndex(mock_get_index)
        assert.deepEqual(actualResultGet._source.report_data.update, datas.data.report_data.update)
    })
    it('Should be deleteindex in elasticsearch return ojbect deleteindex for check object', async () => {
        let isactualResultExists
        datas.id = 20181002
        await elastic.createIndex(datas)
        isactualResultExists = await elastic.existsIndex(datas)
        assert.equal(true, isactualResultExists)
        await elastic.deleteIndex(datas)
        isactualResultExists = await elastic.existsIndex(datas)
        assert.equal(false, isactualResultExists) 
    })
    it('Should be deleteindices in elasticsearch return ojbect deleteindices for check object', async () => {
        let actualResult = await elastic.deleteIndices(datas.index)
        assert.equal(true, actualResult.acknowledged)
    })
    it('Should be existsIndex elasticsearch return ojbect existsIndex for check boolean', async () => {
        let actualResult = await elastic.existsIndex(datas)
        assert.equal(true, actualResult)
    })
    it('Should be existsindices elasticsearch return ojbect existsindices for check boolean', async () => {
        let actualResult = await elastic.existsIndices(datas.index)
        assert.equal(true, actualResult)
    })
    it('Should be countindex elasticsearch return number countindex for check number', async () => {
        let actualResult = await elastic.countIndex(datas.index)
        assert.equal(1, actualResult.count)
    })
    it('Should be catindices elasticsearch return array catindices for check array', async () => {
        let actualResult = await elastic.catIndices()
        assert.deepEqual(['dataconnection', '.softnix'], actualResult)
    })
    it('Should be search elasticsearch return object search for check query', () => {
        let mock_data_search = {
            index: datas.index,
            // q: 'INTEGER'
            body: {
                query: {
                    match: {
                        // type: "INTEGER"
                        _all: '*'
                    }
                }
            }
        } 
        let getResponse = elastic.search(mock_data_search)
        getResponse.then(res => {
            console.log(res)
        })
    })
    afterEach('Close Connection Elasticsearch', async () => {
        await elastic.deleteIndices(datas.index)
        client.close()       
    })
    after('End Initail', () => {
        client.close()
    })
})