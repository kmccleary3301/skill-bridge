//import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import AppContent from './AppContent';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => AppContent);
