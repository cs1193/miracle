import {WelcomeRouteConfiguration} from "./welcome.routing.ts";
import {WelcomeController} from "./welcome.controller.ts";
import {AppLauncherStripDirective} from "./applauncherstrip.directive.ts";
import {AppLauncherStripController} from "./applauncherstrip.controller.ts";
import {AppLauncherStripService} from "./applauncherstrip.service.ts";
import {AppLauncherStripImageUrlFilter} from "./applauncherstrip.image.filter.ts";
import {AppLauncherStripUrlFilter} from "./applauncherstrip.url.filter.ts";
import {AppLauncherStripFileUrlFilter} from "./applauncherstrip.fileurl.filter.ts";
var ngRouteModule = require("angular-route");
var uiBootstrapModule = require("angular-ui-bootstrap");

require("!!ngtemplate?relativeTo=/source/welcome/!html!./applauncherstripcontext/vl-unified-fleet.html");
require("!!ngtemplate?relativeTo=/source/welcome/!html!./applauncherstripcontext/vl-legacy.html");
require("!!ngtemplate?relativeTo=/source/welcome/!html!./applauncherstripcontext/vl-landfill.html");

export default angular.module('welcome', [ngRouteModule, uiBootstrapModule])
	.service(AppLauncherStripService.NAME, AppLauncherStripService)
	.controller(AppLauncherStripController.NAME, AppLauncherStripController)
	.directive(AppLauncherStripDirective.NAME, AppLauncherStripDirective.factory)
	.controller(WelcomeController.NAME, WelcomeController)
	.filter(AppLauncherStripImageUrlFilter.NAME, AppLauncherStripImageUrlFilter.factory)
	.filter(AppLauncherStripUrlFilter.NAME, AppLauncherStripUrlFilter.factory)
	.filter(AppLauncherStripFileUrlFilter.NAME, AppLauncherStripFileUrlFilter.factory)
	.config(WelcomeRouteConfiguration)
	.name;