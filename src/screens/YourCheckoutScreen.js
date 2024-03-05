import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const YourCheckoutScreen = ({ route }) => {
  const { selectedServices, totalPrice } = route.params;
  const navigation = useNavigation();

  const handlePayment = async () => {
    // Implement your payment logic here
    try {
      // Call your server to initiate the payment process
      // For simplicity, we're just showing an alert for a successful payment
      Alert.alert('Thông báo', 'Thanh toán thành công!', [
        { text: 'OK', onPress: () => console.log('Payment successful') },
      ]);
    } catch (error) {
      console.error('Payment error:', error);
      // Handle payment error
      Alert.alert('Thông báo', 'Lỗi thanh toán');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán</Text>
      {/* Display payment details or form here */}
      <Text>Thông tin thanh toán:</Text>
      <Text>Tổng tiền: {totalPrice}.000 VND</Text>
      {/* You can add more payment-related UI components here */}

      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>Xác nhận thanh toán</Text>
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paymentButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default YourCheckoutScreen;
