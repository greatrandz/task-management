export enum Screen {
    Profile = 'Profile',
    Home = 'Home',
    Locations = 'Locations',
    Menu = 'Menu',
  }
  
  export type ParamList = {
    [Screen.Profile]: { index: 0, },
    [Screen.Home]: { index: 1, },
    [Screen.Locations] : { index : 2,},
  }
  