import styled from 'styled-components';


export const ContainerMain = styled.div`
  width: 100%;
  
  >h1 {
    font-size: 28px;
    font-weight: 500;
    padding-top: 0;
    padding-left: 0px;
    padding-bottom: 24px;
  }
`;

export const ContainerInfoUserAndNewsletter = styled.div`
  display: flex;
  gap: 30px;
  width: 100%;
`;

export const ContainerSecondMain = styled.div`
  /* width: 493px; */
  width: 60%;
  /* height: 369px; */
  background: #fff;

  padding: 30px;
`;

export const ContainerFirstInfos = styled.div`
  display: flex;
`;

export const ContainerInfoInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  >label {
    font-size: 16px;
    margin-bottom: 8px;
  }
`;

export const ContainerFirstLabelAndInfo = styled.div`
  line-height: 1;
  margin-bottom: 35px;

  >label {
    font-size: 16px;
    margin-bottom: 8px;
  }
`;

export const ContainerSecondInfos = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;

  >label {
    font-size: 16px;
    margin-bottom: 8px;
  }

  >span {
    font-weight: 500;
    font-size: 15px;
  }
`;

export const ButtonChangeData = styled.button`
  width: 100%;
  background: #0b0b0b;
  color: #ffffff;
  border: none;
  padding: 12px 16px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  &:hover {
    background: #1a1a1a;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ContainerNewsLetter = styled.div`
  display: flex;
  flex: 1; /* pega o espaço que sobrar */

  background: #fff;
  padding: 30px;
  height: 160px;

  >h1 {
    font-size: 20px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

export const Container = styled.div`
  width: 500px;
  background: #f5f5f5;
  padding: 30px;
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

export const ContainerFormFull = styled.div`
  padding: 25px 30px 30px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Span = styled.span`
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  
`;

export const ContainerInnerFormFull = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 6px;
  line-height: 1;
`;

export const Input = styled.input`
  border: none;
  border-bottom: 2px solid #ccc;
  padding: 8px 4px;
  background: transparent;
  outline: none;
  padding-left: 15px;

  &:focus {
    border-bottom: 2px solid #000;
  }
`;

export const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

export const Link = styled.span`
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;

export const Button = styled.button`
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;