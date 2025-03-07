import { getStateFromPath } from "@react-navigation/native";
import * as Linking from "expo-linking";

const prefix = Linking.createURL("/");
const config: any = {
  // screens: {
  //   MainNavigators: '',
  //   DrawerNavigator: 'management',
  //   Dashboard: 'dashboard',
  //   Tasks: 'tasks',
  //   Home: "users",
  // },
  screens: {
    MainNavigators: '',
    Login: 'login',
    DashboardDrawerNavigator: 'dashboard',
    Dashboard: 'tasks',
    // Tasks: 'tasks',
    Users: "users",
  },
};
const linking = () => {

  return {
    prefixes: [prefix],
    config,
    async getInitialURL() {
      const url = await Linking.getInitialURL();
  
      if (url != null) {
        return url;
      }

      return await Linking.getInitialURL();
    },
    // subscribe(listener: any) {
    //   const onReceiveURL = ({ url }: { url: string }) => listener(url);
    //   const subscription = Linking.addEventListener("url", onReceiveURL);
  
    //   return () => subscription.remove();
    // },
  
    getStateFromPath: (path: string) => {

      return getStateFromPath(path, config);
    },
  };
};

export default linking;
