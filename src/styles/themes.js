import { colors } from "./colors";

const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.light,
      padding: 16,
    },
    primaryButton: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: colors.purple,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
    },
    textInput: {
        borderColor: colors.purple,
        borderWidth: 1,
        borderRadius: 4,
        width: '100%',
        padding: 8,
        marginBottom: 16,
    },
    card: {
      width: '100%',
      paddingBottom: 40,
      paddingTop: 40,
      paddingStart: 28,
      paddingEnd: 28,
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
  },
  };
  
  export default {
    styles,
  };