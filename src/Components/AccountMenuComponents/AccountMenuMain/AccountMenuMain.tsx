import { Outlet, useNavigate } from 'react-router-dom';
import * as Styled from './styled';
import HeaderFullMain from '../../HeaderFullComponents/HeaderFullMain/HeaderFullMain';
import { useEffect, useState } from 'react';
import type { ObjUser } from '../../InterfaceAll/IObjUser/IObjUser';

const AccountMenuMain = () => {
  const nav = useNavigate();

  const [activeWhich, setActiveWhich] = useState(0);
  const [userLogin, setUserLogin] = useState<ObjUser | null>(null);

  const onClickMenu = (index: number) => {
    switch (index) {
      case 0:
        nav("/account/profile");
        setActiveWhich(index);
        break;
      case 1:
        nav("/account/addresses");
        setActiveWhich(index);
        break;
      case 2:
        // nav("");
        setActiveWhich(index);
        break;
      case 3:
        // nav("");
        setActiveWhich(index);
        break;
      case 4:
        // nav("");
        setActiveWhich(index);
        break;
      case 5:
        // nav("");
        setActiveWhich(index);
        break;
    
      default:
        break;
    }
  }

  useEffect(() => {
      const userString = localStorage.getItem("userLogin");
      if(userString){
          const user = JSON.parse(userString);
          setUserLogin(user);
      }
  }, []);

  return (
     <Styled.ContainerMain>
      <HeaderFullMain />

      <Styled.Layout>

        <Styled.Sidebar>

          <Styled.UserBox>
            {/* <Styled.Avatar /> */}
            <Styled.UserBoxSvg>
              <svg className="h-100 w-auto" width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="110" height="110" fill="black" fillOpacity="0"></rect><rect width="110" height="110" fill="black" fillOpacity="0"></rect><path fillRule="evenodd" clipRule="evenodd" d="M55 110C85.3757 110 110 85.3757 110 55C110 24.6243 85.3757 0 55 0C24.6243 0 0 24.6243 0 55C0 85.3757 24.6243 110 55 110Z" fill="#D8D8D8"></path><mask id="mask0" maskUnits="userSpaceOnUse" x="0" y="0" width="110" height="110"><path fillRule="evenodd" clipRule="evenodd" d="M55 110C85.3757 110 110 85.3757 110 55C110 24.6243 85.3757 0 55 0C24.6243 0 0 24.6243 0 55C0 85.3757 24.6243 110 55 110Z" fill="white"></path></mask><g mask="url(#mask0)"><rect width="85.3731" height="96.8655" fill="black" fillOpacity="0" transform="translate(13.1367 21.3433)"></rect><path fillRule="evenodd" clipRule="evenodd" d="M66.4949 78.5818H45.1516C27.4705 78.5818 13.1367 93.0978 13.1367 111.004C13.1367 111.004 29.1442 118.209 55.8233 118.209C82.5024 118.209 98.5098 111.004 98.5098 111.004C98.5098 93.0978 84.1761 78.5818 66.4949 78.5818Z" fill="#979797"></path><path fillRule="evenodd" clipRule="evenodd" d="M30.7969 46C30.7969 32.3824 42.0001 21.3433 55.82 21.3433C69.64 21.3433 80.8432 32.3824 80.8432 46C80.8432 59.6175 69.64 74.1791 55.82 74.1791C42.0001 74.1791 30.7969 59.6175 30.7969 46Z" fill="#979797"></path></g></svg>
            </Styled.UserBoxSvg>
            <Styled.HelloText>Olá! <Styled.SpanHighlight>{userLogin?.name}</Styled.SpanHighlight></Styled.HelloText>
          </Styled.UserBox>

          <Styled.Menu>

            <Styled.MenuItem $active={activeWhich} $index={0} onClick={() => onClickMenu(0)}>
              Dados pessoais
            </Styled.MenuItem>

            <Styled.MenuItem $active={activeWhich} $index={1} onClick={() => onClickMenu(1)}>
              Endereços
            </Styled.MenuItem>

            <Styled.MenuItem $active={activeWhich} $index={2} onClick={() => onClickMenu(2)}>
              Pedidos
            </Styled.MenuItem>

            <Styled.MenuItem $active={activeWhich} $index={3} onClick={() => onClickMenu(3)}>
              Cartões
            </Styled.MenuItem>

            <Styled.MenuItem $active={activeWhich} $index={4} onClick={() => onClickMenu(4)}>
              Autenticação
            </Styled.MenuItem>

            <Styled.MenuItem $active={activeWhich} $index={5} onClick={() => onClickMenu(5)}>
              Favoritos
            </Styled.MenuItem>

            <Styled.Logout>
              Sair
            </Styled.Logout>

          </Styled.Menu>

        </Styled.Sidebar>

        <Outlet />

      </Styled.Layout>

    </Styled.ContainerMain>
  );
};

export default AccountMenuMain;
