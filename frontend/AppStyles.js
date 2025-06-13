import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8a337',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  box: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 12,
    elevation: 5
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ea580c',
    textAlign: 'center',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 30
  },
  error: {
    color: '#ef4444',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#f9c588',
    borderWidth: 2,
    borderRadius: 40,
    marginBottom: 12,
    paddingHorizontal: 14
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16
  },
  icon: {
    marginRight: 8
  },
  button: {
    backgroundColor: '#f97316',
    paddingVertical: 14,
    borderRadius: 40,
    marginTop: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  linkText: {
    color: '#ea580c',
    fontWeight: '600',
    fontSize: 13
  },
  logo: {
  width: 235,
  height: 100,
  alignSelf: 'center',
  marginBottom: 16,
},
});

export default styles;