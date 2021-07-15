let sonarRadiusAll = declare(
  "VirtualParameters.Sonar-RADIUS-All",
  {value: Date.now()}).value[0];

let sonarRadiusPassword = "";

if (sonarRadiusAll !== "") {
  sonarRadiusPassword = JSON.parse(sonarRadiusAll).radiusPassword;
}

return {writable: false, value: [sonarRadiusPassword, "xsd:string"]};