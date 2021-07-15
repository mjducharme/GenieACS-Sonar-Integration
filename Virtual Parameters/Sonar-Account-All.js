let sonarInstance = declare(
  "VirtualParameters.Sonar-Instance",
  {value: Date.now()}).value[0];

let uplinkMac = declare(
  "VirtualParameters.Uplink-MAC",
  {value: Date.now()}).value[0];

let serialNum = declare(
  "Device.DeviceInfo.SerialNumber",
  {value: Date.now()}).value[0];

let sonarAccountAll = "";

if (sonarInstance != "") {
  sonarAccountAll = JSON.stringify(ext("sonar-v1-search-mac-serial.js", "searchSonar", sonarInstance, uplinkMac));
  // in case there is a typo in the MAC, use the serial instead
  if (JSON.parse(sonarAccountAll).totalCount == 0)
    sonarAccountAll = JSON.stringify(ext("sonar-v1-search-mac-serial.js", "searchSonar", sonarInstance, serialNum));
}

return {writable: false, value: [sonarAccountAll, "xsd:string"]};