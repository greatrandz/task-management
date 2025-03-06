import * as React from 'react'
import { Platform, Image } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Menu from '../../../../screens/Menu'
import Dashboard from '../../../../screens/Dashboard'

import { ParamList, Screen } from '../../../routes/tabRoutes'
import { Colors } from '../../../../styles'
import { images } from '../../../../constants'
import Apps from '../../../../../Apps'
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();


const MenuNavigator = () => (
  <Stack.Navigator>
      <Stack.Screen   name={Screen.Menu} component={Dashboard}
                      options={{
                        headerShown:false,
                      }}
      />
  </Stack.Navigator>
)

const ProfileNavigator = () => (
  <Stack.Navigator>
      <Stack.Screen   name={Screen.Profile} component={Dashboard}
                      options={{
                        headerShown:false,
                      }}
      />
  </Stack.Navigator>
)

const ContentsNavigator = () => (
  <Stack.Navigator>
    <Stack.Group screenOptions={{ headerShown: false, presentation: 'modal' }}>
      <Stack.Screen   name={Screen.Home} component={Dashboard} 
                        options={{
                          headerShown:false,
                        }}
        />
    </Stack.Group>
  </Stack.Navigator>
)

const LocationsNavigator = () =>(
  <Stack.Navigator>
      <Stack.Screen   name={Screen.Locations} component={Dashboard} 
                      options={{
                        headerShown:false,
                      }}
      />
  </Stack.Navigator>
)  

const MainNavigator = () => (
  <Tab.Navigator screenOptions={{
                        headerShown: false,
                        tabBarInactiveTintColor: Colors.whiteOpacity,
                        tabBarActiveTintColor: Colors.darkBrown,
                        tabBarStyle: { backgroundColor: Colors.black },
                      }}>
      <Tab.Screen name="Tasks" component={Dashboard} 
                  options={{
                    tabBarIcon: ({ color }) => (
                      <Image style={{ tintColor: color, top: 2, width: 20, height: 20}} />
                    )
                  }}
      />
      <Tab.Screen name="Profile" component={Dashboard} 
                  options={{
                    tabBarIcon: ({ color }) => (
                      <Image style={{ tintColor: color, top: 2, width: 24, height: 24}} />
                    )
                  }}
      />
      <Tab.Screen name="Locations" component={Dashboard} 
                  options={{
                    tabBarIcon: ({ color }) => (
                      <Image style={{ tintColor: color, top: 2, width: 24, height: 24}} />
                    )
                  }}
      />
      <Tab.Screen name="More.." component={Dashboard} 
                  options={{
                    tabBarIcon: ({ color }) => (
                      <Image style={{ tintColor: color, top: 2, width: 20, height: 20}} />
                    )
                  }}
      />
  </Tab.Navigator>
)

export default MainNavigator