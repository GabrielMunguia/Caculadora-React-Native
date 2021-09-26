import {useRef, useState} from 'react';
enum operadores {
  sumar,
  restar,
  multiplicar,
  dividir,
}
export const useCalculadora = () => {
  const [numero, setNumero] = useState('0');
  const [numeroAnterior, setNumeroAnterior] = useState('0');
  const ultimaOperacion = useRef<operadores>();

  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
  };
  const armarNumero = (numeroTexto: string) => {
    if (numero.includes('NaN' || numeroTexto.includes('NaN'))) {
      setNumero(numeroTexto);
      return;
    }
    // No aceptar doble punto
    if (numero.includes('.') && numeroTexto === '.') return;

    if (numero.startsWith('0') || numero.startsWith('-0')) {
      // Punto decimal
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto);

        // Evaluar si es otro cero, y hay un punto
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + numeroTexto);

        // Evaluar si es diferente de cero y no tiene un punto
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        setNumero(numeroTexto);

        // Evitar 0000.0
      } else if (numeroTexto === '0' && !numero.includes('.')) {
        setNumero(numero);
      } else {
        setNumero(numero + numeroTexto);
      }
    } else {
      setNumero(numero + numeroTexto);
    }
  };

  const positivoNegativo = () => {
    if (numero.startsWith('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  const btnDelete = () => {
    if (numero.length > 1) {
      if (numero.length === 2 && numero.startsWith('-')) {
        setNumero('0');
      } else {
        //borra el ultimo caracter del string en este caso borra el ultimo numero

        setNumero(numero.slice(0, -1));
      }
    } else {
      setNumero('0');
    }
  };

  const cambiarNumAnterior = () => {
    if (numero.endsWith('.')) {
      setNumeroAnterior(numero.slice(0, -1));
    } else {
      setNumeroAnterior(numero);
    }
    setNumero('0');
  };

  const btnDividir = () => {
    cambiarNumAnterior();
    ultimaOperacion.current = operadores.dividir;
  };
  const btnMultiplicar = () => {
    cambiarNumAnterior();
    ultimaOperacion.current = operadores.multiplicar;
  };
  const btnRestar = () => {
    cambiarNumAnterior();
    ultimaOperacion.current = operadores.restar;
  };
  const btnSumar = () => {
    cambiarNumAnterior();
    ultimaOperacion.current = operadores.sumar;
  };

  const calcular = () => {
    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);
    if (isNaN(num1) || isNaN(num2)) {
      return;
    }
    switch (ultimaOperacion.current) {
      case operadores.sumar:
        setNumero(`${num1 + num2}`);
        break;
      case operadores.multiplicar:
        setNumero(`${num1 * num2}`);
        break;
      case operadores.restar:
        setNumero(`${num2 - num1}`);
        break;
      case operadores.dividir:
        setNumero(`${num2 / num1}`);
        break;
    }
    setNumeroAnterior('0');
  };

  return {
    numero,
    numeroAnterior,
    armarNumero,
    positivoNegativo,
    btnDelete,
    btnDividir,
    btnMultiplicar,
    btnRestar,
    btnSumar,
    limpiar,
    calcular,
  };
};
