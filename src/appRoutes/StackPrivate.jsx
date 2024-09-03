import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EditPost from '../pages/EditPost';
import PostDetail from '../pages/PostDetail';
import CreatePost from '../pages/CreatePost';
import CreateSkill from '../pages/CreateSkill';
import AuthorPost from '../pages/AuthorPosts';
import { TabPrivate } from './TabPrivate.jsx';
import Home from '../pages/Home.jsx';

const { Navigator, Screen } = createStackNavigator();

export const StackPrivate = () => (
  <Navigator>
    <Screen name="RouteTabPrivate" component={TabPrivate} options={{ headerShown: false }} />
    <Screen name="EditPost/:id" component={EditPost} options={{ headerShown: false }} />
    <Screen name="PostDetail/:id" component={PostDetail} options={{ headerShown: false }} />
    <Screen name="CreateSkill" component={CreateSkill} options={{ headerShown: false }} />

  </Navigator>
);
