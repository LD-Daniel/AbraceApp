import React, { useState } from 'react';
import {
 View,
 Text,
 StyleSheet,
 FlatList,
 TouchableOpacity,
 TextInput,
 ScrollView,
 SafeAreaView,
} from 'react-native';
import styles from './SupervisorStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function SupervisorDashboard() {
 const [searchText, setSearchText] = useState('');
 const [filterType, setFilterType] = useState('all');

 // Dados para visualização
 const viagensMock = [
 {
  id: '1',
  nome: 'João Silva',
  placa: 'ABC-1234',
  tipoRota: 'rota1',
  kmSaida: '1500',
  kmChegada: '1650',
  horaSaida: '07:00',
  horaChegada: '17:30',
  paradas: '08:00 - 50km, 10:30 - 120km',
  dataRegistro: '15/12/2023'
 },
 {
  id: '2',
  nome: 'Maria Santos',
  placa: 'DEF-5678',
  tipoRota: 'rota2',
  kmSaida: '2000',
  kmChegada: '2200',
  horaSaida: '06:30',
  horaChegada: '18:00',
  paradas: 'Nenhuma',
  dataRegistro: '15/12/2023'
 },
 {
  id: '3',
  nome: 'Carlos Oliveira',
  placa: 'GHI-9012',
  tipoRota: 'rota2',
  kmSaida: '1800',
  kmChegada: '1950',
  horaSaida: '08:00',
  horaChegada: '16:45',
  paradas: '09:30 - 75km',
  dataRegistro: '14/12/2023'
 },
 {
  id: '4',
  nome: 'Carlos Oliveira',
  placa: 'GHI-9012',
  tipoRota: 'rota3',
  kmSaida: '1800',
  kmChegada: '1950',
  horaSaida: '08:00',
  horaChegada: '16:45',
  paradas: '09:30 - 75km',
  dataRegistro: '14/12/2023'
 }
 ];

 const stats = {
 total: viagensMock.length,
 rota1Count: viagensMock.filter(v => v.tipoRota === 'rota1').length,
 rota2Count: viagensMock.filter(v => v.tipoRota === 'rota2').length,
 rota3Count: viagensMock.filter(v => v.tipoRota === 'rota3').length,
 };

 const renderItem = ({ item }) => (
 <View style={styles.card}>
  <View style={styles.cardHeader}>
  <Text style={styles.cardTitle}>{item.nome}</Text>
  <TouchableOpacity>
    <MaterialIcons name="delete" size={24} color="#e81648" />  
  </TouchableOpacity>
  </View>

  <View style={styles.cardContent}>
  <View style={styles.infoRow}>
   <View style={styles.infoItem}>
   <Text style={styles.infoLabel}>Placa:</Text>
   <Text style={styles.infoValue}>{item.placa}</Text>
   </View>
   <View style={styles.infoItem}>
   <Text style={styles.infoLabel}>Rota:</Text>
   <Text style={styles.infoValue}>
    {item.tipoRota === 'rota1' ? 'Rota 1' : 'Rota 2'}
   </Text>
   </View>
  </View>

  <View style={styles.infoRow}>
   <View style={styles.infoItem}>
   <Text style={styles.infoLabel}>KM:</Text>
   <Text style={styles.infoValue}>{item.kmSaida} → {item.kmChegada}</Text>
   </View>
   <View style={styles.infoItem}>
   <Text style={styles.infoLabel}>Horário:</Text>
   <Text style={styles.infoValue}>{item.horaSaida} → {item.horaChegada}</Text>
   </View>
  </View>

  <View style={styles.paradasContainer}>
   <Text style={styles.infoLabel}>Paradas:</Text>
   <Text style={styles.paradasText}>{item.paradas}</Text>
  </View>

  <View style={styles.dataContainer}>
   <Text style={styles.infoLabel}>Data:</Text>
   <Text style={styles.infoValue}>{item.dataRegistro}</Text>
  </View>
  </View>
 </View>
 );

 return (
 <SafeAreaView style={styles.container}>

  {/* Header */}

  <View style={styles.header}>
  <Text style={styles.headerTitle}>Painel do Supervisor</Text>

  <TouchableOpacity>
    <MaterialIcons name="logout" size={30} color="black" paddingTop={30} />
  </TouchableOpacity>
  </View>

  {/* Estatísticas */}

  <View style={styles.statsContainer}>
  <View style={styles.statCard}>
   <Text style={styles.statValue}>{stats.total}</Text>
   <Text style={styles.statLabel}>Total</Text>
  </View>
  <View style={styles.statCard}>
   <Text style={styles.statValue}>{stats.rota1Count}</Text>
   <Text style={styles.statLabel}>Rota 1</Text>
  </View>
  <View style={styles.statCard}>
   <Text style={styles.statValue}>{stats.rota2Count}</Text>
   <Text style={styles.statLabel}>Rota 2</Text>
  </View>
  <View style={styles.statCard}>
   <Text style={styles.statValue}>{stats.rota3Count}</Text>
   <Text style={styles.statLabel}>Rota 3</Text>
  </View>
  </View>

  {/* Busca */}
  <View style={styles.searchContainer}>
  <View style={styles.searchInputContainer}>
    <MaterialIcons name="search" size={24} color="black" paddingRi />   
  <TextInput
   style={styles.searchInput}
   placeholder="Buscar por motorista ou placa"
   value={searchText}
   onChangeText={setSearchText}
   />
   {searchText ? (
   <TouchableOpacity onPress={() => setSearchText('')}>
    <Text style={styles.clearIcon}>❌</Text>
   </TouchableOpacity>
   ) : null}
  </View>
  </View>

  {/* Filtros */}
  <View style={styles.filterContainer}>
  <TouchableOpacity
   style={[
   styles.filterButton,
   filterType === 'all' && styles.filterButtonActive
   ]}
   onPress={() => setFilterType('all')}
  >
   <Text style={[
   styles.filterButtonText,
   filterType === 'all' && styles.filterButtonTextActive
   ]}>
   Todas
   </Text>
  </TouchableOpacity>
  
  <TouchableOpacity
   style={[
   styles.filterButton,
   filterType === 'rota1' && styles.filterButtonActive
   ]}
   onPress={() => setFilterType('rota1')}
  >
   <Text style={[
   styles.filterButtonText,
   filterType === 'rota1' && styles.filterButtonTextActive
   ]}>
   Rota 1
   </Text>
  </TouchableOpacity>
  
  <TouchableOpacity
   style={[
   styles.filterButton,
   filterType === 'rota2' && styles.filterButtonActive
   ]}
   onPress={() => setFilterType('rota2')}
  >
   <Text style={[
   styles.filterButtonText,
   filterType === 'rota2' && styles.filterButtonTextActive
   ]}>
   Rota 2
   </Text>
  </TouchableOpacity>
  </View>

  {/* Lista de Viagens */}
  <FlatList
  data={viagensMock}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  contentContainerStyle={styles.listContainer}
  showsVerticalScrollIndicator={false}
  />
 </SafeAreaView>
 );
}
