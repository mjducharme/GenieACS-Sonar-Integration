let sonarAccountAll = declare(
  "VirtualParameters.Sonar-Account-All",
  {value: Date.now()}).value[0];

let sonarAccountName = "";

if (sonarAccountAll !== "") {
  sonarAccountName = JSON.parse(sonarAccountAll).accountName;
}

return {writable: false, value: [sonarAccountName, "xsd:string"]};