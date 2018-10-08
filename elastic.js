const elasticsearch = require('elasticsearch')
const fs = require('fs')
const path = require('path')
const conf = path.join(__dirname, './')
let hosts = JSON.parse(fs.readFileSync(`${conf}/config.json`, 'utf8'))
let client
if(Array.isArray(hosts.elastic) || hosts.elastic.length > 0) {
    client = elasticsearch.Client({hosts: hosts.elastic})
} else {
    client = elasticsearch.Client()
}

module.exports = {

    // return boolean
    clientPing() {
        return client.ping({
            requestTimeout: 30000
        }).then(res => res).catch(err => re)
        // return new Promise((resolve, reject) =>
        //     client.ping({requestTimeout: 3000}, (err, res) => {
        //         if(err) return reject(err)
        //         resolve(res)
        //         // client.close()
        //     }
        // ));
    },

    //return object
    createIndex(data) {
        return this.clientPing().then(res => {
            if(res) {
                return client.index({
                    index: data.index,
                    type: data.type,
                    id: data.id,
                    body: data.data,
                    refresh: true
                }).then(res => res).catch(err => err)
                // return new Promise((resolve, reject) => 
                //     client.index({
                //         index: data.index,
                //         type: data.type,
                //         id: data.id,
                //         body: data.data,
                //         refresh: true
                //         }, (err, resp) => {
                //             if(err) return reject(err)
                //             resolve(resp)
                //         }
                //     )
                // );
            } else {
                return new Error()
            }
        }).catch(err => err)
    },

    // return object
    getIndex(data) {
        return this.clientPing().then(res => {
            if(res) {
                return client.get({
                    index: data.index,
                    type: data.type,
                    id: data.id
                }).then(res => res).catch(err => err)
                // return new Promise((resolve, reject) => 
                //     client.get({
                //         index: data.index,
                //         type: data.type,
                //         id: data.id
                //     }, (err, resp) => {
                //         if(err) return reject(err)
                //         resolve(resp)
                //     })
                // );
            } else {
                return new Error()
            }
        }).catch(err => err)
    },

    // return object
    getIndices(index) {
        return this.clientPing().then(res => {
            if(res) {
                return client.indices.get({
                    index: index
                }).then(res => res).catch(err => err)
                // return new Promise((resolve, reject) => 
                //     client.indices.get({
                //         index: index
                //     }, (err, resp) => {
                //         if(err) return reject(err)
                //         resolve(resp)
                //     })
                // );
            } else {
                return new Error()
            }
        }).catch(err => err)
    },

    // return object
    updateIndex(data) {
        return this.clientPing().then(res => {
            if(res) {
                return client.update({
                    index: data.index,
                    type: data.type,
                    id: data.id,
                    body: {
                        doc: data.data
                    }
                }).then(res => res).catch(err => err)
                // return new Promise((resolve, reject) => 
                //     client.update({
                //         index: data.index,
                //         type: data.type,
                //         id: data.id,
                //         body: {
                //            doc: data.data
                //         }
                //         }, (err, resp) => {
                //             if(err) return reject(err)
                //             resolve(resp)
                //         }
                //     )
                // );
            } else {
                return new Error()
            }
        }).catch(err => err)
    },

    // return object
    deleteIndex(data) {
        return this.clientPing().then(res => {
            if(res) {
                return client.delete({
                    index: data.index,
                    type: data.type,
                    id: data.id
                }).then(res => res).catch(err => err)
                // return new Promise((resolve, reject) => 
                //     client.delete({
                //         index: data.index,
                //         type: data.type,
                //         id: data.id
                //     }, (err, resp) => {
                //         if(err) return reject(err)
                //         resolve(resp)
                //     })
                // );
            } else {
                return new Error()
            }
        }).catch(err => err)
    },

    // return object
    deleteIndices(index) {
        return this.clientPing().then(res => {
            if(res) {
                return client.indices.delete({
                    index: index
                }).then(res => res).catch(err => err)
                // return new Promise((resolve, reject) => 
                //     client.indices.delete({index: index}, (err, resp) => {
                //         if(err) return reject(err)
                //         resolve(resp)
                //     })
                // );
            } else {
                return new Error()
            }
        }).catch(err => err)
    },

    // return boolean
    existsIndex(data) {
        return this.clientPing().then(res => {
            if(res) {
                return client.exists({
                    index: data.index,
                    type: data.type,
                    id: data.id
                }).then(res => res).catch(err => err)
                // return new Promise((resolve, reject) => 
                //     client.exists({
                //         index: data.index,
                //         type: data.type,
                //         id: data.id
                //     }, (err, resp) => {
                //         if(err) return reject(err)
                //         resolve(resp)
                //     })
                // );
            } else {
                return new Error()
            }
        }).catch(err => err)
    },

    // return boolean
    existsIndices(index) {
        return this.clientPing().then(res => {
            if(res) {
                return client.indices.exists({
                    index: index
                }).then(res => res).catch(err => err)
                // return new Promise((resolve, reject) => 
                //     client.indices.exists({
                //         index: index
                //     }, (err, resp) => {
                //         if(err) return reject(err)
                //         resolve(resp)
                //     })
                // );
            } else {
                return new Error()
            }
        }).catch(err => err)
    },

    // return number 
    countIndex(index) {
        return this.clientPing().then(res => {
            if(res) {
                return client.count({
                    index: index
                }).then(res => res).catch(err => err)
                // return new Promise((resolve, reject) => 
                //     client.count({
                //         index: index
                //         }, (err, resp) => {
                //             if(err) return reject(err)
                //             resolve(resp)
                //         }
                //     )
                // );
            } else {
                return new Error()
            }
        }).catch(err => err)
    },

    // return array
    catIndices() {
        return this.clientPing().then(res => {
            if(res) {
                return client.cat.indices({
                    h: ['index']
                }).then(res => {
                    return res.split("\n").filter(arr => arr !== '')
                }).catch(err => err)
                // return new Promise((resolve, reject) => 
                //     client.cat.indices({
                //         h: ['index']
                //         }, (err, resp) => {
                //             if(err) return reject(err)
                //             resolve(resp.split("\n").filter(arr => arr !== ''))
                //         }
                //     )
                // );
            } else {
                return new Error()
            }
        }).catch(err => err)
    },

    search(data) {
        return this.clientPing().then(res => {
            if(res) {
                // return client.cat.indices({
                //     h: ['index']
                // }).then(res => {
                //     return res.split("\n").filter(arr => arr !== '')
                // }).catch(err => err)
                return new Promise((resolve, reject) => 
                    client.search(data, (err, resp) => {
                                if(err) return reject(err)
                                resolve(resp.hits.hits)
                            }
                        )
                    );
            } else {
                return new Error()
            }
        }).catch(err => err)
    }
}

