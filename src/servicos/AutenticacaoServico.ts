import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.145:5000', // Substitua pelo endereço correto da sua API
});
export default api;

// Função para fazer login
export async function fazerLogin(email: string, senha: string) {
    if (!email || !senha) return null;
    
    try {
        const resultado = await api.post('/api/CreateToken', {
            Email: email,
            Password: senha   
        });

        console.log("Token:", resultado.data); // Exibir o objeto de resposta inteiro
        return resultado.data; // Retornar o objeto de resposta inteiro (incluindo o token)
    } catch (error) {
        console.log("Erro:", error);
        return null;
    }
}
