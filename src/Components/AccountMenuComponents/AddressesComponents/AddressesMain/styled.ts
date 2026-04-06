import styled from 'styled-components';

export const Container = styled.div`
//   width: 500px;
  width: 80%;
  background: #f5f5f5;
  border-radius: 8px;
  font-family: Arial, sans-serif;
`;

export const ContainerMainArrowBackAndButtonAddAddress = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const ContainerMainArrowBackAddress = styled.div`
  display: flex;
  flex-direction: column;
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
  // margin-bottom: 20px;
`;

export const ButtonAddAddress = styled.button`
  background: #111;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 186px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1;

  &:hover {
    background: #1c1c1c;
  }

  &:active {
    transform: scale(0.97);
  }
`;

export const ContainerYetDontHaveAddress = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  height: 140px;

  >span {
    font-size: 22px;
    font-weight: 500;
    text-align: center;
    text-transform: uppercase;
    line-height: 1;
    width: 393px;
    color: #979899;
  }
`;