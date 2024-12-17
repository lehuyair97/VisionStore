const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function withSplashScreenColor(config) {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults.manifest;

    if (androidManifest.application) {
      const colorsXml = config.modResults.modRequest.projectRoot + "/android/app/src/main/res/values/colors.xml";
      const fs = require('fs');
      if (!fs.existsSync(colorsXml)) {
        fs.writeFileSync(colorsXml, `
          <resources>
            <color name="splashscreen_background">#FFFFFF</color> <!-- Default color, change if needed -->
          </resources>
        `);
      }

      const splashScreenColor = '@color/splashscreen_background';
      const splashScreenIndex = androidManifest.application[0]["meta-data"]?.findIndex(
        (item) => item.$["android:name"] === "com.splashscreen.backgroundColor"
      );

      if (splashScreenIndex === -1) {
        const colorMetaData = {
          $: {
            "android:name": "com.splashscreen.backgroundColor",
            "android:resource": splashScreenColor,
            "tools:replace": "android:resource"
          }
        };
        androidManifest.application[0]["meta-data"].push(colorMetaData);
      }
    }

    return config;
  });
};
