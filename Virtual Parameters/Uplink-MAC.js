let deviceClass = declare(
  "Device.DeviceInfo.ProductClass",
  {value: Date.now()}).value[0];

// If your uplink mac should not be the ether1 mac, change this
let uplinkMac = declare(
  "Device.Ethernet.Interface.1.MACAddress",
  {value: Date.now()}).value[0];

// Uncomment to override uplink MAC for particular model - below is example to use SFP port for hEX S
// if (deviceClass == "hEX S") {
//   uplinkMac = declare("Device.Ethernet.Interface.6.MACAddress", {value: Date.now()}).value[0];
// };

return {writable: false, value: [uplinkMac, "xsd:string"]};