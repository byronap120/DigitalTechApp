import React, { useState } from 'react';
import { View, Modal, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PrimaryButton from '../../components/PrimaryButton';
import AppTextInput from '../../components/AppTextInput';
import { colors } from '../../styles/colors';

const PostsCreateModal = (props) => {
    const [message, setMessage] = useState('');
    const [location, setLocation] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = () => {
        console.log("crate post")
    };

    const closeModal = () => {
        props.setVisible(false)
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.closeButtonContainer}>
                        <TouchableOpacity onPress={closeModal}>
                            <AntDesign name="closecircleo" size={32} color="#8F21AD" />
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={styles.modalTitle}>
                        Crear un Post nuevo
                    </Text>
                    <TextInput
                        value={message}
                        onChangeText={setMessage}
                        style={styles.input}
                        multiline={true}
                        numberOfLines={6}
                        textAlignVertical='top'
                        placeholder="Mensaje..."
                    />
                    <AppTextInput
                        value={location}
                        onChangeText={setLocation}
                        placeholder={"Ubicacion"}
                    />
                    <AppTextInput
                        value={imageUrl}
                        onChangeText={setImageUrl}
                        placeholder={"Imagen Url"}
                    />
                    <PrimaryButton
                        onPress={handleSubmit}
                        title={"Crear Post"}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        paddingTop: 70,
        alignItems: 'center',
        elevation: 5,
        width: '90%',
        height: '90%'
    },
    input: {
        borderColor: colors.purple,
        borderWidth: 1,
        borderRadius: 4,
        width: '100%',
        padding: 8,
        marginBottom: 16,
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
    modalTitle: {
        fontSize: 24,
        color: 'black',
        marginBottom: 24,
        marginTop: 12
    },
});

export default PostsCreateModal;