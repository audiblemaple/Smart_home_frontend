const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver = {
	...config.resolver,
	assetExts: [...config.resolver.assetExts, "obj", "png", "jpg", "jpeg", "gltf"],
};

module.exports = config;
