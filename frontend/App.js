import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// import de estilos e telas
import FormularioScreen from './FormularioScreen';
import SupervisorView from './SupervisorView';
import styles from './AppStyles';

const Stack = createNativeStackNavigator();

  // Tela de Login
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  //Funcionarios Cadastrados
  const funcionarios = [
    { email: 'agnaldo@abrace.org', senha: 'abrace123' },
    { email: 'ricardo@abrace.org', senha: 'abrace123' },
    { email: 'joao@abrace.org', senha: 'abrace123' }
  ];

  // Supervisor cadastrado
  const supervisor = {email: 'supervisor@abrace.org', senha: 'adm321' };

  // Função de Login com Redirecionamento Condicional
  const handleSubmit = () =>{
  if (email === supervisor.email && senha === supervisor.senha) {
    setErro ('');
    navigation.navigate('Supervisor');
  }
  else if (funcionarios.some(user => user.email === email && user.senha === senha )){
    setErro ('');
    navigation.navigate('Formulario');
  }
  else {
    setErro('Usuário ou Senha incorretos.');
  }
  }
  const esqueciSenha = () => Alert.alert('Recuperação de senha', 'Redirecionando...');
  const naoCadastrado = () => Alert.alert('Cadastro', 'Redirecionando...');

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image 
          source={require('./assets/logo_abrace.jpg')}
          style={styles.logo}
          resizeMode="contain"
        />
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
            <Text style={styles.linkText}>Esqueci{'\n'}Minha Senha</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={naoCadastrado}>
            <Text style={styles.linkText}>Não estou {'\n'}cadastrado</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Navegação com as tres telas
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Formulario" component={FormularioScreen} />
        <Stack.Screen name="Supervisor" component={SupervisorView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}