let sonarAccountAll = declare(
  "VirtualParameters.Sonar-Account-All",
  {value: Date.now()}).value[0];

let sonarAccountNum = "";

if (sonarAccountAll !== "") {
  sonarAccountNum = JSON.parse(sonarAccountAll).accountNum;
}

return {writable: false, value: [sonarAccountNum, "xsd:string"]};