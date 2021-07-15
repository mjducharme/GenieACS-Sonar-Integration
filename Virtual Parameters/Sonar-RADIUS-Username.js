let sonarRadiusAll = declare(
  "VirtualParameters.Sonar-RADIUS-All",
  {value: Date.now()}).value[0];

let sonarRadiusUsername = "";

if (sonarRadiusAll !== "") {
  sonarRadiusUsername = JSON.parse(sonarRadiusAll).radiusUsername;
}

return {writable: false, value: [sonarRadiusUsername, "xsd:string"]};