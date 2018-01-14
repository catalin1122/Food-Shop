var elasticsearch = require('elasticsearch'),
    config = require('../../config/es-config.json'),
    validationUtils = require('../utils/validationUtils');

const esClient = new elasticsearch.Client({
    host: config.host,
    log: config.logLevel
});

exports.search = function (index, query, from, size) {
    let pagination = validationUtils.validatePagination(from, size);
    console.log("Searching for " + index);
    return esClient.search({
        index: index,
        q: query,
        from: pagination.from,
        size: pagination.size
    });
};

exports.searchUsers = function (query, from, size) {
    return this.search(config.usersIndex, query, from, size);
};

exports.searchProducts = function (query, from, size) {
    return this.search(config.productsIndex, query, from, size);
};

exports.searchInvoices = function (query, from, size) {
    return this.search(config.invoicesIndex, query, from, size);
};

exports.index = function (index, body) {
    return esClient.index({
        index: index,
        type: 'doc',
        body: body
    });
};

exports.indexUser = function (body) {
    return this.index(config.usersIndex, body);
};

exports.indexProduct = function (body) {
    return this.index(config.productsIndex, body);
};

exports.indexInvoice = function (body) {
    return this.index(config.invoicesIndex, body);
};