import { Asset } from "expo-asset";
import { ImageRequireSource } from "react-native";

interface imageType {
  // Assets
  bg_login: ImageRequireSource;
}

const images: imageType = {
  // ASSETS
  bg_login: require("./bg_login.png"),
  
};

// image preloading
export const imageAssets = Object.keys(images).map((key) =>
  Asset.fromModule(images[key as keyof imageType]).downloadAsync()
);
export default images;
