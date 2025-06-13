import React, { useState, useEffect } from 'react';
import {
 View,
 Text,
 TextInput,
 Button,
 StyleSheet,
 Alert,
 ScrollView,
 TouchableOpacity,
 KeyboardAvoidingView,
 Platform,
 Keyboard,
 TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './FormularioStyles';

// Componente RadioButton para seleção de opções
const RadioButton = ({ options, selectedOption, onSelect }) => {
 return (
  <View style={styles.radioGroup}>
   {options.map((option) => (
    <TouchableOpacity
     key={option.value}
     style={styles.radioOption}
     onPress={() => onSelect(option.value)}
    >
     <View style={styles.radioOuter}>
      {selectedOption === option.value && <View style={styles.radioInner} />}
     </View>
     <Text style={styles.radioLabel}>{option.label}</Text>
    </TouchableOpacity>
   ))}
  </View>
 );
};

// Função para validar e limitar horário para max 23:59
const validarHorario = (horario) => {
  const [horaStr = '0', minStr = '0'] = horario.split(':');
  let hora = parseInt(horaStr, 10);
  let min = parseInt(minStr, 10);

  if (isNaN(hora)) hora = 0;
  if (isNaN(min)) min = 0;

  if (hora > 23) hora = 23;
  if (min > 59) min = 59;

  return `${hora.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
};

export default function App() {
 const [nomeInput, setNomeInput] = useState('');
 const [placaInput, setPlacaInput] = useState('');
 const [tipoRota, setTipoRota] = useState(null);
 const [paradasInput, setParadasInput] = useState('');
 const [kmSaidaInput, setKmSaidaInput] = useState('');
 const [kmChegadaInput, setKmChegadaInput] = useState('');
 const [horaSaidaInput, setHoraSaidaInput] = useState('');
 const [horaChegadaInput, setHoraChegadaInput] = useState('');
 const [storeData, setStoredData] = useState([]);
 const [showSavedData, setShowSavedData] = useState(false);

 const rotaOptions = [
  { label: 'Rota HCB', value: 'rota1' },
  { label: 'Rota Sirio Libanes', value: 'rota2' },
  { label: 'Rota Rodoviaria Interistadual', value: 'rota3' },
 ];

 const formatarHorario = (texto) => {
    const numeros = texto.replace(/\D/g, '').slice(0, 4); // Remove não números e limita a 4 dígitos
    if (numeros.length <= 2) return numeros;
    return `${numeros.slice(0, 2)}:${numeros.slice(2)}`;
  };

 useEffect(() => {
  loadData();
 }, []);

 const saveData = async () => {
  if (!nomeInput.trim() || !placaInput.trim() || !tipoRota) {
   Alert.alert('Erro', 'Preencha pelo menos Nome, Placa e Tipo de Rota.');
   return;
  }

  const newEntry = {
   nome: nomeInput.trim(),
   placa: placaInput.trim(),
   tipoRota,
   paradas: paradasInput.trim(),
   kmSaida: kmSaidaInput.trim(),
   kmChegada: kmChegadaInput.trim(),
   horaSaida: horaSaidaInput.trim(),
   horaChegada: horaChegadaInput.trim(),
   id: Date.now().toString(),
  };

  const updatedData = [...storeData, newEntry];

  try {
   await AsyncStorage.setItem('viagensData', JSON.stringify(updatedData));
   setStoredData(updatedData);
   clearInputs();
   Alert.alert('Sucesso', 'Dados salvos com sucesso!');
  } catch (error) {
   console.error('Erro ao salvar os dados', error);
   Alert.alert('Erro', 'Falha ao salvar os dados.');
  }
 };

 const loadData = async () => {
  try {
   const data = await AsyncStorage.getItem('viagensData');
   if (data) {
    setStoredData(JSON.parse(data));
   }
  } catch (error) {
   console.error('Erro ao carregar os dados', error);
  }
 };

 const deleteData = async (id) => {
  const filteredData = storeData.filter(item => item.id !== id);
  try {
   await AsyncStorage.setItem('viagensData', JSON.stringify(filteredData));
   setStoredData(filteredData);
   Alert.alert('Sucesso', 'Registro excluído!');
  } catch (error) {
   console.error('Erro ao excluir os dados', error);
   Alert.alert('Erro', 'Falha ao excluir os dados.');
  }
 };

 const clearInputs = () => {
  setNomeInput('');
  setPlacaInput('');
  setTipoRota(null);
  setParadasInput('');
  setKmSaidaInput('');
  setKmChegadaInput('');
  setHoraSaidaInput('');
  setHoraChegadaInput('');
 };

 // Funções para validar horário ao apertar Enter/OK
 const onSubmitHoraSaida = () => {
  setHoraSaidaInput((old) => validarHorario(old));
 };

 const onSubmitHoraChegada = () => {
  setHoraChegadaInput((old) => validarHorario(old));
 };

 return (
  <KeyboardAvoidingView
   style={styles.container}
   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
   keyboardVerticalOffset={0}
  >
   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={{ flex: 1 }}>
     <Text style={styles.title}>Registro de Viagem</Text>

     <ScrollView style={styles.formContainer} keyboardShouldPersistTaps="handled">
      <Text style={styles.subtitle}>Nome do Motorista:</Text>
      <TextInput
       style={styles.input}
       placeholder="Nome completo"
       value={nomeInput}
       onChangeText={setNomeInput}
      />

      <Text style={styles.subtitle}>Placa do Veículo:</Text>
      <TextInput
       style={styles.input}
       placeholder="ABC-1234"
       value={placaInput}
       onChangeText={setPlacaInput}
      />

      <Text style={styles.subtitle}>Tipo de Rota:</Text>
      <RadioButton
       options={rotaOptions}
       selectedOption={tipoRota}
       onSelect={setTipoRota}
      />

      <Text style={styles.subtitle}>Paradas (horário e KM):</Text>
      <TextInput
       style={[styles.input, styles.multilineInput]}
       placeholder="Ex: 08:00 - 50km, 10:30 - 120km"
       value={paradasInput}
       onChangeText={setParadasInput}
       multiline
      />

      <Text style={styles.subtitle}>KM de Saída:</Text>
      <TextInput
       style={styles.input}
       placeholder="Ex: 1500"
       keyboardType="numeric"
       value={kmSaidaInput}
       onChangeText={setKmSaidaInput}
      />

      <Text style={styles.subtitle}>KM de Chegada:</Text>
      <TextInput
       style={styles.input}
       placeholder="Ex: 1650"
       keyboardType="numeric"
       value={kmChegadaInput}
       onChangeText={setKmChegadaInput}
      />

      <Text style={styles.subtitle}>Horário de Saída:</Text>
      <TextInput
       style={styles.input}
       placeholder="Ex: 07:00"
       keyboardType='numeric'
       value={horaSaidaInput}
       onChangeText={(text) => setHoraSaidaInput(formatarHorario(text))}
       onSubmitEditing={onSubmitHoraSaida}
       returnKeyType="done"
      />

      <Text style={styles.subtitle}>Horário de Chegada:</Text>
      <TextInput
       style={styles.input}
       placeholder="Ex: 17:30"
       keyboardType='numeric'
       value={horaChegadaInput}
       onChangeText={(text) => setHoraChegadaInput(formatarHorario(text))}
       onSubmitEditing={onSubmitHoraChegada}
       returnKeyType="done"
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveData}>
        <Text style={styles.saveButtonText}>Salvar Dados</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
       <Button
        title={showSavedData ? "Ocultar Registros" : "Mostrar Registros"}
        onPress={() => setShowSavedData(!showSavedData)}
       />
      </View>
     </ScrollView>

     {showSavedData && (
      <View style={styles.savedDataContainer}>
       <Text style={styles.sectionTitle}>Registros Salvos:</Text>
       {storeData.length === 0 ? (
        <Text style={styles.noDataText}>Nenhum registro salvo ainda.</Text>
       ) : (
        <ScrollView>
         {storeData.map((item) => (
          <View key={item.id} style={styles.dataItem}>
           <Text style={styles.dataText}>Motorista: {item.nome}</Text>
           <Text style={styles.dataText}>Placa: {item.placa}</Text>
           <Text style={styles.dataText}>Tipo de Rota: {item.tipoRota === 'rota1' ? 'Rota 1' : 'Rota 2'}</Text>
           <Text style={styles.dataText}>KM: {item.kmSaida} → {item.kmChegada}</Text>
           <Text style={styles.dataText}>Horário: {item.horaSaida} → {item.horaChegada}</Text>
           <Text style={styles.dataText}>Paradas: {item.paradas || 'Nenhuma'}</Text>

           <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteData(item.id)}
           >
            <Text style={styles.deleteButtonText}>Excluir</Text>
           </TouchableOpacity>
          </View>
         ))}
        </ScrollView>
       )}
      </View>
     )}
    </View>
   </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
 );
}
