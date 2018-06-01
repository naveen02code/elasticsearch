const elasticsearch = require('elasticsearch');
const config = require('./../config.json');
const _ = require('lodash');

// Creating elasticsearch client instance
// const client = elasticsearch.Client(_.cloneDeep(config.options)); // used cloneDeep to prevent changes in config
// NOTE: Due to the complex nature of the configuration, the config object you pass in will be modified and can only be used to create one Client instance.

// ping the cluster
// client.ping({
//         requestTimeout: 30000
//     })
//     .then(result => {
//         console.info(result); // true
//     }).catch(err => {
//         console.error(err);
//     });


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

// delete index
// client.indices.delete({
//         index: 'product'
//     })
//     .then(result => {
//         console.info(result);
//     })
//     .catch(err => {
//         console.error(err);
//     });

// create index
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
// client.bulk({
//         index: 'product',
//         type: '_doc',
//         body: productJson
//     })
//     .then(result => {
//         console.info(result);
//     })
//     .catch(err => {
//         console.error(err);
//     });


const ElasticSearch = require('./elastic');


async function test(options) {
    const esClient = new ElasticSearch(options);
    let result;
    // console.info('Pinging...');
    // result = await esClient.ping();
    // console.info('Pinging Done: ', result);

    // console.info('Deleting Index...');
    // result = await esClient.deleteIndex('product');
    // console.info('Deleting Index Done: ', result);

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
    //                 "normalPrice": {
    //                     "type": "scaled_float",
    //                     "scaling_factor": 100,
    //                     "doc_values": true
    //                 },
    //                 "offerPrice": {
    //                     "type": "scaled_float",
    //                     "scaling_factor": 100,
    //                     "doc_values": true
    //                 }
    //             }
    //         }
    //     }
    // };
    // console.info('Creating Index...');
    // result = await esClient.createIndex('product', mapping);
    // console.info('Creating Index Done: ', result);

    // console.info('Checking Index...');
    // result = await esClient.checkIndex('product');
    // console.info('Checking Index Done: ', result);

    // const productJson = require('./../data/product-new.json');
    // console.info('Bulk Indexing...');
    // result = await esClient.createBulkIndex('product', productJson);
    // console.info('Bulk Indexing Done: ', result);

    // console.info('Get Doc By Id...');
    // result = await esClient.getDocumentById('5b0d4f3703437c01dc3b442f', 'product', { type: '_doc', _source: ['_id', '_name'] });
    // console.info('Doc: ', result);

    console.info('Search by name...');
    result = await esClient.searchByName('product', 'eni');
    console.info('Doc: ', result);

    // console.log('Partial Doc Update...');
    // result = await esClient.partialDocumentUpdate('5b1108df0d34771c6b7317fc', 'product', {
    //     "offerPrice": 5.37,
    //     "normalPrice": 935.25
    // })
    // console.log('Updation done.');

    // console.log('Deleting doc...');
    // result = await esClient.deleteDocumentById('5b1108dfe24878c1c4e5401e', 'product');
    // console.log('Deletion done: ', result);

    console.log('Creating index...');
    const newDoc = {
        "id": "5b1108dfe24878c1c4e5401e",
        "offerPrice": 435.62,
        "normalPrice": 696.4,
        "name": "quis tempor Lorem nulla ex amet tempor mollit qui cillum"
    };
    result = await esClient.createIndex('product', '_doc', newDoc);
    console.log('Creation done: ', result);

    return result;

}


test(_.cloneDeep(config.options))
    .then(result => {
        console.info('Success: ', result);
    }).catch(err => {
        console.error('Error: ', err);
    });