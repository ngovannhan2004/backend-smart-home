import React, { useState } from 'react';
import { Pressable, StyleSheet } from "react-native";
import {  Text, View, Switch, Drawer, GridListItem, Image, ProgressBar } from 'react-native-ui-lib';
import { Link } from "expo-router";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { updateDevice } from "@/app/services/device.service";
import {IDevice} from "@/app/types/device";

interface DeviceItemListProps {
    device: IDevice;
}

const color = {
    enable: "#2566DC",
    disable: "#FFFFFF",
};
const textColors = {
    enable: "#FEFCFC",
    disable: "#5b629b",
}
const colorBorder = {
    enable: "#4b7eda",
    disable: "#c2bcbc",
};

const DeviceListItem = ({ device }: DeviceItemListProps) => {
    const [isEnabled, setIsEnabled] = useState(device.status);
    const backgroundColor = useSharedValue(isEnabled ? color.enable : color.disable);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: backgroundColor.value,
        };
    });

    const toggleSwitch = async () => {
        try {
            await updateDevice(device.id, !isEnabled);
            setIsEnabled(!isEnabled);
            backgroundColor.value = withTiming(isEnabled ? color.disable : color.enable, {
                duration: 250,
            });
        }
        catch (e) {
            console.error(e)
        }

    };

    return (
        <Animated.View
            style={[styles.container, animatedStyles, { borderColor: isEnabled ? colorBorder.disable : colorBorder.enable }]}>
            <Pressable style={styles.topSection}>
                <Image
                    source={{ uri: device.image }}
                    style={{ width: 50, height: 50, borderRadius: 25 }} // Sửa ở đây
                />

                {!device.isSensor && (
                    <Switch
                        onColor={color.disable}
                        offColor={color.enable}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                        thumbStyle={{
                            width: 20,
                            height: 20,
                            backgroundColor: isEnabled ? color.enable : color.disable,
                        }}

                    />
                )}
            </Pressable>
            <Link href={`/device/${device.id}`}>
                <View style={styles.bottomSection}>
                    <Text style={[styles.deviceName, { color: isEnabled ? textColors.enable : textColors.disable }]}>
                        {device.name}
                    </Text>
                    <Text style={[styles.deviceDetails, { color: isEnabled ? textColors.enable : textColors.disable }]}>
                        {device.room.name}
                    </Text>
                    <Text style={[styles.deviceDetails, { color: isEnabled ? textColors.enable : textColors.disable }]}>
                        {device.value} {device.unit.abbreviation}
                    </Text>

                </View>
            </Link>
        </Animated.View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 16,
        padding: 10,
        margin: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 0.4,
        maxWidth: '49%',
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10, // Space between top and bottom sections
    },
    bottomSection: {
        flex: 1,
    },
    deviceName: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    deviceDetails: {
        fontSize: 13,
        marginTop: 5,
    },
    description: {
        marginTop: 5,
        fontSize: 10,
    },


});

export default DeviceListItem;
