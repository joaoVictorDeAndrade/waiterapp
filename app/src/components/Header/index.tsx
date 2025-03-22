import { Container, OrderContent, OrderHeader, Table } from './styles';
import { Text } from '../Text';
import { TouchableOpacity } from 'react-native';

interface HeaderProps {
  selectedTable: string | null;
  onCancelOrder: () => void;
}

export function Header({ selectedTable, onCancelOrder } : HeaderProps) {
  return (
    <Container>
      { !selectedTable && (
        <>
          <Text size={14} opacity={0.9} >Bem vindo(a) ao</Text>
          <Text size={24} weight={700}>
            Waiter
            <Text size={24}>App</Text>
          </Text>
        </>
      )}

      {
        selectedTable && (
          <OrderContent>
            <OrderHeader>
              <Text size={24} weight={600}>Pedido</Text>

              <TouchableOpacity onPress={onCancelOrder}>
                <Text color="#D73035" size={14} weight={600}>cancelar pedido</Text>
              </TouchableOpacity>
            </OrderHeader>

            <Table>
              <Text color="#666">Mesa {selectedTable}</Text>
            </Table>
          </OrderContent>
        )
      }
    </Container>
  );
}
