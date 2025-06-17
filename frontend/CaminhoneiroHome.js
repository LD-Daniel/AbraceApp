import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import FormularioViagem from './FormularioScreen';


export default function CaminhoneiroHome({navigation}) {
  const [usuarioLogado] = useState({ nome: 'Funcionários -> Caminhoneiros' });
  const [tela, setTela] = useState('home');

  const sair = () => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'Login' }],
  });
};


  if (tela === 'logout') {
    return (
      <View style={estilos.fullscreen}>
        <View style={estilos.header}>
          <Text style={estilos.nome}>{usuarioLogado.nome}</Text>
          <Button title="Sair" color="#EA580C" onPress={sair} />
        </View>
        <View style={estilos.center}>
          <Text style={estilos.titulo}>Você saiu do sistema</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={estilos.fullscreen}>
      <View style={estilos.header}>
        <Text style={estilos.nome}>{usuarioLogado.nome}</Text>
        <Button title="Sair" color="#EA580C" onPress={sair} />
      </View>

      {tela === 'formulario' ? (
        <FormularioViagem voltar={() => setTela('home')} />
      ) : (
        <View style={estilos.center}>
          <Text style={estilos.titulo}>Bem-vindo!</Text>
          <Button
            title="Preencher Formulário"
            color="#F97316"
            onPress={() => navigation.navigate('Formulario')}
          />
        </View>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: '#FFF7ED',
  },
  header: {
    width: '100%',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FED7AA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },
  nome: {
    fontSize: 18,
    color: '#7C2D12',
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EA580C',
    marginBottom: 16,
  },
});
