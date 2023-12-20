// Login.js
import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useMyContextController, login, register } from "../context";
import { TouchableOpacity } from "react-native-gesture-handler";
import Register from "./Register";

export default Login = ({ navigation }) => {
  const [email, setEmail] = useState("dna@gmail.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  useEffect(() => {
    if (userLogin != null) {
      if (userLogin.role === "admin") navigation.navigate("Admin");
      else navigation.navigate("Customer");
    }
  }, [userLogin]);

  const onLoginSubmit = () => {
    login(dispatch, email, password);
  };

  const onRegisterSubmit = () => {
    // Assuming the register function is defined in your context
    if (typeof register === "function") {
      register(email, password, navigation);
    } else {
      console.error("Register function is not defined in the context.");
    }
  };

  const onForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          alignSelf: "center",
          color: "blue",
          marginBottom: 30,
        }}
      >
        Login
      </Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          margin: 10,
        }}
        mode="outlined"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        style={{
          margin: 10,
        }}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        mode="outlined"
      />

      <Button
        mode="contained-tonal"
        onPress={onLoginSubmit}
        style={{
          margin: 10,
          padding: 5,
          backgroundColor: "darkblue",
        }}
        labelStyle={{
          fontSize: 20,
          color: "white",
        }}
      >
        Đăng Nhập
      </Button>

      <Text
        style={{
          fontSize: 20,
          alignSelf: "center",
          marginVertical: 10,
          color: "black",
        }}
      >
        Chưa có tài khoản? Đăng ký ngay!
      </Text>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('SignupScreen')}
        style={{
          margin: 10,
          padding: 5,
          borderColor: "darkblue",
        }}
        labelStyle={{
          fontSize: 20,
          color: "darkblue",
        }}
      >
        Đăng Ký
      </Button>

      <TouchableOpacity  onPress={() => navigation.navigate('ForgotPassword')}>
        <Text
          style={{
            fontSize: 16,
            alignSelf: "center",
            marginVertical: 10,
            color: "blue",
          }}
        >
          Quên mật khẩu?
        </Text>
      </TouchableOpacity>
    </View>
  );
};
