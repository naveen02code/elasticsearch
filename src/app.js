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

    console.info('Pinging...');
    await esClient.ping();
    console.info('Pinging Done');

    // console.info('Deleting Index...');
    // await esClient.deleteIndex('product');
    // console.info('Deleting Index Done');

    const mapping = {
        "mappings": {
            "_doc": {
                "properties": {
                    "name": {
                        "type": "text",
                        "fields": {
                            "keyword": {
                                "type": "keyword"
                            }
                        }
                    },
                    "price": {
                        "type": "scaled_float",
                        "scaling_factor": 100,
                        "doc_values": true
                    }
                }
            }
        }
    };
    // console.info('Creating Index...');
    // await esClient.createIndex('product', mapping);
    // console.info('Creating Index Done');

    // console.info('Checking Index...');
    // await esClient.checkIndex('product');
    // console.info('Checking Index Done');

    // const productJson = require('./../data/product.json');
    // console.info('Bulk Indexing...');
    // await esClient.bulkIndex('product', productJson);
    // console.info('Bulk Indexing Done');

    console.info('Get Doc By Id...');
    const doc = await esClient.getDocumentById('5b0d4f3703437c01dc3b442f', 'product', { type: '_doc', _source: ['_id', '_name'] });
    console.info('Doc: ', doc);

    console.info('Search by name...');
    const result = await esClient.search('product', '');
    console.info('Doc: ', result);

}


test(_.cloneDeep(config.options))
    .then(result => {
        console.info('Success: ', result);
    }).catch(err => {
        console.error('Error: ', err);
    });