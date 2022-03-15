import { Dimensions } from "react-native";

export  const screen_height = Dimensions.get('window').height;
export const screen_width = Dimensions.get('window').width;
export const initialState={
    error:'',
    isLoading:'',
    data:[],
    message:''
}