# GenieACS Sonar Integration
Integration for GenieACS to pull info from Sonar (v1) instance, for GenieACS 1.2.5 and later

This integration is designed for MikroTik devices, scripts will need modification for other devices.

Instructions:
1. Place ext directory contents into GenieACS's ext folder. Edit .js files as necessary for your instance - at minimum the auth username and password to sonar will need to be updated (default is user "tr069" with unsecure password "p4ssw0rd"). Test the .js files with the clitest scripts before proceeding to make sure they pull the data correctly!
2. In the GenieACS user interface, to to Admin->Virtual Parameters, and make new Virtual Parameters with names and contents that match those .js files in the Virtual Parameters folder, but omit the .js extension. Some files need modification/customization for your environment - please read the comments for each!
3. To tell GenieACS to pull the virtual parameters hourly, edit the GenieACS Provision called "default" and add the following lines at or near the end:
```
// Refresh Virtual Parameters
declare("VirtualParameters.*", {path: hourly, value: hourly});
```
4. Under Admin->Config, edit the index page and device page to display fields from Sonar as desired.
5. If you use PPPoE, if desired, create a provision to change the device's PPPoE username and password based on the one pulled from Sonar. An example is provided below:
```
let sonarRadiusUsername = declare(
  "VirtualParameters.Sonar-RADIUS-Username",
  {value: Date.now()}).value[0];
let sonarRadiusPassword = declare(
  "VirtualParameters.Sonar-RADIUS-Password",
  {value: Date.now()}).value[0];

if (sonarRadiusUsername != "" && sonarRadiusPassword != "") {
   declare("Device.PPP.Interface.1.Username", null, {value: sonarRadiusUsername});
   declare("Device.PPP.Interface.1.Password", null, {value: sonarRadiusPassword});
   // Adjust PeriodicInformInterval to from 30 seconds to 5m after PPPoE credentials are set
   declare("Device.ManagementServer.PeriodicInformInterval", null, {value: 300});
}
```

You will also need a preset to specify the conditions under which this provision should be triggered. The contents of the preset will depend on your other setup in GenieACS.
