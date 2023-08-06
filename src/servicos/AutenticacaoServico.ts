
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.145:5000', // Substitua pelo endereço correto da sua API
});
export default api;

 
export async function fazerLogin(email: string, senha: string) {
    if (!email || !senha) return null;
    
    try {
        const resultado = await api.post('/api/CreateToken', {
            Email: email,
            Password: senha   
        });

        console.log("Resultado =", resultado.data.Token); // Exibir o token retornado
        return resultado.data.Token;
    } catch (error) {
        console.log(error);
        return null;
    }
}