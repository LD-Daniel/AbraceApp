// 📦 Importações principais
import React, {useState,} from 'react';
import {
  View, Text, TextInput, Alert,
  ScrollView, TouchableOpacity, KeyboardAvoidingView,
  Platform, Keyboard, TouchableWithoutFeedback
} from 'react-native';
import styles from './FormularioStyles'; // Arquivo externo de estilos

// 🎛️ Componente de Botões de Rota (estilo rádio)
const RadioButton = ({ options, selectedOption, onSelect }) => (
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

// 🕐 Função para validar horários inseridos
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

// 🧾 Tela principal do formulário
export default function App({ navigation }) {
  // 🧠 Estados dos campos do formulário
  const [nomeInput, setNomeInput] = useState('');
  const [placaInput, setPlacaInput] = useState('');
  const [tipoRota, setTipoRota] = useState(null);
  const [paradasInput, setParadasInput] = useState('');
  const [kmSaidaInput, setKmSaidaInput] = useState('');
  const [kmChegadaInput, setKmChegadaInput] = useState('');
  const [horaSaidaInput, setHoraSaidaInput] = useState('');
  const [horaChegadaInput, setHoraChegadaInput] = useState('');

  // 🗺️ Opções de rotas disponíveis
  const rotaOptions = [
    { label: 'Rota HCB', value: 1 },
    { label: 'Rota Sirio Libanes', value: 2 },
    { label: 'Rota Rodoviaria Interistadual', value: 3 },
  ];

  // 🧹 Função para formatar campo de horário automaticamente
  const formatarHorario = (texto) => {
    const numeros = texto.replace(/\D/g, '').slice(0, 4);
    if (numeros.length <= 2) return numeros;
    return `${numeros.slice(0, 2)}:${numeros.slice(2)}`;
  };

  // 🚀 Função para enviar os dados para o backend
  const saveData = async () => {
    // Validação básica dos campos obrigatórios
    if (!nomeInput.trim() || !placaInput.trim() || !tipoRota) {
      Alert.alert('Erro', 'Preencha pelo menos Nome, Placa e Tipo de Rota.');
      return;
    }

    // Montar os dados a serem enviados conforme o backend espera
    const dadosParaEnviar = {
      usuario_id: 1, // Exemplo fixo, adapte conforme seu sistema de usuários
      rota_id: tipoRota, // A rota selecionada
      nome: nomeInput.trim(),
      placa: placaInput.trim(),
      km_saida: kmSaidaInput.trim(),
      km_chegada: kmChegadaInput.trim(),
      hr_saida: horaSaidaInput.trim(),
      hr_chegada: horaChegadaInput.trim(),
      data_preenchimento: new Date().toISOString().slice(0,10), // Data atual no formato YYYY-MM-DD
      paradas: paradasInput.trim(), // Aqui você pode adaptar para mandar as paradas corretamente, por enquanto vazio
    };

    try {
      // Chamada para seu backend, troque a URL para a sua
        console.log('Enviando dados para o backend...');
      const response = await fetch('LOCALHOST/formularios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnviar),
      });

      const json = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Dados enviados com sucesso!');
        clearInputs(); // Limpa o formulário após envio
        if (navigation?.goBack) navigation.goBack();
      } else {
        Alert.alert('Erro', json.erro || 'Erro ao salvar dados.');
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  // 🧽 Limpa os campos do formulário
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

  // ⌨️ Validação de horário ao pressionar "enter"
  const onSubmitHoraSaida = () => {
    setHoraSaidaInput((old) => validarHorario(old));
  };
  const onSubmitHoraChegada = () => {
    setHoraChegadaInput((old) => validarHorario(old));
  };

  // 🧾 Interface visual do formulário
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
            {/* Nome */}
            <Text style={styles.subtitle}>Nome do Motorista:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              value={nomeInput}
              onChangeText={setNomeInput}
            />

            {/* Placa */}
            <Text style={styles.subtitle}>Placa do Veículo:</Text>
            <TextInput
              style={styles.input}
              placeholder="ABC-1234"
              value={placaInput}
              onChangeText={setPlacaInput}
            />

            {/* Rota */}
            <Text style={styles.subtitle}>Tipo de Rota:</Text>
            <RadioButton
              options={rotaOptions}
              selectedOption={tipoRota}
              onSelect={setTipoRota}
            />

            {/* Paradas */}
            <Text style={styles.subtitle}>Paradas (horário e KM):</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Ex: 08:00 - 50km, 10:30 - 120km"
              value={paradasInput}
              onChangeText={setParadasInput}
              multiline
            />

            {/* Quilometragem */}
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

            {/* Horários */}
            <Text style={styles.subtitle}>Horário de Saída:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 07:00"
              keyboardType="numeric"
              value={horaSaidaInput}
              onChangeText={(text) => setHoraSaidaInput(formatarHorario(text))}
              onSubmitEditing={onSubmitHoraSaida}
              returnKeyType="done"
            />

            <Text style={styles.subtitle}>Horário de Chegada:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 17:30"
              keyboardType="numeric"
              value={horaChegadaInput}
              onChangeText={(text) => setHoraChegadaInput(formatarHorario(text))}
              onSubmitEditing={onSubmitHoraChegada}
              returnKeyType="done"
            />

            {/* Botão de salvar */}
            <TouchableOpacity style={styles.saveButton} onPress={saveData}>
              <Text style={styles.saveButtonText}>Salvar Dados</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
