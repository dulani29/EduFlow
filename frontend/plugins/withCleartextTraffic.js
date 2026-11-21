const { withAndroidManifest } = require('expo/config-plugins');

module.exports = function withCleartextTraffic(config) {
  return withAndroidManifest(config, (config) => {
    const application = config.modResults.manifest.application?.[0];

    if (!application) {
      throw new Error('Android manifest application is missing.');
    }

    application.$['android:usesCleartextTraffic'] = 'true';
    return config;
  });
};
