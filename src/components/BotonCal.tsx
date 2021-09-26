import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../theme/appTheme';
interface props {
  texto: string;
  color?: string;
  ancho?: boolean;
  accion: (numero: string) => void;
}
export const BotonCal = ({
  texto,
  color = '#2D2D2D',
  ancho = false,
  accion,
}: props) => {
  return (
    <TouchableOpacity
      onPress={() => accion(texto)}
      style={{
        ...styles.boton,
        backgroundColor: color,
        width: ancho ? 180 : 80,
      }}>
      <Text
        style={{
          ...styles.botonTexto,
          color: color === '#9b9b9b' ? 'black' : 'white',
        }}>
        {texto}
      </Text>
    </TouchableOpacity>
  );
};
