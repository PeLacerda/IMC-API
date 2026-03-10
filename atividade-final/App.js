import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';

export default function App() {
  const [resultado, setResultado] = useState('Espaço para o resultado do IMC');
  const [carregando, setCarregando] = useState(false);

  const weight = 70;
  const height = 170; //Em cm
  const age = 18;
  const gender = 'male';

  async function calcularIMCAsync() {
    try {
      setCarregando(true);
      const response = await fetch(
        `https://api.apiverve.com/v1/bmicalculator?weight=${weight}&height=${height}&unit=metric&age=${age}&gender=${gender}&activityLevel=moderate`,
        {
          headers: { 'x-api-key': 'apv_5022090a-14a8-418c-bfe4-4790c4af7443' },
        }
      );

      const dados = await response.json();

      setResultado(`IMC: ${dados.data.bmi}
Altura: ${dados.data.height}
Peso: ${dados.data.weight}
Categoria: ${dados.data.category}`);
      setCarregando(false);
    } catch (erro) {
      console.error('Erro:', erro);
    }
  }

  function mostrarInformacoes() {
    if (carregando) {
      return <ActivityIndicator />;
    } else {
      return (
        <>
          <Text style={styles.marginBottom10}>{resultado}</Text>

          <TouchableOpacity style={styles.button} onPress={calcularIMCAsync}>
            <Text style={styles.buttonText}>Calcular IMC</Text>
          </TouchableOpacity>
        </>
      );
    }
  }

  return <View style={styles.container}>{mostrarInformacoes()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  button: {
    backgroundColor: 'blue',
    width: '50%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
  },
  marginBottom10: {
    paddingBottom: 10,
    alignContentcenter: 'center',
  },
});
