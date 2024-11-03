import React, { useEffect, useState, Component } from 'react';
import base64 from 'react-native-base64';
import styles from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('1');
  const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState('');

  const products = [
    {
      id: '1',
      name: 'ChocoBoom',
      price: 'R$ 22,00',
      image:
        'https://static.itdg.com.br/images/360-240/9e621f4e0b36756979fda3f87f8279a5/340593-original.jpg',
    },
    {
      id: '2',
      name: 'Nuttella',
      price: 'R$ 25,00',
      image:
        'https://static.itdg.com.br/images/640-400/bb23c39289f794ecfc512b6f6d74192f/72812-original.jpg',
    },
    {
      id: '3',
      name: 'Blackout',
      price: 'R$ 18,00',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRAO8YURNFvhnWWniEODINeUDOEyA0rT1HIg&s',
    },
    {
      id: '4',
      name: 'MarshMelt',
      price: 'R$ 21,00',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCtyoz24HNgCeSq34iYz3Pj_6M1bXSP0zYS1kb9G_cYVx4nVeuU1B9YYEqPkriRCBuDbE&usqp=CAU',
    },
    {
      id: '5',
      name: 'CaramelNut',
      price: 'R$ 24,00',
      image:
        'https://img.freepik.com/fotos-premium/brownies-de-caramelo-escuro-cozido-fresco-com-cobertura-de-castanha-de-caju-na-cremalheira-em-close-up-vista-delicioso-sabor-amargo-doce-em-borracha-e-fudgy-brownie-e-um-tipo-de-bolo-de-chocolate-conceito-de-padaria-caseira_54413-407.jpg?w=996',
    },
    {
      id: '6',
      name: 'ChocoBerry',
      price: 'R$ 26,00',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-BV9o6ZLWlIaPOOFydzfUsZFmU-v9Xddl4_JCWvTzzz_ySu40Hnlsjy1WwpbcpezdbwE&usqp=CAU',
    },
    {
      id: '7',
      name: 'Double Trouble',
      price: 'R$ 20,00',
      image:
        'https://i.pinimg.com/564x/12/83/70/128370273e3919a095bb2ee40fde5a51.jpg',
    },
    {
      id: '8',
      name: 'Ice & Fudge',
      price: 'R$ 28,00',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Chocolate_brownie_with_a_scoop_of_icecream_from_Gowlett%2C_Peckham%2C_London.jpg/1280px-Chocolate_brownie_with_a_scoop_of_icecream_from_Gowlett%2C_Peckham%2C_London.jpg',
    },
    {
      id: '9',
      name: 'Supreme',
      price: 'R$ 22,00',
      image:
        'https://www.receitadevovo.com.br/_next/image?url=https%3A%2F%2Fd2qcpt1idvpipw.cloudfront.net%2Frecipes%2F2020%2F10%2Fbolo-de-brownie_15032019144941.jpg&w=3840&q=75',
    },
    {
      id: '10',
      name: 'ChocoCrispy',
      price: 'R$ 19,00',
      image:
        'https://d1ih8jugeo2m5m.cloudfront.net/2022/05/como-fazer-brownie-para-vender-1200x685.jpg',
    },
    {
      id: '11',
      name: 'Creamy Dream',
      price: 'R$ 23,00',
      image:
        'https://s2-receitas.glbimg.com/AgFzqWGWdxXiZLwlesn9f9r5CNs=/0x0:500x375/1000x0/smart/filters:strip_icc()/s.glbimg.com/po/rc/media/2013/10/14/22_35_48_754_20130718_174918.jpg',
    },
    {
      id: '12',
      name: 'Nutty ChocoBlast',
      price: 'R$ 27,00',
      image:
        'https://receitaspratossaborosos.com.br/wp-content/uploads/2023/11/77f274af-d9b3-41f1-8e7a-648745b-930x620.webp',
    },
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleWhatsAppPress = () => {
    const phoneNumber = '551140028922';
    const message = 'Olá! Preciso de ajuda';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    Linking.openURL(url).catch((err) =>
      console.error('Erro ao abrir o WhatsApp', err)
    );
  };

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setQuantity('1');
    setModalVisible(true);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => (parseInt(prevQuantity) + 1).toString());
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) =>
      parseInt(prevQuantity) > 1 ? (parseInt(prevQuantity) - 1).toString() : '1'
    );
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      const unitPrice = parseFloat(
        selectedProduct.price
          .replace('R$ ', '')
          .replace('.', '')
          .replace(',', '.')
      );
      const totalProductPrice = unitPrice * parseInt(quantity);

      const existingProductIndex = cart.findIndex(
        (item) => item.id === selectedProduct.id
      );

      if (existingProductIndex !== -1) {
        setCart((prevCart) => {
          const updatedCart = [...prevCart];
          updatedCart[existingProductIndex].quantity += parseInt(quantity);
          updatedCart[existingProductIndex].totalPrice += totalProductPrice;
          return updatedCart;
        });
      } else {
        const productToAdd = {
          ...selectedProduct,
          quantity: parseInt(quantity),
          totalPrice: totalProductPrice,
        };

        setCart((prevCart) => [...prevCart, productToAdd]);
      }

      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}></View>
      <View style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://i.imgur.com/Midi9wM.jpg' }}
          style={styles.bannerImage}
        />
      </View>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Pesquisar..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => navigation.navigate('Carrinho', { cart, setCart })}>
          <Icon name="shopping-cart" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => navigation.navigate('Meus Dados')}>
          <Icon name="person" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleProductPress(item)}
            style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.productList}
      />
      <TouchableOpacity
        style={styles.whatsappButton}
        onPress={handleWhatsAppPress}>
        <Text style={styles.whatsappButtonText}>📞 WhatsApp</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                {}
                <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                {}
                <TextInput
                  style={styles.quantityInput}
                  value={quantity}
                  keyboardType="numeric"
                  onChangeText={setQuantity}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={handleDecreaseQuantity}
                    style={styles.modalButton}>
                    <Text style={styles.modalButtonText}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleIncreaseQuantity}
                    style={styles.modalButton}>
                    <Text style={styles.modalButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={handleAddToCart}
                  style={styles.addButton}>
                  <Text style={styles.addButtonText}>
                    Adicionar ao Carrinho
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}>
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

