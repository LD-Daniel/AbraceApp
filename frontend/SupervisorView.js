import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import styles from './SupervisorStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SupervisorDashboard() {
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viagens, setViagens] = useState([]);

  const navigation = useNavigation();

  const handleLogout = async () => {
  try {
    await AsyncStorage.removeItem('usuarioLogado'); // ou outro nome de chave
    navigation.replace('Login'); // substitui a tela atual pela de login
  } catch (error) {
    console.error('Erro ao deslogar:', error);
  }
};

  useEffect(() => {
    fetch('http:LOCALHOST/formularios')
      .then((response) => response.json())
      .then((data) => {
        const viagensFormatadas = data.map(item => ({
          ...item,
          paradas: item.paradas || '', // Agora trata como texto comum
          id: item.id.toString(),
          tipoRota:
            item.rota_id === 'rota1' || item.rota_id === 1 || item.rota_id === '1'
            ? 'rota1'
            : item.rota_id === 'rota2' || item.rota_id === 2 || item.rota_id === '2'
            ? 'rota2'
            : 'rota3',
          nome: item.nome,
          placa: item.placa,
          kmSaida: item.km_saida,
          kmChegada: item.km_chegada,
          horaSaida: item.hr_saida,
          horaChegada: item.hr_chegada,
          dataRegistro: item.data_preenchimento,
        }));
        setViagens(viagensFormatadas);
      })
      .catch((error) => {
        console.error('Erro ao buscar viagens:', error);
      });
  }, []);

  const viagensFiltradas = viagens.filter((v) => {
    if (filterType !== 'all' && v.tipoRota !== filterType) return false;
    const texto = searchText.toLowerCase();
    return (
      v.nome.toLowerCase().includes(texto) ||
      v.placa.toLowerCase().includes(texto)
    );
  });

  const stats = {
    total: viagens.length,
    rota1Count: viagens.filter((v) => v.tipoRota === 'rota1').length,
    rota2Count: viagens.filter((v) => v.tipoRota === 'rota2').length,
    rota3Count: viagens.filter((v) => v.tipoRota === 'rota3').length,
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.nome}</Text>
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
              {item.tipoRota === 'rota1'
                ? 'Rota 1'
                : item.tipoRota === 'rota2'
                ? 'Rota 2'
                : 'Rota 3'}
            </Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>KM:</Text>
            <Text style={styles.infoValue}>
              {item.kmSaida} → {item.kmChegada}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Horário:</Text>
            <Text style={styles.infoValue}>
              {item.horaSaida} → {item.horaChegada}
            </Text>
          </View>
        </View>

        <View style={styles.paradasContainer}>
          <Text style={styles.infoLabel}>Paradas:</Text>
          <Text style={styles.paradasText}>
            {item.paradas ? item.paradas : 'Sem paradas'}
          </Text>
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Painel do Supervisor</Text>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialIcons
            name="logout"
            size={30}
            color="black"
            style={{ paddingTop: 30 }}
          />
        </TouchableOpacity>
      </View>

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

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MaterialIcons
            name="search"
            size={24}
            color="black"
            style={{ paddingRight: 8 }}
          />
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

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'all' && styles.filterButtonActive,
          ]}
          onPress={() => setFilterType('all')}
        >
          <Text
            style={[
              styles.filterButtonText,
              filterType === 'all' && styles.filterButtonTextActive,
            ]}
          >
            Todas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'rota1' && styles.filterButtonActive,
          ]}
          onPress={() => setFilterType('rota1')}
        >
          <Text
            style={[
              styles.filterButtonText,
              filterType === 'rota1' && styles.filterButtonTextActive,
            ]}
          >
            Rota 1
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'rota2' && styles.filterButtonActive,
          ]}
          onPress={() => setFilterType('rota2')}
        >
          <Text
            style={[
              styles.filterButtonText,
              filterType === 'rota2' && styles.filterButtonTextActive,
            ]}
          >
            Rota 2
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filterType === 'rota3' && styles.filterButtonActive,
          ]}
          onPress={() => setFilterType('rota3')}
        >
          <Text
            style={[
              styles.filterButtonText,
              filterType === 'rota3' && styles.filterButtonTextActive,
            ]}
          >
            Rota 3
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={viagensFiltradas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
