const calcularPrecoTotal = (precoUnitario, quantidade) => {
    const unitPrice = parseFloat(precoUnitario.replace('R$ ', '').replace('.', '').replace(',', '.'));
    return unitPrice * parseInt(quantidade);
  };

describe('Teste de cálculo de preço total', () => {
  test('deve calcular o preço correto para 1 produto a R$ 22,00', () => {
    expect(calcularPrecoTotal('R$ 22,00', '1')).toBe(22);
  });

  test('deve calcular o preço correto para 3 produtos a R$ 25,00', () => {
    expect(calcularPrecoTotal('R$ 25,00', '3')).toBe(75);
  });

  test('deve calcular o preço correto para 2 produtos a R$ 18,50', () => {
    expect(calcularPrecoTotal('R$ 18,50', '2')).toBe(37);
  });

  test('deve retornar 0 para 5 produtos a R$ 0,00', () => {
    expect(calcularPrecoTotal('R$ 0,00', '5')).toBe(0);
  });
});