const PagamentoScreen = ({ navigation, route }) => {
  const { cart, totalPrice, todosDados } = route.params;
  const [imageName] = useState(null);

  const handleOrder = async () => {
    if (totalPrice != 0.0) {
      try {
        const orderData = cart
          .map((item) => `${item.quantity}x [${item.name}]`)
          .join('\n');
        const totalData = `Total: R$ ${totalPrice.toFixed(2)}`;
        const now = new Date();
        const date = now.toLocaleDateString('pt-BR');
        const time = now.toLocaleTimeString('pt-BR');
        const dateTimeData = ` | ${time} ${date}`;
        const combinedData = `${orderData}\n${totalData}\n${dateTimeData}`;
        const cryptoDados = base64.encode(todosDados);
        const cryptoData = base64.encode(combinedData);

        const response = await fetch(
          'http://54.232.122.77:3000/receber-dados',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: cryptoData }),
          }
        );
        const response1 = await fetch(
          'http://54.232.122.77:3000/receber-dados',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: cryptoDados }),
          }
        );

        if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
        }

        const data = await response.text();
        console.log(data);
        navigation.goBack();
        alert('Pedido realizado com sucesso!');
      } catch (error) {
        console.error('Erro ao fazer o pedido:', error);
        alert('Erro ao realizar o pedido: ' + error.message);
      }
    } else {
      Alert.alert('Carrinho vazio', 'Nenhum pedido foi realizado');
    }
  };

  return (
    <View style={styles.containerPay}>
      <Image
        source={require('./assets/qrcode.png')}
        style={{ width: 400, height: 400 }}
      />
      {imageName && (
        <Text style={styles.imageNameText}>Nome da imagem: {imageName}</Text>
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Valor esperado do PIX: R$ {totalPrice.toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity onPress={handleOrder} style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Realizar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

const MeusDadosScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [celular, setCelular] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { nome, sobrenome, cep, rua, bairro, numero, celular } =
            JSON.parse(userData);
          setNome(nome || '');
          setSobrenome(sobrenome || '');
          setCep(cep || '');
          setRua(rua || '');
          setBairro(bairro || '');
          setNumero(numero || '');
          setCelular(celular || '');
        }
      } catch (error) {
        console.error('Falha ao carregar dados', error);
      }
    };

    loadData();
  }, []);

  const handleSave = async () => {
    if (!nome || !sobrenome || !cep || !rua || !bairro || !numero || !celular) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    const userData = {
      nome,
      sobrenome,
      cep,
      rua,
      bairro,
      numero,
      celular,
    };

    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      Alert.alert('Sucesso', 'Dados salvos com sucesso!');
      const todosDados = `Sr(a) ${nome} ${sobrenome}, no CEP ${cep} da rua ${rua}, ${bairro}, casa/apt ${numero}. Celular: ${celular}`;
      // Limpa os campos de entrada
      setNome('');
      setSobrenome('');
      setCep('');
      setRua('');
      setBairro('');
      setNumero('');
      setCelular('');

      navigation.navigate('Início');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar os dados.');
    }
  };

  const renderSavedInfo = (value) => {
    return (
      <Text
        style={{
          color: value ? 'rgba(136, 136, 136, 0.6)' : 'red',
        }}>
        {value || 'Sem informações salvas'}
      </Text>
    );
  };

  return (
    <View style={styles.containerDados}>
      <Text style={styles.cartItemName}>Registre-se aqui:</Text>
      {renderSavedInfo(nome)}
      <TextInput
        style={styles.inputDados}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        placeholderTextColor="#888"
      />

      {renderSavedInfo(sobrenome)}
      <TextInput
        style={styles.inputDados}
        placeholder="Sobrenome"
        value={sobrenome}
        onChangeText={setSobrenome}
        placeholderTextColor="#888"
      />

      {renderSavedInfo(cep)}
      <TextInput
        style={styles.inputDados}
        placeholder="CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        placeholderTextColor="#888"
      />

      {renderSavedInfo(rua)}
      <TextInput
        style={styles.inputDados}
        placeholder="Rua"
        value={rua}
        onChangeText={setRua}
        placeholderTextColor="#888"
      />

      {renderSavedInfo(bairro)}
      <TextInput
        style={styles.inputDados}
        placeholder="Bairro"
        value={bairro}
        onChangeText={setBairro}
        placeholderTextColor="#888"
      />

      {renderSavedInfo(numero)}
      <TextInput
        style={styles.inputDados}
        placeholder="Número da Casa ou Apt"
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
        placeholderTextColor="#888"
      />

      {renderSavedInfo(celular)}
      <TextInput
        style={styles.inputDados}
        placeholder="Celular"
        value={celular}
        onChangeText={setCelular}
        keyboardType="phone-pad"
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.buttonDados} onPress={handleSave}>
        <Text style={styles.buttonTextDados}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

