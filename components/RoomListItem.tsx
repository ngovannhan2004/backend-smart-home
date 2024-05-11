import React, {useState} from 'react';
import {FlatList, Pressable, RefreshControl, StyleSheet, Text, View, Button, TouchableOpacity} from "react-native";
import Animated, {useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated';
import DeviceListItem from "./DeviceListItem";
import {IRoom} from "@/app/types/room";
import {Link} from "expo-router";

export const RoomListItem = ({room}: { room: IRoom }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    return (
        <Animated.View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.title}>{room.name}</Text>
                <Link href={`/room/add/${room.id}`}>
                    <View style={styles.addDeviceView}>
                        <Text style={styles.addDevice}>Add Device</Text>
                    </View>
                </Link>
            </View>
            <FlatList
                numColumns={2}
                data={room.devices} renderItem={({item}) => <DeviceListItem device={item}/>}
                keyExtractor={(item) => item.id.toString()}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    addDeviceView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        padding: 5,
        borderRadius: 4,
    },
    addDevice: {
        fontSize: 13,
        color: '#fff',
    },
    description: {
        fontSize: 16,
    },
});