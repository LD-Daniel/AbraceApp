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
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


// import de estilos e telas
import FormularioScreen from './FormularioScreen';
import CaminhoneiroHome from './CaminhoneiroHome';
import SupervisorView from './SupervisorView';
import styles from './AppStyles';

const Stack = createNativeStackNavigator();

  // Tela de Login
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  // Função de Login com Redirecionamento Condicional
  const handleSubmit = async () => {
    if (!email || !senha) {
      setErro('Preencha o email e a senha.');
      return;
    }

    try {
      const response = await fetch('http://192.168.0.14:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const json = await response.json();

      if (response.ok) {
        setErro('');
        if (json.perfil === 'supervisor') {
          navigation.navigate('Supervisor');
        } else {
          navigation.navigate('CaminhoneiroHome');
        }
      } else {
        setErro(json.erro || 'Erro ao fazer login.');
      }
    } catch (error) {
      console.error('Erro na requisição de login:', error);
      setErro('Erro de conexão com o servidor.');
    }
  };

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
        <Stack.Screen name="CaminhoneiroHome" component={CaminhoneiroHome} />
        <Stack.Screen name="Formulario" component={FormularioScreen} />
        <Stack.Screen name="Supervisor" component={SupervisorView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}