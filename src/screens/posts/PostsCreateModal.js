import React, { useContext, useState } from 'react';
import { View, Modal, TextInput, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PrimaryButton from '../../components/PrimaryButton';
import AppTextInput from '../../components/AppTextInput';
import { colors } from '../../styles/colors';
import PostContext from '../../store/post_context';
import { Picker } from '@react-native-picker/picker';


const PostsCreateModal = (props) => {
    const [message, setMessage] = useState('');
    const [location, setLocation] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [status, setStatus] = useState('published');

    const postCTx = useContext(PostContext)

    const validateInputValues = () => {
        if (!message || !location) {
            alert('Porfavor ingresa todos los campos');
            return;
        }

        if (location.length < 3 || location.length > 20) {
            alert(`Ubicacion debe ser entre 3 y 20 caracteres`);
            return;
        }

        if (message.length < 10 || message.length > 500) {
            alert(`Mensaje debe ser entre 10 y 500 caracteres`);
            return;
        }

        createPost()
    }

    const createPost = () => {
        const date = new Date()
        const post = {
            image: imageUrl,
            message: message,
            likes: [],
            author: postCTx.user,
            create_at: date.toISOString(),
            status: 'published'
        }
        postCTx.newPost(post)
        clearValues()
        props.setVisible(false)
    };

    const clearValues = () => {
        setMessage('')
        setLocation('')
        setImageUrl('')
        setStatus('published')
    }

    const closeModal = () => {
        clearValues()
        props.setVisible(false)
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.closeButtonContainer}>
                            <TouchableOpacity onPress={closeModal}>
                                <AntDesign name="closecircleo" size={32} color="#8F21AD" />
                            </TouchableOpacity>
                        </View>
                        <Text
                            style={styles.modalTitle}>
                            Nueva Publicación
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
                        <View
                            style={styles.pickerContainer}>
                            <Picker
                                selectedValue={status}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}>
                                <Picker.Item label="Published" value="published" />
                                <Picker.Item label="Drafted" value="drafted" />
                                <Picker.Item label="Deleted" value="deleted" />
                            </Picker>
                        </View>
                        <PrimaryButton
                            onPress={validateInputValues}
                            title={"Crear Publicación"}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
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
    pickerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.purple,
        height: 50,
        width: '100%'
    },
    picker: {
        height: 50,
        width: '100%',
    },
});

export default PostsCreateModal;