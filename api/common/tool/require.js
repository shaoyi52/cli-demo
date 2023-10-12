let fs = require("fs");
let path = require("path");
let log = require("tracer").colorConsole()
const toJson = require("./toJson");
let db = require("./mysql.js");
const getParams = require("./getParams");
//const common = require("../../common/tool/require")
module.exports = {
	fs,
	path,
	tool:{
		toJson,
		getParams,
	},	
	log,
	db
};
