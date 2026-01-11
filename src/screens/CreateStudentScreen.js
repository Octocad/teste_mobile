import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { createStudent } from '../services/students';
import Input from '../components/Input';
import Button from '../components/Button';

const CreateStudentScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    try {
      await createStudent({ name, email, password });
      Alert.alert('Sucesso', 'Estudante criado com sucesso');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o estudante');
    }
    finally {
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <View style={styles.container}>
      <Input placeholder="Nome" value={name} onChangeText={setName} />
      <Input placeholder="Email" value={email} onChangeText={setEmail} />
      <Input placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Criar Estudante" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});

export default CreateStudentScreen;