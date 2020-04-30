#!/usr/bin/env node

var tools = require("./index.js");

if (process.argv[2] === 'login'){
    tools.login();
}
else if (process.argv[2] === 'logout'){
    tools.logout();
}
else if (process.argv[2] === 'history') {
    tools.history();
}
else {
    throw new console.error("usage: enter either login, logout, or history");
}