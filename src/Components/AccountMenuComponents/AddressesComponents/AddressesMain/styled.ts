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

export const ContainerAddAddress = styled.div`
  display: flex;
  /* justify-content: center;
  padding: 40px; */
  background: #f5f5f5;
  
`;

export const CardAddAddress = styled.div`
  width: 600px;
  background: #fff;
  padding: 30px;
  border-radius: 4px;
`;

export const TitleAddAddress = styled.h2`
  font-size: 18px;
  letter-spacing: 2px;
  margin-bottom: 25px;
`;

export const LabelAddAddress = styled.label`
  font-size: 14px;
  margin-top: 15px;
  display: block;
`;

export const SelectAddAddress = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  background: #fff;
`;

export const RowAddAddress = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const InputAddAddress = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #000;
  outline: none;
  background: #f7f7f7;
`;

export const CepLinkAddAddress = styled.span`
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

export const ButtonConfirmAddress = styled.button`
  width: 100%;
  margin-top: 25px;
  padding: 15px;
  background: #000;
  color: #fff;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;

export const Form = styled.div`
  width: 100%;
  /* background: #eaeaea; */
  /* padding: 30px; */
`;

export const Label = styled.label`
  font-size: 14px;
  margin-top: 18px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 5px;
  background: transparent;
  border: none;
  border-bottom: 2px solid #000;
  outline: none;
  font-size: 14px;
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  font-size: 14px;
`;