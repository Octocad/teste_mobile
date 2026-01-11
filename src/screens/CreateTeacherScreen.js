import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { createTeacher } from '../services/teachers';
import Input from '../components/Input';
import Button from '../components/Button';

const CreateTeacherScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    try {
      await createTeacher({ name, email, password });
      Alert.alert('Sucesso', 'Professor criado com sucesso');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o professor');
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
      <Button title="Criar Professor" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});

export default CreateTeacherScreen;