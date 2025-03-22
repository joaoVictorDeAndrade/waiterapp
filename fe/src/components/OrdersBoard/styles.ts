import styled from 'styled-components';

export const Board = styled.div`
    padding: 16px;
    border: 1px solid rgba(204, 204, 204, 0.4);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    
    // Só aplica nos headers filhos diretos do Board
    > header {
        padding: 8px;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
`;


export const OrdersContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
    margin-top: 24px;
    
    button {
        background: #FFF;
        border: 1px solid rgba(204, 204, 204, 0.4);
        height: 128px;
        border-radius: 8px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4px;
        
        strong {
            font-weight: 500;
        }
        
        span {
            font-size: 14px;
            color: #666;
        }
    }
`;