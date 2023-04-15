import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../../../src/screens/login/LoginScreen';

describe('LoginScreen', () => {
  it('updates username correctly', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);
    const usernameInput = getByPlaceholderText('@username');
    fireEvent.changeText(usernameInput, 'johndoe');
    expect(usernameInput.props.value).toBe('johndoe');
  });
});