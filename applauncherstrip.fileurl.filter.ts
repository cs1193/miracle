export class AppLauncherStripFileUrlFilter {
	static NAME: string = "AppLauncherStripFileUrl";

	public static factory(): Function {
		return (input: string) => {
			var fileName = angular.lowercase(input);
			fileName = fileName.replace(/\s+/g, '-');
			fileName = "applauncherstripcontext/" + fileName + ".html";
			return fileName;
		};
	};
}