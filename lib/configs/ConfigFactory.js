//////////////////
// Requires
//////////////////

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var OperationalError = require('bluebird').Promise.OperationalError;

var SftpConfig = require("./SftpConfig");
var FtpConfig = require("./FtpConfig");
var NoConfigurationFileFoundException = require("./../exceptions/NoConfigurationFileFoundException");
var ConfigurationFileNotReadableException = require("./../exceptions/ConfigurationFileNotReadableException");
var ConfigurationFileSyntaxErrorException = require("./../exceptions/ConfigurationFileSyntaxErrorException");

//////////////////
// Ctor
//////////////////

function ConfigFactory() {
}

//////////////////
// Methods
//////////////////

ConfigFactory.prototype.parseConfigFile = function(content) {
    var deferred = Promise.pending();

    try {
        var configData = JSON.parse(content);
        deferred.fulfill(configData);
    } catch(e) {
        if (e.name === 'SyntaxError') {
            deferred.reject(new ConfigurationFileSyntaxErrorException(e.message));
        } else {
            deferred.reject(e);
        }
    }

    return deferred.promise;
}

/**
 * Convert any string to camelCase - https://stackoverflow.com/a/52551910
 * @param  {string} str Source string
 * @return {string}     Converted string
 */
ConfigFactory.prototype.toCamelCase = function(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr){
        return chr.toUpperCase();
    });
};

ConfigFactory.prototype.createConfig = function(configData) {
    var deferred = Promise.pending();

    try {
        var type = configData.type;
        type = type.charAt(0).toUpperCase() + type.substring(1);
        var getter = 'create' + type + 'Config';
        var config = this[getter]();

        for (var key in configData) {
            if (config[key] !== undefined) {
                // enforce camelCase
                if (key.includes('_')){
                    config[self.toCamelCase(key)] = configData[key];
                }
                else {
                    config[key] = configData[key];
                }
            }
        }
        deferred.resolve(config);
    } catch(e) {
        deferred.reject(e);
    }

    return deferred.promise;
}

/**
 * Create configuration from a file
 * @param {String}   file
 * @param {Function} callback
 */
ConfigFactory.prototype.loadConfig = function(configPath) {
    var deferred = Promise.pending();
    var config = null;
    var self = this;

    return fs.readFileAsync(configPath, 'utf8')
        .then(function(content) {
            return self.parseConfigFile(content);
        })
        .then(function(configData) {
            return self.createConfig(configData);
        })
        .catch(OperationalError, function(e) {
            if (e.code === 'ENOENT') {
                throw new NoConfigurationFileFoundException();
            } else if (e.code === 'EACCES') {
                throw new ConfigurationFileNotReadableException();
            } else {
                throw e;
            }
        });
};

/**
 * @return {SftpConfig}
 */
ConfigFactory.prototype.createSftpConfig = function () {
    return new SftpConfig();
};

/**
 * @return {FtpConfig}
 */
ConfigFactory.prototype.createFtpConfig = function () {
    return new FtpConfig();
};

module.exports = ConfigFactory;
