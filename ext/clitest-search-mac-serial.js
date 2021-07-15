// use this from the command line to test proper operation of sonar-v1-get-radius-info
// Syntax: node ./clitest-search-mac-serial.js <sonarinstancefqdn> <macorserial>
// ex. node ./clitest-get-radius-info.js mysonarinstance.sonar.software 00:11:22:33:44:55

const searchSonar = require('./sonar-v1-search-mac-serial.js');
var args = process.argv.slice(2);

searchSonar.searchSonar([args[0],args[1]], function(err, result) {
    if(err)
        console.log("error: ", err)
    console.log("result: ", result)
});
