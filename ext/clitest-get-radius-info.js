// use this from the command line to test proper operation of sonar-v1-get-radius-info
// Syntax: node ./clitest-get-radius-info.js <sonarinstancefqdn> <accountnum>
// ex. node ./clitest-get-radius-info.js mysonarinstance.sonar.software 111234

const getRadius = require('./sonar-v1-get-radius-info.js');
var args = process.argv.slice(2);

getRadius.getRadius([args[0],args[1]], function(err, result) {
    if(err)
        console.log("error: ", err)
    console.log("result: ", result)
});
