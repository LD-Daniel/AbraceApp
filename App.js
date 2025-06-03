import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import FormularioScreen from './FormularioScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './AppStyles';

const Stack = createNativeStackNavigator();


function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const funcionarios = [
    { email: 'ana@abrace.org', senha: 'abrace123' },
    { email: 'joao@abrace.org', senha: 'seguro456' },
    { email: 'maria@abrace.org', senha: 'acesso789' }
  ];

  const handleSubmit = () => {
    const autorizado = funcionarios.some(
      (user) => user.email === email && user.senha === senha
    );

    if (autorizado) {
      setErro('');
      navigation.navigate('Formulario');
    } else {
      setErro('Usuário ou senha incorretos.');
    }
  };

  const esqueciSenha = () => Alert.alert('Recuperação de senha', 'Redirecionando...');
  const naoCadastrado = () => Alert.alert('Cadastro', 'Redirecionando...');

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Abrace</Text>
        <Text style={styles.subtitle}>Acesso Restrito – Funcionários</Text>
        {erro ? <Text style={styles.error}>{erro}</Text> : null}

        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="seunome@abrace.org"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#999" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="********"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={esqueciSenha}>
            <Text style={styles.linkText}>Esqueci minha senha</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={naoCadastrado}>
            <Text style={styles.linkText}>Não estou cadastrado</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Formulario" component={FormularioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}