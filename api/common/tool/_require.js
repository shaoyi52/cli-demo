let fs = require("fs");
let path = require("path");
let log = require("tracer").colorConsole()
const toJson = require("./_toJson");
let db = require("./_mysql.js");
const getParams = require("./_getParams");
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
