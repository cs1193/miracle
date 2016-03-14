import {AuthenticationService} from "vss.uicore.authentication/source/authentication.service.ts";

export class AppLauncherStripUrlFilter {
	static NAME: string = "AppLauncherStripUrl";

	/*@ngInject*/
	public static factory($log: ng.ILogService, $location: ng.ILocationService, AuthenticationService: AuthenticationService): Function {
		var port = ($location.port().toString() != "80") ? ":" + $location.port() : "";
		var host = $location.host() + port;
		var isMobileBrowser = navigator.userAgent.match(/iPhone | iPad | iPod | Android/i);


		return (input: Object, enabled: boolean) => {
			var returnUrl: string;
			var tempUrl: string[];


			function parseUrl(url: string): any {
				var parameters = url.split(";");
				var keyValueResult = _.map(parameters, (parameter) => {
					var keyValueSingleItem = parameter.split(/=(.*)/);
					return {
						key: keyValueSingleItem[0],
						value: keyValueSingleItem[1]
					};
				});
				return keyValueResult;
			}

			function getAppUrl(url: string): any {
				var strURL = "";   
				var list =  parseUrl(decodeURIComponent(url));
				//Check if it is a generic URL
				var isgenericUrl = list[0].key === "generic";

				if(isgenericUrl) {      
					strURL = list[0].value;
				}
				else {
					if(!isMobileBrowser) {
						strURL = list[0].value;
					}
					else {   
						strURL = list[1].value;
					}
				}
				return strURL;   
			}


			if (AuthenticationService.isAuthenticated()) {
				returnUrl = (input["appUrl"] ? getAppUrl(input["appUrl"]) : input["marketUrl"]);
				$log.log("Authenticated | ","ReturnUrl => ", returnUrl, "AppUrl =>", input["appUrl"], "MarketUrl =>",  input["marketUrl"]);
			} else {
				returnUrl = (input["marketUrl"]);
				$log.log("Not Authenticated |", "MarketUrl => ", input["marketUrl"]);
			}

			// if (AuthenticationService.isAuthenticated() && !(!/^(f|ht)tps?:\/\//i.test(returnUrl))) {
			// 	$log.log(returnUrl);
			// 	tempUrl = returnUrl.split(";");
			// 	var tack: string = (isMobile && tempUrl.length > 1 ? tempUrl[1] : tempUrl[0]);
			// 	returnUrl = tack.split("=")[1];
			// }

			// $log.log(tempUrl, returnUrl);

			// returnUrl = ((/#.*/).test(returnUrl) ? host + returnUrl : returnUrl);
			// returnUrl = (returnUrl.search("^http[s]?://") !== 0 ? "http://" + returnUrl : returnUrl);

			return returnUrl;
		};
	};
}