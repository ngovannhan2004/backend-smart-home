import React, {useState} from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    ToastAndroid
} from "react-native";
import {Button, TextField} from "react-native-ui-lib";
import {createRoom} from "@/app/services/room.service";

export default function AddRoom() {

    const showToaster = (message: string) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    const handleSubmit = async () => {
        const data = {
            name: name,
            description: description,
        }
        console.log(data)
        try {
            await createRoom(data);
            showToaster('Room created successfully');
        } catch (e: any) {
            showToaster(e.message);
        }

    }
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    return (
        <View style={styles.container}>
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

            <View style={styles.action}>
                    <Button label="Add Room" style={styles.submitButton} onPress={handleSubmit}/>
            </View>


        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
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
    }
});