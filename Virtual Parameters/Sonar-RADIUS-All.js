let sonarInstance = declare(
  "VirtualParameters.Sonar-Instance",
  {value: Date.now()}).value[0];

let sonarAccountNum = declare(
  "VirtualParameters.Sonar-Account-Num",
  {value: Date.now()}).value[0];

let sonarRadiusAll = "";

if (sonarInstance != "" && sonarAccountNum != "") {
  sonarRadiusAll = JSON.stringify(ext("sonar-v1-get-radius-info.js", "getRadius", sonarInstance, sonarAccountNum));
}

return {writable: false, value: [sonarRadiusAll, "xsd:string"]};