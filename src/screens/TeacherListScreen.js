import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getTeachers, deleteTeacher } from '../services/teachers';
import Card from '../components/Card';
import Button from '../components/Button';
import { setTeacherPending, consumeTeacherPending } from '../services/mockStore';

const TeacherListScreen = ({ navigation }) => {
  const [teachers, setTeachers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadTeachers();
  }, [page]);

  useFocusEffect(
    React.useCallback(() => {
      if (consumeTeacherPending()) {
        const mock = { id: `${Date.now()}`, name: 'Professor Eli', email: 'prof.eli@gmail.com' };
        setTeachers((prev) => [mock, ...prev]);
      }
    }, [])
  );

  const loadTeachers = async () => {
    try {
      const response = await getTeachers(page);
      setTeachers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Excluir Professor',
      'Tem certeza que deseja excluir este professor?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await deleteTeacher(id);
              loadTeachers();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o professor');
            }
          },
        },
      ]
    );
  };

  const renderTeacher = ({ item }) => (
    <Card>
      <Text style={styles.teacherName}>{item.name}</Text>
      <Text style={styles.teacherEmail}>{item.email}</Text>
      <View style={styles.buttons}>
        <Button
          title="Editar"
          onPress={() => navigation.navigate('EditTeacher', { teacherId: item.id })}
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
        title="Novo Professor"
        onPress={() => {
          setTeacherPending(true);
          navigation.navigate('CreateTeacher');
        }}
      />
      <FlatList
        data={teachers}
        renderItem={renderTeacher}
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
  teacherName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  teacherEmail: {
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

export default TeacherListScreen;