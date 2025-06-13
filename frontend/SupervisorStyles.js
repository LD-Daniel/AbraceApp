import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: '#f5f5f5',
 },
 header: {
 backgroundColor: '#faa125',
 paddingHorizontal: 20,
 padding: 10,
 flexDirection: 'row',
 justifyContent: 'space-between',
 alignItems: 'center',
 },
 headerTitle: {
 paddingTop: 30,
 color: '#fff',
 fontSize: 23,
 fontWeight: 'bold',
 },
 statsContainer: {
 flexDirection: 'row',
 justifyContent: 'space-between',
 padding: 15,
 backgroundColor: '#fff',
 marginBottom: 10,
 },
 statCard: {
 flex: 1,
 alignItems: 'center',
 padding: 10,
 borderRadius: 5,
 },
 statValue: {
 fontSize: 24,
 fontWeight: 'bold',
 color: '#ea580c',
 },
 statLabel: {
 fontSize: 12,
 color: '#666',
 marginTop: 5,
 },
 searchContainer: {
 paddingHorizontal: 15,
 paddingVertical: 10,
 },
 searchInputContainer: {
 flexDirection: 'row',
 alignItems: 'center',
 backgroundColor: '#fff',
 borderRadius: 25,
 paddingHorizontal: 15,
 shadowColor: '#000',
 shadowOffset: { width: 0, height: 1 },
 shadowOpacity: 0.1,
 shadowRadius: 2,
 elevation: 2,
 },
 searchIcon: {
 marginRight: 10,
 fontSize: 16,
 },
 searchInput: {
 flex: 1,
 paddingVertical: 10,
 fontSize: 16,
 },
 clearIcon: {
 fontSize: 12,
 padding: 5,
 },
 filterContainer: {
 flexDirection: 'row',
 paddingHorizontal: 15,
 marginBottom: 10,
 },
 filterButton: {
 paddingVertical: 8,
 paddingHorizontal: 15,
 borderRadius: 20,
 marginRight: 10,
 backgroundColor: '#fff',
 shadowColor: '#000',
 shadowOffset: { width: 0, height: 1 },
 shadowOpacity: 0.1,
 shadowRadius: 1,
 elevation: 1,
 },
 filterButtonActive: {
 backgroundColor: '#fb7013',
 },
 filterButtonText: {
 color: '#fb7013',
 fontSize: 14,
 },
 filterButtonTextActive: {
 color: '#fff',
 fontWeight: 'bold',
 },
 listContainer: {
 padding: 15,
 },
 card: {
 backgroundColor: '#fff',
 borderRadius: 10,
 marginBottom: 15,
 shadowColor: '#000',
 shadowOffset: { width: 0, height: 2 },
 shadowOpacity: 0.1,
 shadowRadius: 3,
 elevation: 3,
 },
 cardHeader: {
 flexDirection: 'row',
 justifyContent: 'space-between',
 alignItems: 'center',
 padding: 15,
 borderBottomWidth: 1,
 borderBottomColor: '#f0f0f0',
 },
 cardTitle: {
 fontSize: 16,
 fontWeight: 'bold',
 color: '#333',
 },
 deleteIcon: {
 fontSize: 16,
 },
 cardContent: {
 padding: 15,
 },
 infoRow: {
 flexDirection: 'row',
 marginBottom: 10,
 },
 infoItem: {
 flex: 1,
 },
 infoLabel: {
 fontSize: 12,
 color: '#888',
 marginBottom: 3,
 fontWeight: '600',
 },
 infoValue: {
 fontSize: 14,
 color: '#333',
 fontWeight: '500',
 },
 paradasContainer: {
 marginTop: 5,
 marginBottom: 10,
 },
 paradasText: {
 fontSize: 14,
 color: '#333',
 },
 dataContainer: {
 flexDirection: 'row',
 alignItems: 'center',
 },
});

export default styles;