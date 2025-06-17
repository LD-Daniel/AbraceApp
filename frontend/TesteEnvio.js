import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Alert
} from 'react-native';

const styles = {
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  subtitle: { fontSize: 16, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginTop: 5 },
  saveButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, marginTop: 20 },
  saveButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' }
};

export default function App() {
  const saveData = async () => {
    const payload = {
      usuario_id: 1,
      rota_id: 1,
      km_saida: 1500,
      km_chegada: 1600,
      hr_saida: '08:00',
      hr_chegada: '17:00',
      data_preenchimento: new Date().toISOString().split('T')[0],
      paradas: [
        {
          km_parada: 1530,
          hr_parada: '09:00',
          km_saida_parada: 1530,
          hr_saida_parada: '09:10',
        },
        {
          km_parada: 1560,
          hr_parada: '10:30',
          km_saida_parada: 1560,
          hr_saida_parada: '10:45',
        }
      ]
    };

    try {
      console.log('Enviando dados para o backend:', payload);

      const response = await fetch('http://192.168.0.14:3001/formularios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const erro = await response.text();
        throw new Error(erro);
      }

      const json = await response.json();
      console.log('Resposta do backend:', json);
      Alert.alert('Sucesso', 'Formulário salvo no banco!');
    } catch (error) {
      console.error('Erro ao salvar formulário:', error);
      Alert.alert('Erro', 'Falha ao salvar formulário.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <Text style={styles.title}>Teste de Envio para o Backend</Text>

          <Text style={styles.subtitle}>Clique no botão abaixo para enviar dados teste ao banco:</Text>

          <TouchableOpacity style={styles.saveButton} onPress={saveData}>
            <Text style={styles.saveButtonText}>Salvar Dados de Teste</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
