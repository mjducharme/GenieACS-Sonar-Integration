// This is a GenieACS extension that searches for an inventory item mac or serial in Sonar
// Change auth option below to specify Sonar user:password for fetching TR069 data

"use strict";

const https = require("https");

function searchSonar(args, callback) {
  var data = JSON.stringify({
    "size": 100,
    "page": 1,
    "search": {
      "search": args[1] //Find anything matching the mac or serial
    }
  })

  var options = {
    hostname: args[0],
    port: 443,
    path: '/api/v1/search/inventory_items',
    method: 'POST',
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
      let totalCount = JSON.parse(rawData)["data"]["paginator"]["total_count"];
      let accountNum = 0;
      let accountName = "";
      let itemFound = false;
      let fullData = JSON.parse(rawData)["data"]["results"];
      delete fullData["aggregations"]; 
      if (totalCount > 0) {
        loop1:
        for (let inventoryItem of Object.values(fullData)) {
          loop2:
          for (let inventoryItemField of Object.values(inventoryItem["inventory_model_field_data"])) {
            if (inventoryItemField["value"] == args[1]) {
              accountNum = parseInt(inventoryItem["assigned_id"]);
              accountName = inventoryItem["assignee_name"];
              itemFound = true;
              break loop1;
            }
          }
        }
      } // else if (totalCount == 1) {  this can be uncommented later when Sonar fixes the problem of an exact MAC match returning extra results it should not
        // accountNum = JSON.parse(rawData)["data"]["results"]["0"]["assigned_id"];
        // accountName = JSON.parse(rawData)["data"]["results"]["0"]["assignee_name"];
      //}
      if (!itemFound)
        totalCount = 0;
      let result = { totalCount: totalCount, accountNum: accountNum, accountName: accountName };
      callback(null, result);
    });
  });

  req.on("error", (err) => {
    callback(err);
  });

  req.write(data);
  req.end();
}

exports.searchSonar = searchSonar;
