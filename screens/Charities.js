import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, TextInp, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { logout, selectUser } from '../slices/user';
import { useSelector, useDispatch } from 'react-redux';
import { data } from '../data';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from '@firebase/firestore';
import { db } from '../firebase';
import DropDownPicker from 'react-native-dropdown-picker';


// add dummy charities here. User needs to add and delete charities
const Charities = () => {

    const user = useSelector(selectUser);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [collections, setCollections] = useState([])
    const [allCollections, setAllCollections] = useState([])
    const [category, setCategory] = useState('');
    const [items, setItems] = useState([
        { label: 'Filter', value: '' },
        { label: 'Food', value: 'Food' },
        { label: 'Clothes', value: 'Clothes' },
        { label: 'Money', value: 'Money' },
        { label: 'Other', value: 'Other' },
    ])

    useEffect(() => {
        navigation.setOptions({ title: 'Charities' })
    }, [])

    useEffect(() => {
        if (!user) {
            navigation.replace('Login');
        }
    }, [user])

    useEffect(() => {
        const q = query(collection(db, "users", user?.uid, 'charities'), orderBy('timestamp', 'desc'));
        onSnapshot(q, (snapshot) => {
            const charities = snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }));
            // if (category) {
            //     charities.map((charity) => {
            //         if (charity.data.category === category) {
            //             return charity;
            //         }
            //     })
            //     setCollections(charities);
            // }
            setAllCollections(charities);
        })
    }, [])

    useEffect(() => {
        if (category) {
            setCollections(allCollections.filter((charity) => charity.data.category === category))
        }
        else{
            setCollections(allCollections);
        }
    }, [category, allCollections])

    // console.log('collections', collections);

    const signOut = () => {
        dispatch(logout())
        navigation.replace('Login');
    }

    const deleteOne = async (id) => {
        try {
            const q = doc(db, "users", user?.uid, 'charities', id);
            await deleteDoc(q);
            console.log('deleted', id);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Button style={styles.button} title='Logout' onPress={signOut} />
            <Text> Charities here</Text>
            <Text style={styles.texter}>Email: {user?.email}</Text>
            <DropDownPicker
                value={category}
                setValue={setCategory}
                items={items}
                setItems={setItems}
                open={open}
                setOpen={setOpen}
                style={styles.dropdown}
            />
            <View style={styles.charities}>
                {
                    collections.map(({ id, data: { title, desc, category } }) => (
                        <View key={id} style={styles.charity}>
                            <Image source={require("../assets/hand-logo.jpg")} style={styles.image} />
                            <Text style={styles.texter}>Title: {title}</Text>
                            <Text style={styles.texter}>Description: {desc}</Text>
                            <Text style={styles.texter}>Category: {category}</Text>
                            <Button title="Delete" onPress={() => deleteOne(id)} />
                        </View>
                    ))
                }
            </View>
            <Button title="Add Charity" onPress={() => navigation.navigate('AddCharity')} />
        </ScrollView>
    )
}

export default Charities

const styles = StyleSheet.create({
    charities: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    charity: {
        backgroundColor: 'white',
        padding: 5,
        marginBottom: 15
    },
    image: {
        width: 70,
        height: 70,
    },
    dropdown: {
        margin: 12,
        width: '50%',
    }
});