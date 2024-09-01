import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Image, TextInput, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('1');
  const [cart, setCart] = useState([]);

  const products = [
    { id: '1', name: 'Água', price: 'R$ 2,00', image: 'https://pouch.jumpshare.com/preview/JHGkl7toEyDcCc9t80UmGnpCZlh3j3EMgqw0jqfR0_SFP7zVaUAUPbrbm6oGghCbPyb2xqgW4OXDBUS3LrkffZz148d1fm64c9MqwhS7uDA' },
    { id: '2', name: 'Cerveja', price: 'R$ 10,00', image: 'https://pouch.jumpshare.com/preview/y436-6t3QWFY8MxLcV0LAskfV8lIMAdqn2dDJZxr0-sxVQcTLXG9EoO6Q_BqcyugPyb2xqgW4OXDBUS3LrkffZz148d1fm64c9MqwhS7uDA' },
    { id: '3', name: 'Refrigerante', price: 'R$ 8,00', image: 'https://pouch.jumpshare.com/preview/jCfcdPqNBCVMNCML1D7Wxtn1S304Cp9tHksKVmeD-JiOcbgDwE3LzTiAL14IT87HPyb2xqgW4OXDBUS3LrkffZz148d1fm64c9MqwhS7uDA' },
  ];

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setQuantity('1');
    setModalVisible(true);
  };

  const limparCarrinho = () => {
    setCart([]);
    navigation.goBack()
    alert('Carrinho excluído!');
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => (parseInt(prevQuantity) + 1).toString());
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prevQuantity => (parseInt(prevQuantity) > 1 ? parseInt(prevQuantity) - 1 : 1).toString());
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      setCart(prevCart => [...prevCart, { ...selectedProduct, quantity }]);
      setModalVisible(false);
    }
  };

  const handleRemoveProduct = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Pandora Lucky Luna</Text>
      </View>
      
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://t4logistica.com.br/site/wp-content/uploads/2019/04/banner-rio.jpg' }}
          style={styles.bannerImage}
        />
      </View>

      <View style={styles.header}>
        <TextInput style={styles.searchBar} placeholder="Pesquisar..." />
        <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => navigation.navigate('Carrinho', { cart, setCart })}
        >
          <Icon name="shopping-cart" size={30} color="#000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProductPress(item)} style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.productList}
      />

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                <TextInput
                  style={styles.quantityInput}
                  value={quantity}
                  keyboardType="numeric"
                  onChangeText={setQuantity}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={handleDecreaseQuantity} style={styles.modalButton}>
                    <Text style={styles.modalButtonText}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleIncreaseQuantity} style={styles.modalButton}>
                    <Text style={styles.modalButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleAddToCart} style={styles.addButton}>
                  <Text style={styles.addButtonText}>Adicionar ao Carrinho</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleRemoveProduct} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remover</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const CartScreen = ({ route, navigation }) => {
  const { cart, setCart } = route.params || { cart: [], setCart: () => {} };

  const handleClearCart = () => {
    setCart([]);
    navigation.goBack()
    alert('Carrinho excluído!');
  };

  const handleOrder = () => {
    alert('Pedido realizado com sucesso!');
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Text style={styles.cartItemName}>{item.name}</Text>
      <Text style={styles.cartItemQuantity}>Quantidade: {item.quantity}</Text>
      <Text style={styles.cartItemPrice}>{item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id}
        renderItem={renderCartItem}
        contentContainerStyle={styles.cartList}
      />
      <TouchableOpacity onPress={handleClearCart} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Apagar Carrinho</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleOrder} style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Realizar Pedido</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {

const handleClearCart2 = () => {
    setCart([]);
    navigation.goBack()
    alert('Carrinho excluído!');
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Início">
        <Stack.Screen name="Início" component={HomeScreen} />
        <Stack.Screen name="Carrinho" component={CartScreen}
        options={{
        headerRight: () => (
          //ainda não está funcionando corretamente//
          <TouchableOpacity onPress={handleClearCart2}>
            <Icon name="delete" size={30} color="red" style={{ marginRight: 15 }} />
          </TouchableOpacity>
          //ainda não está funcionando corretamente//
        ),
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoContainer: {
    alignItems: 'center',
    margin: 30,
    marginBottom: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchBar: {
    flex: 1,
    marginLeft: 10,
    padding: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
  },
  cartIcon: {
    padding: 10,
  },
  bannerContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
  productList: {
    justifyContent: 'space-between',
  },
  productCard: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
  },
  productImage: {
    width: 25,
    height: 100,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityInput: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    width: 100,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
  removeButton: {
    backgroundColor: '#FF4C4C',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: '#6c757d',
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  cartItem: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemQuantity: {
    fontSize: 14,
    color: '#888',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#000',
  },
  cartList: {
    flexGrow: 1,
  },
  orderButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    margin: 5,
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    margin: 5,
  },
  backButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    margin: 5,
    marginBottom: 35,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 23,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 23,
  },
  backButtonText: {
    color: 'white',
    fontSize: 23,
  },
});

export default App;
