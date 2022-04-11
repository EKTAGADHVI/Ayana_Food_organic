import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
// NetInfo.fetch().then(state => {
//   console.log("Connection type", state.type);
//   console.log("Is connected?", state.isConnected);
//   if(sta)
// });
const instance = axios.create({
 
  baseURL: 'https://ayanafoodorganic.com/api',

});

export default instance;