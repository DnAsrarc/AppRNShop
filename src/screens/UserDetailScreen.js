// UserDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UserDetailScreen = ({ route, navigation }) => {
  const { user } = route.params;

  const handleEditUser = () => {
    // Chuyển đến màn hình chỉnh sửa thông tin người dùng và truyền thông tin của người dùng cần chỉnh sửa
    navigation.navigate('EditUser', { user });
  };

  const handleDeleteUser = async () => {
    try {
      // Xóa người dùng khỏi Firestore
      await firestore().collection('USERS').doc(user.id).delete();
      console.log('Người dùng đã được xóa thành công khỏi Firestore');
      // Quay lại màn hình danh sách người dùng sau khi xóa thành công
      navigation.goBack();
    } catch (error) {
      console.error('Lỗi khi xóa người dùng:', error);
    }
  };

  const confirmDeleteUser = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn xóa người dùng này?',
      [
        { text: 'Hủy bỏ', style: 'cancel' },
        { text: 'Xóa', onPress: handleDeleteUser, style: 'destructive' },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin về người dùng</Text>
      <View style={styles.userItem}>
        <Text>Tên: {user.name}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Số điện thoại: {user.phone}</Text>
        <Text>Địa chỉ: {user.address}</Text>
        <Text>Vai trò: {user.role}</Text>

        {/* Thêm nút chỉnh sửa và xóa */}
        <TouchableOpacity style={styles.button} onPress={handleEditUser}>
          <Text style={styles.buttonText}>Chỉnh sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={confirmDeleteUser}>
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userItem: {
    padding: 12,
    backgroundColor: '#eee',
  },
  button: {
    marginTop: 12,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserDetailScreen;
