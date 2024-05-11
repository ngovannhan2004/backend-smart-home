import React from 'react';
import {StyleSheet} from "react-native";
import {Tabs} from "expo-router";
import {FontAwesome } from '@expo/vector-icons';
const LayoutMain = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index"  options={{
                title: 'Device',
                tabBarIcon: ({focused, color, size}) => (
                    <FontAwesome name="home" size={size} color={color}/>
                ),
            }}/>

                <Tabs.Screen name="home"  options={{
                title: 'Voice',
                tabBarIcon: ({focused, color, size}) => (
                    <FontAwesome name="microphone" size={size} color={color}/>
                ),
            }}/>
        </Tabs>

        

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

export default LayoutMain;
