// This GenieACS extension pulls the list of RADIUS accounts for a given account from Sonar
// Change auth option below to specify Sonar user:password for fetching TR069 data

"use strict";

const https = require("https");

function getRadius(args, callback) {
  var data = JSON.stringify({
    "page" : 1
  })

  var options = {
    hostname: args[0],
    port: 443,
    path: '/api/v1/accounts/' + args[1] + '/radius_accounts',
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
    auth: 'tr069:p4ssw0rd',
    timeout: 4000,
  }

  var req = https.request(options, (res) => {
    if (res.statusCode !== 200)
      return callback(
        new Error(`Request failed (status code: ${res.statusCode})`)
      );

    let rawData = "";
    res.on("data", (chunk) => (rawData += chunk));

    res.on("end", () => {
      let radiusUsername = "";
      let radiusPassword = "";
      let totalCount = JSON.parse(rawData)["paginator"]["total_count"];
      if (totalCount) {
        radiusUsername = JSON.parse(rawData)["data"][0]["username"];
        radiusPassword = JSON.parse(rawData)["data"][0]["password"];
      }
      let result = { radiusUsername: radiusUsername, radiusPassword: radiusPassword };
      callback(null, result);
    });
  });

  req.on("error", (err) => {
    callback(err);
  });

  req.write(data);
  req.end();
}

exports.getRadius = getRadius;

