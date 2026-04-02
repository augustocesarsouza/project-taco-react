import styled from 'styled-components';

export const Container = styled.div`
//   width: 500px;
  width: 80%;
  background: #f5f5f5;
  border-radius: 8px;
  font-family: Arial, sans-serif;
`;

export const ContainerArrowGoBack = styled.div`
  display: flex;
  align-items: center;
  line-height: 1;
  margin-bottom: 10px;
  cursor: pointer;

  >span {
    font-size: 18px;
  }

  >svg {
    margin-right: 7px;
  }
`;

export const Title = styled.h2`
  font-size: 26px;
  letter-spacing: 2px;
  margin-bottom: 20px;
`;