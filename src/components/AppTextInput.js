import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView} from 'react-native';
import themes from '../styles/themes';


const AppTextInput = (props) => {
    return(
        <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        style={themes.styles.textInput}
        autoCapitalize="none" 
        placeholder={props.placeholder}
        />
    );
}

AppTextInput.defaultProps = {
    placeholder: '',
  };

export default AppTextInput;