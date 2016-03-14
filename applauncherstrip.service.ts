import {AuthenticationService} from "vss.uicore.authentication/source/authentication.service.ts";
import {AppDetailsService} from "vss.ui.utilities/source/appdetails.service.ts";
import {ApplicationDetails} from "vss.ui.utilities/source/applicationdetails.model.ts";

export interface IAppLauncherStripService {
	getData(): ng.IPromise<any>;
}

export class AppLauncherStripService implements IAppLauncherStripService {
	static NAME: string = "AppLauncherStripService";

	private applicationUrl: string;

	/* @ngInject */
	constructor (
		private $q: ng.IQService, 
		private $log: ng.ILogService,
		private $http: ng.IHttpService,
		private AppDetailsService: AppDetailsService, 
		private AuthenticationService: AuthenticationService,
		private APPLAUNCHER_APPLICATIONS_URL,
		private APPLAUNCHER_API_URL
	) {

		this.$log.log("App Launcher Strip Service");

		if (this.AuthenticationService.isAuthenticated()) {
			this.$log.log("Authenticated");
			this.applicationUrl = APPLAUNCHER_API_URL;
		} else {
			this.$log.log("Not Authenticated");
			this.applicationUrl = APPLAUNCHER_APPLICATIONS_URL;
		}
	}

	public getData(): ng.IPromise<any> {
		var deferred = this.$q.defer();
		this.AppDetailsService.getAppDetails().then((response) => {
			this.$log.log(response);
			var responseData = response;
			if(response.length > 3) {
				responseData.pop();
			}
			deferred.resolve(responseData);
		}, (error) => {
			deferred.resolve(error);
		});

		return deferred.promise;
	}
}