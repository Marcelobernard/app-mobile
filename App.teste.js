import { render, fireEvent } from '@testing-library/react-native';
import PagamentoScreen from './App.js';
import 'whatwg-fetch';

jest.mock('react-native', () => {
  const actualReactNative = jest.requireActual('react-native');
  return {
    ...actualReactNative,
    Alert: {
      alert: jest.fn(),
    },
  };
});

describe('PagamentoScreen', () => {
  const mockNavigation = { goBack: jest.fn() };
  const mockRoute = {
    params: {
      cart: [
        { name: 'Produto 1', quantity: 1 },
        { name: 'Produto 2', quantity: 2 },
      ],
      totalPrice: 100.0,
      todosDados: 'Dados do pedido',
    },
  };

  it('deve realizar o pedido com sucesso', async () => {
    const { getByText } = render(
      <PagamentoScreen navigation={mockNavigation} route={mockRoute} />
    );

    await fireEvent.press(getByText('Realizar Pedido'));

    expect(mockNavigation.goBack).toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith('Pedido realizado com sucesso!');
  });

  it('deve alertar se o carrinho estiver vazio', async () => {
    const emptyRoute = {
      params: {
        cart: [],
        totalPrice: 0.0,
        todosDados: 'Dados do pedido',
      },
    };

    const { getByText } = render(
      <PagamentoScreen navigation={mockNavigation} route={emptyRoute} />
    );

    await fireEvent.press(getByText('Realizar Pedido'));

    expect(Alert.alert).toHaveBeenCalledWith(
      'Carrinho vazio',
      'Nenhum pedido foi realizado'
    );
  });
});