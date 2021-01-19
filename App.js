import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import Home from './component/home.js';
import Info from './component/info.js';
import InfoHow from './component/infohow.js';
import NewEvent from './component/newevent.js';
import EventList from './component/eventlist.js';
import EditEvent from './component/editevent.js';
import DeleteEvent from './component/deleteevent.js';
import DailyTodo from './component/dailytodo.js';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function InfoTab() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === '생활단식') {
          iconName = 'home';
        } else if (route.name === '단식 방법') {
          iconName = 'map';
        }
        return <Icon name={iconName} size={23} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#4174D9',
      inactiveTintColor: 'gray',
    }}>
      <Tab.Screen name="생활단식" component={Info} />
      <Tab.Screen name="단식 방법" component={InfoHow} />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Home} options={{ headerStyle: { elevation: 0, shadowOpacity: 0, }, headerTitle: '단식 기록장', cardStyle:{backgroundColor: '#ffffff'} }}/>
      <Stack.Screen name="InfoTab" component={InfoTab} options={{ headerStyle: { elevation: 0, shadowOpacity: 0, }, headerTitle: '단식이란?', cardStyle:{backgroundColor: '#ffffff'} }}/>
      <Stack.Screen name="NewEvent" component={NewEvent} options={{ headerStyle: { elevation: 0, shadowOpacity: 0, }, headerTitle: '단식 일정 추가', cardStyle:{backgroundColor: '#ffffff'}}} />
      <Stack.Screen name="EventList" component={EventList} options={{ headerStyle: { elevation: 0, shadowOpacity: 0, }, headerTitle: '단식 일정 목록', cardStyle:{backgroundColor: '#ffffff'}}} />
      <Stack.Screen name="EditEvent" component={EditEvent} options={{ headerStyle: { elevation: 0, shadowOpacity: 0, }, headerTitle: '단식 일정 수정', cardStyle:{backgroundColor: '#ffffff'}}} />
      <Stack.Screen name="DeleteEvent" component={DeleteEvent} options={{ headerStyle: { elevation: 0, shadowOpacity: 0, }, headerTitle: '단식 일정 삭제', cardStyle:{backgroundColor: '#ffffff'}}} />
      <Stack.Screen name="DailyTodo" component={DailyTodo} options={{ headerStyle: { elevation: 0, shadowOpacity: 0, }, headerTitle: '오늘의 단식', cardStyle:{backgroundColor: '#ffffff'}}} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}