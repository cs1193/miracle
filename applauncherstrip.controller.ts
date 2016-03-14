import {AppLauncherStripService} from "./applauncherstrip.service.ts";

export class AppLauncherStripController {
	static NAME: string = "AppLauncherStripController";

	private applicationData: Object[];

	/*@ngInject*/
	constructor(
		private $log: ng.ILogService,
		private $rootScope: ng.IRootScopeService,
		private $modal: ng.ui.bootstrap.IModalService,
		private AppLauncherStripService: AppLauncherStripService
	) {	
		this.$log.log("App Launcher Strip Controller");

		this.AppLauncherStripService.getData().then((response) => {
			this.applicationData = response;
		}, (error) => {
			this.$log.error(error);
		});
	}

}
