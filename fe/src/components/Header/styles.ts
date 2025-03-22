import styled from 'styled-components';

export const Container = styled.header`
    background-color: #D73035;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 198px;
    padding: 0 32px;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 1216px;    
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    h1 {
        font-size: 32px;
        color: #FFF;
    }
    
    h2 {
        font-size: 16px;
        font-weight: 400;
        opacity: 0.9;
        color: #FFF;
        margin-top: 6px;
    }

    
    @media (max-width: 450px) {
        img {
            display: none;
        }
    }
`;
