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
import { Ionicons } from '@expo/vector-icons';
import { Titulo } from './componentes/Titulo';
import { EntradaTexto } from './componentes/EntradaTexto';
import { fazerLogin } from './servicos/AutenticacaoServico';
import { Botao } from './componentes/Botao';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

export default function Login({ navigation } : any) {
  const [email,setEmail] = useState('')
  const [senha,setSenha] = useState('')
  const [carregando,setCarregando] = useState(true)
  const toast = useToast()

    
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() =>{
    AsyncStorage.removeItem('token')
    async function verificarLogin() {
      const token = await AsyncStorage.getItem
      ('token')
      if(token){
        navigation.replace('Tabs')
      }
      setCarregando(false)
    }
    verificarLogin()
  },[])

  async function login() {
    const resultado = await fazerLogin(email,senha)
    if(resultado){
      const {token } = resultado
      AsyncStorage.setItem('token',token)

      const tokenDecodificado = jwtDecode(token) as any
      const pacienteId = tokenDecodificado.id

      AsyncStorage.setItem('pacienteId',pacienteId)
      navigation.replace('Tabs')
    }
    else{
       toast.show({
        title:"Erro no login",
        description:"O email ou senha não conferem",
        backgroundColor: "red.500"
       })
    }
  }

  if(carregando){
    return null 
  } 
  const imageUrl = 'https://o.remove.bg/downloads/3188af52-b907-45e4-90c9-a1a256c41f4d/kisspng-yorkshire-terrier-puppy-cairn-terrier-australian-s-5b38a465edd422.6874399315304387579742-removebg-preview.png'; // Substitua pela URL real da sua imagem

  return (
    <VStack flex={1} alignItems="center" justifyContent="center" p={5}>
        <Titulo color="blue.500" >
                Portal Petz
            </Titulo>
      <Image
        source={{ uri: imageUrl }}
        alt="Logo Voll"
        size="180px" // Ajuste o tamanho conforme necessário
        resizeMode="contain" // Ajuste o modo de redimensionamento conforme necessário
        my={5}
      />
      <Titulo color="blue.500" >
               Bem vindo ! 
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
                    />
                </FormControl>
                <FormControl mt={3}>
                    <FormControl.Label>Senha</FormControl.Label>
                    <Input
                        placeholder='Insira sua senha'
                        size='lg'
                        w="100%"
                        borderRadius='lg'
                        bgColor='gray.100'
                        shadow={3}
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

// Código omitido