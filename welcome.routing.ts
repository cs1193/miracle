import {WelcomeController} from "./welcome.controller.ts";
import {CheckFederationRouteResolver} from "vss.uicore.authentication/source/checkfederation.routeresolver.ts";

/*@ngInject*/
export function WelcomeRouteConfiguration($routeProvider: ng.route.IRouteProvider) {

	let WelcomeConfiguration: Object = {
		template: require("./welcome.html"),
		controller: WelcomeController.NAME,
		controllerAs: "vm",
		resolve: {
			checkFederation: CheckFederationRouteResolver
		},
		name: "Welcome"
	};

	$routeProvider.when("/welcome", WelcomeConfiguration);
}