import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from "react-navigation";

import LoginPage from './src/pages/LoginPage.js';
import QuizPage from './src/pages/QuizPage.js';

export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const AppNavigator = createStackNavigator({
  Login: LoginPage,
  Quiz: QuizPage,
}, {
    initialRouteName: "Login",
});

const AppContainer = createAppContainer(AppNavigator);
