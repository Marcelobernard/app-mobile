import React, { useState } from 'react';
import { DevSettings } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserForm = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async () => {
    if (firstName && lastName && phone && address) {
      try {
        await AsyncStorage.setItem('hasCompletedForm', 'true');
        navigation.goBack();
      } catch (error) {
        console.error('Erro ao salvar dados', error);
      }
    } else {
      Alert.alert('Preencha todos os campos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preencha suas informações</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="black"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        placeholderTextColor="black"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Celular"
        placeholderTextColor="black"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        placeholderTextColor="black"
        value={address}
        onChangeText={setAddress}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default UserForm;