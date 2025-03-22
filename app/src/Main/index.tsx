import { useEffect, useState } from 'react';
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer, CenteredContainer } from './styles';

import { Header } from '../components/Header';
import { Categories } from '../components/Categories';
import { Menu } from '../components/Menu';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';
import { Cart } from '../components/Cart';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';
import { ActivityIndicator } from 'react-native';

import { products as mockProducts } from '../mocks/products';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { Category } from '../types/Category';

import { api } from '../utils/api';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable ] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState(mockProducts);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products')
    ]).then(([categoriesResp, productsResp]) => {
      setCategories(categoriesResp.data);
      setProducts(productsResp.data);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleCloseTable() {
    setIsTableModalVisible(false);
  }

  function handleResetOrder() {
    setSelectedTable(null);
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const updatedItems = [...prevState];
      updatedItems[itemIndex].quantity += 1;

      return updatedItems;
    });
  }

  function handleDecreaseQuantity(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(cartItem => cartItem.product._id === product._id);

      if (prevState[itemIndex].quantity === 1) {
        return prevState.filter(cartItem => cartItem.product._id !== product._id);
      }

      const updatedItems = [...prevState];
      updatedItems[itemIndex].quantity -= 1;

      return updatedItems;
    });
  }

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId ? '/products' : `/categories/${categoryId}/products`;

    setIsLoadingProducts(true);

    await new Promise(resolve => setTimeout(resolve, 1000));
    const { data } = await api.get(route);

    setProducts(data);
    setIsLoadingProducts(false);
  }

  return (
    <>
      <Container>
        <Header selectedTable={selectedTable} onCancelOrder={handleResetOrder} />

        { isLoading && (
          <CenteredContainer>
            <ActivityIndicator color="#D73035" size="large" />
          </CenteredContainer>
        ) }

        { !isLoading && (
          <>
            <CategoriesContainer>
              <Categories categories={categories} onSelectCategory={handleSelectCategory} />
            </CategoriesContainer>

            { isLoadingProducts ? (
              <CenteredContainer>
                <ActivityIndicator color="#D73035" size="large" />
              </CenteredContainer>
            ) : (
              <>
                { products.length > 0 ? (
                  <MenuContainer>
                    <Menu onAddToCart={handleAddToCart} products={products} />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />

                    <Text color="#666" style={{ marginTop: 24 }} >Nenhum produto foi encontrado!</Text>
                  </CenteredContainer>
                ) }
              </>
            )}
          </>
        )}
      </Container>

      <Footer>
        <FooterContainer>
          { !selectedTable && (
            <Button onPress={() => setIsTableModalVisible(true)} disabled={isLoading}>
              Novo Pedido
            </Button>
          )}

          { selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onRemove={handleDecreaseQuantity}
              onConfirmOrder={handleResetOrder}
              selectedTable={selectedTable}
            />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={handleCloseTable}
        onSave={handleSaveTable}
      />
    </>
  );
}
