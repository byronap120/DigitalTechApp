import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../../../src/screens/login/LoginScreen';
import { Platform } from 'react-native';

describe('LoginScreen', () => {
  it('updates username correctly', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    const usernameInput = getByPlaceholderText('Username');
    fireEvent.changeText(usernameInput, 'johndoe');
    expect(usernameInput.props.value).toBe('johndoe');
  });
});