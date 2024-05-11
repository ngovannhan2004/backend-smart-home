import {Animated, ScrollView, StyleSheet, ToastAndroid,} from 'react-native';
import {useLocalSearchParams} from "expo-router";
import React, {useEffect, useState} from "react";
import {UnitI} from "@/app/types/unit";
import {fetchUnits, useUnits} from "@/app/services/unit.service";
import {Picker, View, Text, TextField, Switch} from "react-native-ui-lib";
import {IRoom} from "@/app/types/room";
import {fetchRooms} from "@/app/services/room.service";
import {Button} from "react-native-ui-lib";
import {createDevice} from "@/app/services/device.service";

const AddDeviceForm = () => {
    const {id} = useLocalSearchParams<{ id: string }>();
    const [rooms, setRooms] = useState<IRoom[]>([]);
    const [name, setName] = useState<string>('');
    const [pinMode, setPinMode] = useState<number>(0);
    const [isSensor, setIsSensor] = useState<boolean>(false);
    const [status, setStatus] = useState<boolean>(false);
    const [value, setValue] = useState<number>(0);
    const [image, setImage] = useState<string>('https://cdn-icons-png.flaticon.com/512/1030/1030902.png');
    const [description, setDescription] = useState<string>('');
    const [roomId, setRoomId] = useState<number>(Number(id));
    const [unitId, setUnitId] = useState<number>(0);
    const [units, setUnits] = useState<UnitI[]>([]);
    useEffect(() => {
        fetchUnits().then(data => setUnits(data));
        fetchRooms().then(data => setRooms(data));
    }, []);

    const showToaster = (message: string) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    const handleSubmit = async () => {
        const data = {
            name,
            pinMode: pinMode.toString(),
            isSensor,
            status,
            value,
            image,
            description,
            roomId,
            unitId,
        }
        try {
            await createDevice(data);
            showToaster('Device created successfully');
        }
        catch (e: any) {
            showToaster(e.message);
        }
    }
    return (
        <View backgroundColor={'#fff'} style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="always">
                <View flex paddingV-10 backgroundColor={'#fff'}>
                    <Picker
                        color={'#000'}
                        label={'Choose Room'}
                        value={
                            roomId
                        }
                        showSearch
                        onChange={
                            (item) => {
                                setRoomId(Number(item));
                            }
                        }
                    >
                        {rooms.map(room => (
                            <Picker.Item key={room.id} value={room.id} label={room.name}/>
                        ))}
                    </Picker>
                </View>
                <View flex paddingV-10 backgroundColor={'#fff'}>
                    <Picker
                        label={'Choose Unit'}
                        value={unitId}
                        onChange={
                            (item) => {
                                setUnitId(Number(item));
                            }
                        }
                    >
                        {units.map(unit => (
                            <Picker.Item key={unit.id} value={unit.id} label={` ${unit.name} - ${unit.abbreviation}`}/>
                        ))}
                    </Picker>

                </View>
                <View>
                    <Text>Name</Text>
                    <TextField
                        onChangeText={text => setName(text)}
                        value={name}
                        style={styles.input}
                        validate={['required']}
                        validationMessage={['Field is required']}
                        enableErrors
                    />
                </View>

                <View>
                    <Text>Pin Mode</Text>
                    <TextField
                        onChangeText={text => setPinMode(Number(text))}
                        value={pinMode.toString()}
                        style={styles.input}
                        validate={['required']}
                        validationMessage={['Field is required']}
                        enableErrors
                    />
                </View>

                <View>
                    <Text>Value</Text>
                    <TextField
                        onChangeText={text => setValue(Number(text))}
                        value={value.toString()}
                        style={styles.input}
                        validate={['required']}
                        validationMessage={['Field is required']}
                        enableErrors
                    />
                </View>

                <View>
                    <Text>Image</Text>
                    <TextField
                        onChangeText={text => setImage(text)}
                        value={image}
                        style={styles.input}
                        validate={['required']}
                        validationMessage={['Field is required']}
                        enableErrors
                    />
                </View>
                <View>
                    <Text>Description</Text>
                    <TextField
                        onChangeText={text => setDescription(text)}
                        value={description}
                        style={styles.input}
                        validate={['required']}
                        validationMessage={['Field is required']}
                        enableErrors
                    />
                </View>

                <View flex paddingV-10 style={styles.switch}>
                    <View>
                        <Text>Is Sensor</Text>
                        <Switch
                            value={isSensor}
                            onValueChange={value => setIsSensor(value)}
                        />

                    </View>

                    <View>
                        <Text>Status</Text>
                        <Switch
                            value={status}
                            onValueChange={value => setStatus(value)}
                        />
                    </View>

                </View>
                <View style={styles.action}>
                    <Button label="Add Device" style={styles.submitButton} onPress={handleSubmit}/>
                </View>
            </ScrollView>
        </View>

    );
}
export default AddDeviceForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',

    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,

    },
    action: {
        marginTop: 5,
        alignItems: 'center',
    },
    submitButton: {
        marginTop: 20,
        textAlign: 'center',
    },
    switch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    }

});