import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CartScreen = ({ route }) => {
  const { selectedServices, setSelectedServices, reloadCart } = route.params;

  const [serviceQuantities, setServiceQuantities] = useState(
    Object.fromEntries(selectedServices.map((service) => [service.id, 1]))
  );

  useEffect(() => {
    setServiceQuantities(Object.fromEntries(selectedServices.map((service) => [service.id, 1])));
  }, [selectedServices]);

  const increaseQuantity = (serviceId) => {
    setServiceQuantities((prevQuantities) => ({
      ...prevQuantities,
      [serviceId]: prevQuantities[serviceId] + 1,
    }));
  };

  const decreaseQuantity = (serviceId) => {
    setServiceQuantities((prevQuantities) => ({
      ...prevQuantities,
      [serviceId]: Math.max(prevQuantities[serviceId] - 1, 0),
    }));
  };

  const removeService = (serviceId) => {
    const updatedServices = selectedServices.filter((service) => service.id !== serviceId);
    setSelectedServices(updatedServices);

    // Check if the cart is empty after removing the item
    if (updatedServices.length === 0) {
      // Reload the cart to update the UI
      reloadCart();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giỏ hàng</Text>
      {selectedServices.length === 0 ? (
        <Text style={styles.emptyCartMessage}>Giỏ hàng trống</Text>
      ) : (
        <FlatList
          data={selectedServices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <View style={styles.serviceInfo}>
                <Text>{item.name}</Text>
                <Text>{item.description} VND</Text>
              </View>
              <View style={styles.actions}>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                    <FontAwesome name="minus" size={10} color="blue" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{serviceQuantities[item.id]}</Text>
                  <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                    <FontAwesome name="plus" size={10} color="blue" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => removeService(item.id)}>
                  <FontAwesome name="trash-o" size={20} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
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
  emptyCartMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  cartItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceInfo: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  quantityText: {
    marginHorizontal: 8,
  },
});

export default CartScreen;
