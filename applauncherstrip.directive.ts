import {AppLauncherStripController} from "./applauncherstrip.controller.ts";

export class AppLauncherStripDirective {
	static NAME: string = "appLauncherStrip";

	/* @ngInject */
	static factory(): ng.IDirective {

		function link (scope: ng.IScope, element: ng.IAugmentedJQuery, attr: ng.IAttributes, $window: ng.IWindowService) {

		}

		let directive = {
			restrict: "E",
			link: link,
			template: require("./applauncherstrip.html"),
			replace: true,
			scope: {},
			controller: AppLauncherStripController,
			controllerAs: "alsc",
			bindToController: true
		};

		return directive;
	}
}