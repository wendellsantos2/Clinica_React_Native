 
import { NativeBaseProvider, StatusBar } from 'native-base';

import { TEMAS } from './src/estilos/temas';
import Login from './src/Login';

export default function App() {
    return(
    <NativeBaseProvider theme={TEMAS}>
        <Login />
    </NativeBaseProvider>
    );
}