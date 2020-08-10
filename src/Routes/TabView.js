import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, TabBar, Tab, Text} from '@ui-kitten/components';
import OurDaily from '../Screen/Timeline/OurDaily';
import Content from '../Screen/Timeline/Content';
import News from '../Screen/Timeline/News';
import Event from '../Screen/Timeline/Event';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import {Color} from '../Themes/Colors';
import {FontType} from '../Themes/Fonts';

const {Navigator, Screen} = createMaterialTopTabNavigator();

// const TopTabBar = ({navigation, state, props}) => {
//   const navigator = useNavigation();
//   return (
//     <TabBar
//       selectedIndex={state.index}
//       onSelect={index => navigator.navigate(state.routeNames[index])}
//       style={{
//         paddingTop: 20,
//         paddingBottom: 10,
//         marginBottom: -4,
//         paddingHorizontal: 5,
//       }}
//       indicatorStyle={style.indicator}>
//       <Tab title={evaProps => <Text {...evaProps}>Content</Text>} />
//       <Tab title="News" />
//       <Tab title="Event" />
//       <Tab title="Our Daily" />
//       <TouchableOpacity
//         style={{marginRight: -40, marginLeft: 15}}
//         onPress={() => navigation.navigate('SearchTimeline')}>
//         <Icon fill="#8F9BB3" name="search" style={style.icon} />
//       </TouchableOpacity>
//     </TabBar>
//   );
// };

// const TabNavigation = () => {
//   return (
//     <Navigator
//       tabBar={props => <TopTabBar {...props} />}
//       tabBarOptions={{
//         showIcon: false,
//         activeTintColor: textBold,
//         inactiveTintColor: textHint,
//       }}>
//       <Screen name="Content" component={Content} />
//       <Screen name="News" component={News} />
//       <Screen name="Event" component={Event} />
//       <Screen name="Our Daily" component={OurDaily} />
//     </Navigator>
//   );
// };

// const Search = () => {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Settings!</Text>
//     </View>
//   );
// };

const TabNavigation = () => {
  return (
    <Navigator
      scrollEnabled={true}
      tabBarOptions={{
        showIcon: false,
        activeTintColor: Color.bgColor,
        inactiveTintColor: Color.textLightHint,
        labelStyle: {
          fontSize: 13,
          fontFamily: FontType.semiBold,
          textTransform: 'capitalize',
        },
        style: {
          elevation: 0,
          paddingTop: 5,
          paddingBottom: 0,
          marginBottom: 2,
          paddingHorizontal: 5,
          fontWeight: 'bold',
        },
        indicatorStyle: {
          backgroundColor: 'transparent',
          fontWeight: 'bold',
        },
      }}>
      <Screen name="Content" component={Content} />
      <Screen name="News" component={News} />
      <Screen name="Our Daily" component={OurDaily} />
      <Screen name="Event" component={Event} />
    </Navigator>
  );
};

export default function TabNavigator() {
  return (
    <>
      <TabNavigation />
    </>
  );
}

const style = StyleSheet.create({
  indicator: {
    backgroundColor: 'transparent',
  },
  icon: {
    marginRight: -100,
    width: 27,
    height: 27,
  },
});
