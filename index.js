/**
 * @format
 */
import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from "react-redux";
import store from './App/Redux/store';
import Toast from 'react-native-toast-message';

const ReduxApp = () => (
    <Provider store={store}>
       
        <App/>
    </Provider>
)
AppRegistry.registerComponent(appName, () => ReduxApp);
