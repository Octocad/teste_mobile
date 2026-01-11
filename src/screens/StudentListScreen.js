import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getStudents, deleteStudent } from '../services/students';
import Card from '../components/Card';
import Button from '../components/Button';
import { setStudentPending, consumeStudentPending } from '../services/mockStore';

const StudentListScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadStudents();
  }, [page]);

  useFocusEffect(
    React.useCallback(() => {
      if (consumeStudentPending()) {
        const mock = { id: `${Date.now()}`, name: 'Aluno Cadu', email: 'cadu@gmail.com' };
        setStudents((prev) => [mock, ...prev]);
      }
    }, [])
  );

  const loadStudents = async () => {
    try {
      const response = await getStudents(page);
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Excluir Estudante',
      'Tem certeza que deseja excluir este estudante?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await deleteStudent(id);
              loadStudents();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o estudante');
            }
          },
        },
      ]
    );
  };

  const renderStudent = ({ item }) => (
    <Card>
      <Text style={styles.studentName}>{item.name}</Text>
      <Text style={styles.studentEmail}>{item.email}</Text>
      <View style={styles.buttons}>
        <Button
          title="Editar"
          onPress={() => navigation.navigate('EditStudent', { studentId: item.id })}
          style={styles.editButton}
        />
        <Button
          title="Excluir"
          onPress={() => handleDelete(item.id)}
          style={styles.deleteButton}
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Novo Estudante"
        onPress={() => {
          setStudentPending(true);
          navigation.navigate('CreateStudent');
        }}
      />
      <FlatList
        data={students}
        renderItem={renderStudent}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.pagination}>
        <Button title="Anterior" onPress={() => setPage(page > 1 ? page - 1 : 1)} />
        <Text style={styles.pageNumber}>Página {page}</Text>
        <Button title="Próxima" onPress={() => setPage(page + 1)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  studentEmail: {
    color: '#666',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#ffc107',
    flex: 1,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    flex: 1,
    marginLeft: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  pageNumber: {
    fontSize: 16,
  },
});

export default StudentListScreen;