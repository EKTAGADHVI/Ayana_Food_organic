import { Dimensions } from "react-native";

export  const screen_height = Dimensions.get('screen').height;
export const screen_width = Dimensions.get('screen').width;
export const initialState={
    error:'',
    isLoading:'',
    data:[],
    message:''
}