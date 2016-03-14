import {AuthenticationService} from "vss.uicore.authentication/source/authentication.service.ts";
import {QueryParameters} from "../common/queryparameters.service.ts";

export class WelcomeController {
	static NAME: string = "WelcomeController";

	/*@ngInject*/
	constructor(
		private $log: ng.ILogService,
		private QueryParameters: QueryParameters,
		private $rootScope: ng.IRootScopeService,
		private AuthenticationService: AuthenticationService,
		private TPAAS_LOGIN_URL,
		private TPAAS_CLIENT_ID,
		private TPAAS_REDIRECT_URI
	) {	

		this.$log.log("Welcome Controller");

		this.$rootScope["enableCustomerControl"] = false;
		this.$rootScope["authenticated"] = this.AuthenticationService.isAuthenticated();

		this.$log.log(this.QueryParameters.getQueryParam('fidp'));

		if (this.AuthenticationService.isAuthenticated()) {
			this.$log.log("Authenticated");
		} else {
			this.$log.log("Not Authenticated");
		}

	}
}