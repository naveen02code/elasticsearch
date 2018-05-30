const elasticsearch = require('elasticsearch');
const config = require('./../config.json');
const _ = require('lodash');
const productJson = require('./../data/product.json');

// Creating elasticsearch client instance
const client = elasticsearch.Client(_.cloneDeep(config.options)); // used cloneDeep to prevent changes in config
// NOTE: Due to the complex nature of the configuration, the config object you pass in will be modified and can only be used to create one Client instance.

// ping the cluster
client.ping({
        requestTimeout: 30000
    })
    .then(result => {
        console.info(result); // true
    }).catch(err => {
        console.error(err);
    });


// check if index already exists
// client.indices.exists({
//         index: 'product'
//     })
//     .then(result => {
//         console.info(result);
//     })
//     .catch(err => {
//         console.error(err);
//     });

// // delete index
// // client.indices.delete({
// //         index: 'product'
// //     })
// //     .then(result => {
// //         console.info(result);
// //     })
// //     .catch(err => {
// //         console.error(err);
// //     });

// // create index
// const mapping = {
//     "mappings": {
//         "_doc": {
//             "properties": {
//                 "name": {
//                     "type": "text",
//                     "fields": {
//                         "keyword": {
//                             "type": "keyword"
//                         }
//                     }
//                 },
//                 "price": {
//                     "type": "scaled_float",
//                     "scaling_factor": 100,
//                     "doc_values": true
//                 }
//             }
//         }
//     }
// };
// client.indices.create({
//         index: 'product', // index name
//         body: mapping
//     })
//     .then(result => {
//         console.info(result);
//     })
//     .catch(err => {
//         console.error(err);
//     });


// Insert doc
client.bulk({
        index: 'product',
        type: '_doc',
        body: productJson
    })
    .then(result => {
        console.info(result);
    })
    .catch(err => {
        console.error(err);
    });