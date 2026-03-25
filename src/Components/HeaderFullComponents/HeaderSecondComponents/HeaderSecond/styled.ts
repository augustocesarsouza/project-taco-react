import styled from 'styled-components';

export const ContainerMain = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
`;

export const ContainerNavMain = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0px 48px;
`;

export const ContainerImgTaco = styled.div`
    display: flex;
    width: 94px;
    height: 36px;
    margin-right: 47px;
    cursor: pointer;
`;

export const Img = styled.img`
    width: 100%;
    height: 100%;
`;

export const ContainerNavSecond = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    height: 100%;
`;

interface ContainerSpanNavProps {
    $whichMouseOver: number;
    $index: number;
}

export const ContainerSpanNav = styled.div<ContainerSpanNavProps>`
    display: flex;
    align-items: center;
    height: 100%;
    cursor: pointer;

    &:hover {
        >span {
            text-decoration: ${props => props.$whichMouseOver === props.$index && "underline"};
        }
    }
`;

interface SpanProps {
  $index: number;
}

export const Span = styled.span<SpanProps>`
  display: flex;
  font-size: 14px;
`;

export const SpanMain = styled.span`
`;

export const SpanRed = styled.span`
    display: flex;
    font-size: 14px;
    color: red;
`;

export const ContainerSecondNav = styled.div`
    display: flex;
    gap: 20px;
    padding: 0px 48px;
`;

export const ContainerInputAndLoupe = styled.div`

`;

export const Container = styled.div`
  position: relative;
  width: 300px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 40px 10px 16px;
  border-radius: 25px;
  border: none;
  outline: none;
  background: #f1f1f1;
  font-size: 14px;

  &::placeholder {
    color: #bdbdbd;
  }
`;

export const Icon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #333;
  cursor: pointer;
`;

export const IconWrapper = styled.div`
  position: relative;
  cursor: pointer;
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }
`;

export const UserIcon = styled.div `
  width: 23px;
  height: 23px;
  border: 1px solid #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;


  >svg {
    width: 20px;
    height: 20px;
  }
`

export const SvgUserCircle = styled.svg`
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

export const ContainerUserCircleAll = styled.div`
  display: flex;
  position: relative;
`;

export const ContainerUserCircleModal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  gap: 8px;

  right: -95px;
  top: 55px;

  width: 225px;
  padding: 20px;

  background: white;
  border-radius: 12px;

  box-shadow: -1px 1px 25px rgba(0, 0, 0, 0.15);

  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);

    width: 0;
    height: 0;

    border-left: 18px solid transparent;
    border-right: 18px solid transparent;
    /* border-bottom: 10px solid white; */
    border-bottom: 18px solid white;
    filter: drop-shadow(1px -2px 5px rgba(0,0,0,0.15));
  }
`;

interface ContainerSpanUserCircleProps {
  $index: number;
}

export const ContainerSpanUserCircle = styled.div<ContainerSpanUserCircleProps>`
  display: flex;
  align-items: center;
  cursor: pointer;

  >span {
    font-size: 17px;
    /* color: #000; */
    color: ${props => props.$index >= 1 ? "red" : "#000"};
  }
`;

export const Badge = styled.div`
  position: absolute;
  top: -6px;
  right: -8px;

  background: #000;
  color: #fff;

  font-size: 11px;
  font-weight: 600;

  width: 18px;
  height: 18px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContainerSecondPartIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
`;

// export const Main = styled.main`
//   /* width: 100vw;
//   height: 100vh; */
//   position: relative;
//   background: #f5f5f5;
// `;

// export const Overlay = styled.div`
//   position: fixed;
//   inset: 0;
//   background: rgba(0, 0, 0, 0.4);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// export const Modal = styled.div`
//   width: 200px;
//   height: 200px;
//   background: white;
//   border-radius: 8px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
// `;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ModalProps {
  $width: string;
  $height: string;
}

export const Modal = styled.div<ModalProps>`
  width: 480px; // 480px
  height: ${props => props.$height}; //450px
  background: white;
  border-radius: 6px;
  padding: 32px;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export const Title = styled.h2`
  text-align: center;
  font-weight: 400;
  margin-bottom: 8px;
`;

export const Subtitle = styled.p`
  text-align: center;
  color: #555;
  margin-bottom: 24px;
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 14px;
  background: black;
  color: white;
  border: none;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const SecondaryButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #f3f3f3;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 12px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #eaeaea;
  }
`;

interface SocialButtonProps {
    $buttonNumber: number;
}

export const SocialButton = styled(SecondaryButton)<SocialButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  margin-bottom: ${props => props.$buttonNumber === 2 && "40px"};
`;

export const RegisterText = styled.p`
    text-align: center;
    margin-top: 16px;
    font-size: 16px;
    text-decoration: underline;
    cursor: pointer;

    a {
        text-decoration: underline;
        cursor: pointer;
    }
`;

export const ContainerArrow = styled.div`
  display: flex;
  position: absolute;
  top: 30px;
  left: 30px;
  cursor: pointer;
`;

interface LabelProps {
  $invalidCode: boolean;
}

export const Label = styled.label<LabelProps>`
  display: block;
  margin-bottom: 5px;
  font-size: 14px;

  color: ${props => props.$invalidCode ? "red" : "black"};
`

interface InputEmailProps {
  $invalidCode: boolean;
}

export const InputEmail = styled.input<InputEmailProps>`
  width: 100%;
  padding: 12px;
  /* border: 1px solid #ccc; */
  margin-bottom: 20px;
  font-size: 14px;
  outline: none;

  border: ${props => props.$invalidCode ? "1px solid red" : "1px solid #ccc"} ;
  color: ${props => props.$invalidCode ? "red" : "black"};

  &::placeholder {
    color: ${props => props.$invalidCode ? "red" : "#999"};
  }

`

export const ButtonEmail = styled.button`
  width: 100%;
  padding: 12px;
  background: #111;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 15px;

  &:hover {
    opacity: 0.9; 
  }
`

export const ContainerErrorUser = styled.div`
  display: flex;
  line-height: 1;
`;

