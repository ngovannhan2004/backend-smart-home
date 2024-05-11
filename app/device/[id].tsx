import React from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from "react-native";
import {useLocalSearchParams} from "expo-router";

interface DeviceDetailProps {

}

const DeviceDetail = (props: DeviceDetailProps) => {
    const {id} = useLocalSearchParams<{ id: string }>();
    return (
        <Text>
            DeviceDetail {id}
        </Text>
    );
};

const styles = StyleSheet.create({});

export default DeviceDetail;
