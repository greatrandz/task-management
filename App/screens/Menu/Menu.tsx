import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { IconButton } from 'react-native-paper';
import { useNavigationState } from '@react-navigation/native';
import useStyles from './Styles'
import { useMenuContext } from './MenuProvider';

const Menu = (props: any) => {
  const styles = useStyles()
  const { onSignOut } = useMenuContext()
  const navigationState = useNavigationState((state) => state); // Get the current navigation state

  const isActive = (routeName: string) => {
    const selectedIndex = navigationState?.routes[navigationState.index]?.state?.index ?? 0
    if (navigationState?.routes[navigationState.index]?.state?.routeNames) {
      const index = navigationState?.routes[navigationState.index]?.state?.routeNames?.findIndex(item => item === routeName)
      return index === selectedIndex
    }
    return (routeName === "Dashboard");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>John Doe</Text>
      </View>

      {/* Dashboard Drawer Item */}
      <DrawerItem
        label="Dashboard"
        onPress={() => props.navigation.navigate('Dashboard')}
        icon={() => (
          <IconButton
            icon="view-dashboard"
            size={24}
          />
        )}
        style={isActive('Dashboard') ? styles.activeDrawerItem : styles.inactiveDrawerItem}
      />

      {/* Users Drawer Item */}
      <DrawerItem
        label="Users"
        onPress={() => props.navigation.navigate('Users')}
        icon={() => (
          <IconButton
            icon="account"
            size={24}
          />
        )}
        style={isActive('Users') ? styles.activeDrawerItem : styles.inactiveDrawerItem}
      />

      {/* Settings Drawer Item */}
      <DrawerItem
        label="Log Out"
        onPress={onSignOut}
        icon={() => (
          <IconButton
            icon="logout"
            size={24}
          />
        )}
        style={isActive('Settings') ? styles.activeDrawerItem : styles.inactiveDrawerItem}
      />
    </DrawerContentScrollView>
  );
};

export default Menu;
