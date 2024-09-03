import { useEffect } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import LottieView from 'lottie-react-native' 

export const SplashScreen = ({ navigation }) => {
 
  useEffect(() => {
    setTimeout(() => {navigation.navigate("Login");}, 3000); }, []);

  return (

    <View style={styles.container}>
     <LottieView source={require('../assets/Animation - 1725373262103.json')} autoPlay={true} style={{  height: 400, width: 400, alignItems: 'center', justifyContent: 'center'}}/>

    </View>
    )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column"
  },
});