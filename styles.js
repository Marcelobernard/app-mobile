import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E0',
  },
  inferiorcontainer: {
    padding: 10,
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 0,
  },
  footerLista: {
    height: 100,
    backgroundColor: 'transparent',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerContainer: {
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: 130,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#8B4513',
  },
  cartIcon: {
    marginLeft: 10,
    backgroundColor: '#D2691E',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  productList: {
    paddingVertical: 10,
  },
  productCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#D2691E',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  quantityInput: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#FF6F00',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#A75219',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#C2210F',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  cartItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 250,
    padding: 15,
    borderRadius: 10,
    height: 250,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginTop: 12,
  },

  cartItemImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: 'cover',
    borderColor: '#8B4513',
    borderWidth: 2,
    marginBottom: 5,
  },

  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#6A260A',
  },
  cartItemQuantity: {
    marginBottom: 5,
    fontSize: 16,
    color: '#DF8B05',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#DF8B05',
  },

  totalContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6A260A',
  },

  orderButton: {
    backgroundColor: '#DD8800',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#724A08',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },

  removeButton: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    width: 30,
    height: 30,
    top: 5,
    right: 5,
    backgroundColor: '#ff4d4d',
    borderRadius: 50,
    padding: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  whatsappButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#25D366',
    padding: 10,
    borderRadius: 100,
    elevation: 5,
  },
  whatsappButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  containerDados: {
    flex: 1,
    padding: 20,
  },
  inputDados: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '000',
  },
  buttonDados: {
    height: 50,
    backgroundColor: '#007BFF', // Cor do botão
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextDados: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerPay: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#99999',
  },
});

export default styles;