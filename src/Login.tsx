import React, { useState, useEffect } from 'react';
import {
  VStack,
  Image,
  Text,
  Box,
  FormControl,
  Input,
  Button,
  Link,
  useToast,
  HStack,
} from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Titulo } from './componentes/Titulo';
import { Botao } from './componentes/Botao';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { fazerLogin } from './servicos/AutenticacaoServico';
import { NavigationProp } from '@react-navigation/native';

export default function Login({ navigation }: { navigation: NavigationProp<any> }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(true);
  const toast = useToast();

  useEffect(() => {
    AsyncStorage.removeItem('token');
    async function verificarLogin() {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('Tabs');
      }
      setCarregando(false);
    }
    verificarLogin();
  }, []);

  async function login() {
    try {
      const resultado = await fazerLogin(email, senha);
     
      if (resultado) {
        const { token, nome, endereco, email: userEmail, telefone } = resultado;

        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('nome', nome);

        //navigation.navigate('Tabs');
      } else {
        toast.show({
          title: 'Erro no login',
          description: 'O email ou senha não conferem',
          backgroundColor: 'red.500',
        });
      }
    } catch (error) {
      console.log('Erro ao fazer login:', error);
      toast.show({
        title: 'Erro ao fazer login',
        description: 'Ocorreu um erro ao tentar fazer login',
        backgroundColor: 'red.500',
      });
    }
  }

  if (carregando) {
    return null;
  }
  const imageUrl = 'https://o.remove.bg/downloads/3188af52-b907-45e4-90c9-a1a256c41f4d/kisspng-yorkshire-terrier-puppy-cairn-terrier-australian-s-5b38a465edd422.6874399315304387579742-removebg-preview.png'; // Substitua pela URL real da sua imagem

  return (
    <VStack flex={1} alignItems="center" justifyContent="center" p={5}>
      <Titulo color="blue.500">
        Portal Petz
      </Titulo>
      <Image
        source={{ uri: imageUrl }}
        alt="Logo Voll"
        size="180px" // Ajuste o tamanho conforme necessário
        resizeMode="contain" // Ajuste o modo de redimensionamento conforme necessário
        my={5}
      />
      <Titulo color="blue.500">
        Bem vindo!
      </Titulo>
      <Box>
        <FormControl mt={3}>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            placeholder='Insira seu endereço de email'
            size='lg'
            w="100%"
            borderRadius='lg'
            bgColor='gray.100'
            shadow={3}
            onChangeText={text => setEmail(text)} // Adicione esta linha
          />
        </FormControl>
        <FormControl mt={3}>
          <FormControl.Label>Senha</FormControl.Label>
          <Input
            type='password'
            placeholder='Insira sua senha'
            size='lg'
            w="100%"
            borderRadius='lg'
            bgColor='gray.100'
            shadow={3}
            onChangeText={text => setSenha(text)} // Adicione esta linha
          />
          <HStack justifyContent="center">
            <Botao w="90%" bg="blue.800" mt={10} borderRadius="lg" onPress={login}>
              <Text color="white">Entrar</Text>
            </Botao>
          </HStack>
        </FormControl>
      </Box>
      <Box w="100%" flexDirection="row" justifyContent="center">
        <Text>Ainda não tem cadastro? </Text>
        <TouchableOpacity>
          <Text color="blue.500">
            Faça seu cadastro!
          </Text>
        </TouchableOpacity>
      </Box>
    </VStack>
  );
}
