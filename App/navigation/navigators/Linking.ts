import { getStateFromPath } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { useAuthService } from "@App/ducks/hooks";

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
  const { onSignUpSuccess } = useAuthService()
  
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

      if (path.includes("#")) {
        const fragment = path.split('#')[1];

        // Use URLSearchParams to parse the fragment string
        const params = new URLSearchParams(fragment);
  
        // Access individual parameters
        const accessToken = params.get('access_token');
        if (accessToken) {
          onSignUpSuccess({ access_token: accessToken } as any)
        }
      }

      return getStateFromPath(path, config);
    },
  };
};

export default linking;
