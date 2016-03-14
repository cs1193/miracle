export class AppLauncherStripImageUrlFilter {
	static NAME: string = "AppLauncherStripImageUrl";

	public static factory(): Function {
		return (input: string, enabled: boolean) => {
			let imageUrl = input;
			if(enabled) {
				imageUrl += "splash.png";
			} else {
				imageUrl += "splash_info.png";				
			}
			return imageUrl;
		};
	};
}