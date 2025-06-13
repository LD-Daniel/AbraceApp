import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: '#FFF5EE',
  padding: 16,
 },
 formContainer: {
  flex: 1,
  width: '100%',
 },
 title: {
  fontSize: 28,
  fontWeight: 'bold',
  marginTop: 20,
  marginBottom: 20,
  textAlign: 'center',
  color: '#333',
 },
 sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginVertical: 10,
  color: '#333',
 },
 subtitle: {
  fontSize: 14,
  marginBottom: 5,
  color: '#FF8C00',
 },
 input: {
  height: 40,
  borderColor: '#ccc',
  borderWidth: 1,
  marginBottom: 12,
  paddingHorizontal: 10,
  backgroundColor: '#fff',
  borderRadius: 5,
 },
 multilineInput: {
  height: 80,
  textAlignVertical: 'top',
 },
 buttonContainer: {
  marginVertical: 10,
  width: '100%',
  color: '#FF8C00',
 },
 saveButton: {
    backgroundColor: '#ff881a',
    paddingVertical: 12,
    borderRadius: 9,
    alignItems: 'center',
    marginVertical: 10,
 },
 saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
 },  
 savedDataContainer: {
  flex: 1,
  width: '100%',
  marginTop: 10,
 },
 dataItem: {
  backgroundColor: '#fff',
  padding: 15,
  marginBottom: 10,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#ddd',
 },
 dataText: {
  fontSize: 14,
  marginBottom: 5,
 },
 noDataText: {
  textAlign: 'center',
  color: '#888',
  marginTop: 20,
 },
 deleteButton: {
  backgroundColor: '#ff4444',
  padding: 8,
  borderRadius: 5,
  marginTop: 10,
  alignItems: 'center',
 },
 deleteButtonText: {
  color: '#fff',
  fontWeight: 'bold',
 },
 radioGroup: {
  marginBottom: 12,
 },
 radioOption: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 8,
 },
 radioOuter: {
  height: 24,
  width: 24,
  borderRadius: 5,
  borderWidth: 2,
  borderColor: '#FFA500',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 10,
 },
 radioInner: {
  height: 12,
  width: 12,
  borderRadius: 4,
  backgroundColor: '#FF8C00',
 },
 radioLabel: {
  fontSize: 14,
  color: '#333',
 },
});

export default styles;