const CartScreen = ({ route, navigation }) => {
  const { cart, setCart } = route.params || { cart: [], setCart: () => {} };
  const [todosDados, setTodosDados] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const { nome, sobrenome, cep, rua, bairro, numero, celular } =
            JSON.parse(userData);
          const collectedData = `Sr(a) ${nome} ${sobrenome}, no CEP ${cep} da rua ${rua}, ${bairro}, casa/apt ${numero}. Celular: ${celular}`;
          setTodosDados(collectedData);
        }
      } catch (error) {
        console.error('Falha ao carregar dados', error);
      }
    };

    loadData();
  }, []);

  const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const removeItemFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    navigation.goBack();
  };

  const handlePaying = () => {
    if (totalPrice != 0.0) {
      navigation.navigate('Pagamento', {
        cart,
        totalPrice,
        todosDados,
      });
    } else {
      Alert.alert('Carrinho vazio', 'Escolha algo para continuar');
    }
  };

  const renderCartItem = ({ item }) => {
    return (
      <View style={styles.cartItem}>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeItemFromCart(item.id)}>
          <Text style={styles.removeButtonText}>X</Text>
        </TouchableOpacity>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Image source={{ uri: item.image }} style={styles.cartItemImage} />
        <Text style={styles.cartItemQuantity}>Quantidade: {item.quantity}</Text>
        <Text style={styles.cartItemPrice}>
          Preço total: R$ {item.totalPrice.toFixed(2)}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
        contentContainerStyle={styles.cartList}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: R$ {totalPrice.toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={handlePaying} style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Prosseguir ao pagamento</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Início"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#50280F',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}>
        <Stack.Screen name="Início" component={HomeScreen} />
        <Stack.Screen
          name="Carrinho"
          component={CartScreen}
          options={({ route, navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  route.params.setCart([]);
                  navigation.goBack();
                  alert('Carrinho excluído!');
                }}
                style={{
                  marginRight: 15,
                  padding: 5,
                  borderRadius: 20,
                }}>
                <Icon name="delete" size={30} color="red" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="Meus Dados" component={MeusDadosScreen} />
        <Stack.Screen name="Pagamento" component={PagamentoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
