const elasticsearch = require('elasticsearch');
const config = require('./../config.json');
const _ = require('lodash');
const productJson = require('./../data/product.json');

class ElasticSearch {
    constructor(options) {
        this.client = elasticsearch.Client(_.cloneDeep(config.options));
    }

    // ping the cluster
    ping() {
        return this.client.ping({
            requestTimeout: 30000
        });
    };

    // check if index already exists
    checkIndex(indexName) {
        return this.client.indices.exists({
            index: indexName
        });
    };

    // delete index
    deleteIndex(indexName) {
        return this.client.indices.delete({
            index: indexName
        });
    };

    // create index
    createIndex(indexName, mapping) {
        return this.client.indices.create({
            index: indexName,
            body: mapping
        });
    };

    // Bulk index
    bulkIndex(indexName, document, type = '_doc') {
        return this.client.bulk({
            index: indexName,
            type: type,
            body: document
        })
    }

    // Get document by Id
    getDocumentById(id, indexName, options) {
        const opt = _.assign({}, options);
        opt.id = id;
        opt.index = indexName;
        return this.client.get(opt);
    }

    // Search by keyword
    search(indexName, keyword) {
        const body = {
            "query": { "wildcard": { "name": `*${keyword}*` } },
            "sort": [
                { "price": "asc" }
            ],
            "_source": ["name", "price"],
            "from": 0,
            "size": 10
        };
        return this.client.search({
            index: indexName,
            type: '_doc',
            body: body
        });
    }
}

module.exports = ElasticSearch;