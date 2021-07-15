// Identify which Sonar instance the device is present in
// Specify the subnets under sonarInstances to prevent needing to search the instance

// If only once Sonar instance is used, this can be simplified by uncommenting the following line and then deleting all of the remaining lines except the return statement at the end
// let sonarInstance = "mysonarinstance.sonar.software";

let dhcpIp = declare(
  "Device.DHCPv4.Client.1.IPAddress",
  {value: Date.now()}).value[0];

let uplinkMac = declare(
  "VirtualParameters.Uplink-MAC",
  {value: Date.now()}).value[0];

let serialNum = declare(
  "Device.DeviceInfo.SerialNumber",
  {value: Date.now()}).value[0];

let sonarInstance = "";

let sonarInstances = {
  "mysonarinstance.sonar.software":["10.100.0.", "10.100.1.", "10.100.2."], 
  "myreseller.sonar.software":["10.100.3."],
  "myotherreseller.sonar.software":["10.100.4."]
};

loop1:
for (let [key, value] of Object.entries(sonarInstances)) {
  //console.log(`${key}:`);
  loop2:
  for (const element of value) {
    //console.log(element);
    if (dhcpIp.startsWith(element)) {
      //console.log("got it!");
      sonarInstance = key;
      break loop1;
    }
  }
}

if (sonarInstance == "") {
  for (let [key, value] of Object.entries(sonarInstances)) {
    if (ext("sonar-v1-search-mac-serial.js", "searchSonar", key, uplinkMac).totalCount) {
      sonarInstance = key;
      break;
    } else if (ext("sonar-v1-search-mac-serial.js", "searchSonar", key, serialNum).totalCount) {
      sonarInstance = key;
      break;
    }
  }
}

return {writable: false, value: [sonarInstance, "xsd:string"]};