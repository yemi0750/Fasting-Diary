import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import Home from './component/home.js';
import NewEvent from './component/newevent.js';
import EventList from './component/eventlist.js';
import EditEvent from './component/editevent.js';
import DeleteEvent from './component/deleteevent.js';
import DailyTodo from './component/dailytodo.js';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Home} options={{ headerStyle: { elevation: 0, shadowOpacity: 0, }, headerTitle: '단식 기록장', cardStyle:{backgroundColor: '#ffffff'} }}/>
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