// EditProfile.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useMyContextController } from '../context';

const EditProfile = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  // State để lưu giá trị mới của các trường thông tin
  const [name, setName] = useState(userLogin.name);
  const [email, setEmail] = useState(userLogin.email);
  const [phone, setPhone] = useState(userLogin.phone);
  const [address, setAddress] = useState(userLogin.address);

  const handleSave = () => {
    // Cập nhật thông tin người dùng trong context
    dispatch({
      type: 'UPDATE_USER',
      payload: {
        ...userLogin,
        name,
        email,
        phone,
        address,
      },
    });

    // Chuyển hướng về màn hình thông tin cá nhân
    navigation.navigate('UserProfile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sửa thông tin cá nhân</Text>
      <Text>Tên:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Text>Số điện thoại:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={text => setPhone(text)}
      />
      <Text>Địa chỉ:</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Lưu thông tin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  button: {
    marginTop: 16,
    padding: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default EditProfile;
