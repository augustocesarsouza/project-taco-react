import styled from 'styled-components';

export const ContainerMain = styled.div`
  width: 100%;
  
  `;

export const Layout = styled.div`
  display: flex;
  background: #f5f5f5;
  padding: 72px 104px 102px;
`;

export const Sidebar = styled.div`
  /* width: 270px; */
  width: 30%;
  min-height: 100vh;
  
  /* padding: 30px 20px; */
`;

export const UserBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const UserBoxSvg = styled.div`
  display: flex;
  width: 64px;
  height: 64px;
  margin-right: 20px;

  >svg {
    width: 100%;
    height: 100%;
  }
`;

export const Avatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #cfcfcf;
  margin-right: 10px;
`;

export const HelloText = styled.span`
  font-size: 18px;
  color: #333;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuItem = styled.span<{ $active?: number, $index: number }>`
  padding: 10px 10px;
  cursor: pointer;
  color: #333;
  font-size: 18px;
  position: relative;

  &:hover {
    color: #000;
  }

  ${({ $active, $index }) =>
    $active === $index &&
    `
    font-weight: 600;
    
    &:before{
      content:'';
      position:absolute;
      left:-7px;
      top:0;
      width:4px;
      height:100%;
      background:#000;
    }
  `}
`;

export const Logout = styled.span`
  margin-top: 20px;
  color: red;
  cursor: pointer;
`;