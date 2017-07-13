/*
For more details about auto-migrate
    https://www.npmjs.com/package/loopback-component-auto-migrate
*/

var server = require('../server');
var ds = server.dataSources.moviesshowDB;
var lbTables = ['movie'];
//automigrate
ds.autoupdate(lbTables, function(er) {
    console.log(" |Start Auto-Migrate| ");
    if (er) throw er;
    console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
    //ds.disconnect();
});
