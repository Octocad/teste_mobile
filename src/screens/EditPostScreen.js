import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { getPost, updatePost } from '../services/posts';
import Input from '../components/Input';
import Button from '../components/Button';

const EditPostScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    try {
      const response = await getPost(postId);
      const post = response.data;
      setTitle(post.title);
      setContent(post.content);
      const authorValue = typeof post.author === 'string' ? post.author : post.author?.name || '';
      setAuthor(authorValue);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content || !author) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }
    try {
      await updatePost(postId, { title, content, author });
      Alert.alert('Sucesso', 'Post atualizado com sucesso');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o post');
    }
  };

  return (
    <View style={styles.container}>
      <Input placeholder="Título" value={title} onChangeText={setTitle} />
      <Input placeholder="Conteúdo" value={content} onChangeText={setContent} multiline />
      <Input placeholder="Autor" value={author} onChangeText={setAuthor} />
      <Button title="Atualizar Post" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});

export default EditPostScreen;