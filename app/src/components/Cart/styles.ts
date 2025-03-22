import styled from 'styled-components/native';

export const CartItemContainer = styled.View`
  padding: 8px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ProductContainer = styled.View`
  flex-direction: row;
  gap: 12px;
`;

export const Actions = styled.View`
  flex-direction: row;
  gap: 32px;
`;

export const Image = styled.Image`
  width: 48px;
  height: 40px;
  border-radius: 6px;
`;

export const QuantityContainer = styled.View`
`;

export const ProductDetails = styled.View`
  gap: 4px;
`;

export const Summary = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
`;

export const TotalContainer = styled.View`
  flex: 1;
`;
