import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {RoomListItem} from "@/components/RoomListItem";
import {useRooms} from '../services/room.service';
import {Button, Icon} from "react-native-ui-lib";
import {Link} from "expo-router";

const Home = () => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const {data: rooms, error, isLoading, refetch} = useRooms();

    const onRefresh = async () => {
        setIsRefreshing(true);
        await refetch();
        setIsRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.floatingButton}>
                <Link href={'/modals/add-room'}>
                    <Text style={styles.floatingButtonText}>+</Text>
                </Link>
            </TouchableOpacity>


            <FlatList
                data={rooms} renderItem={({item}) => <RoomListItem room={item}/>}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    floatingButton: {
        backgroundColor: 'blue',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        elevation: 8, // Để nổi button trên Android
        shadowColor: '#000', // và iOS
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 10,
    },
    floatingButtonText: {
        color: 'white',
        fontSize: 24,
    },

});

export default Home;
