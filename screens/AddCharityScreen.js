import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/user';
import DropDownPicker from 'react-native-dropdown-picker';

const AddCharityScreen = () => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [items, setItems] = useState([
        { label: 'Food', value: 'Food' },
        { label: 'Clothes', value: 'Clothes' },
        { label: 'Money', value: 'Money' },
        { label: 'Other', value: 'Other' },
    ])
    const [open, setOpen] = useState(false)


    const user = useSelector(selectUser);

    const addOne = async () => {
        // add charity to db
        try {
            await addDoc(collection(db, "users", user.uid, 'charities'), {
                title,
                desc,
                category,
                timestamp: serverTimestamp(),
            });
            setTitle('');
            setDesc('');
            setCategory('');
            Alert.alert(`${title} added successfully`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            <TextInput style={styles.input} placeholder='Title' value={title} onChangeText={text => setTitle(text)} />
            <TextInput style={styles.input} placeholder='Description' value={desc} onChangeText={text => setDesc(text)} />
            <DropDownPicker
                value={category}
                setValue={setCategory}
                items={items}
                setItems={setItems}
                open={open}
                setOpen={setOpen}
                style={styles.dropdown}
            />
            <Button title="Add" onPress={addOne} />
        </View>
    )
}

export default AddCharityScreen

const styles = StyleSheet.create({
    input:{
        margin: 12,
        borderWidth: 1,
        padding: 10,
        paddingVertical:15,
        backgroundColor: 'white',
        borderRadius:8
    },
    dropdown:{
        margin: 12,
        width: '93%',
    }
})