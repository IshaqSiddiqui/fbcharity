import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import Charities from "../screens/Charities";
import DonateScreen from "../screens/DonateScreen";
import PaymentScreen from "../screens/PaymentScreen";
import AddCharityScreen from "../screens/AddCharityScreen";
import SignUp from "../screens/Signup";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const PaymentNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Donate" component={DonateScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
        </Stack.Navigator>
    )
}

const Collections = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Collections" component={Charities} />
            <Stack.Screen name="Donate" component={DonateScreen} />
            <Stack.Screen name="AddCharity" component={AddCharityScreen} />
        </Stack.Navigator>
    )
}



const HomeTabs = () => {
    return (
        <Tab.Navigator >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="DonateNav" component={PaymentNav} options={{
                headerShown: false,
                tabBarLabel: 'Donate',
            }} />
            <Tab.Screen name="Charities" component={Collections} options={{
                headerShown: false,
                tabBarLabel: 'Collections',
            }} />

        </Tab.Navigator>
    )
}

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignUp} />
                <Stack.Screen name="HomeTabs" component={HomeTabs} options={{
                    headerShown: false
                }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation