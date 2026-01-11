import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getPost } from '../services/posts';
import Button from '../components/Button';

const PostDetailScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    try {
      const response = await getPost(postId);
      setPost(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.author}>Autor: {post.author?.name || post.author}</Text>
      <Text style={styles.content}>{post.content}</Text>
      <View style={styles.actions}>
        <Button
          title="Editar"
          onPress={() => navigation.navigate('EditPost', { postId: post.id ?? post._id })}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  content: {
    fontSize: 18,
    lineHeight: 28,
  },
  actions: {
    marginTop: 20,
  },
});

export default PostDetailScreen;