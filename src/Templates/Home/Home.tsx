import { createContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { GetUserFromLocalStorage } from '../../Components/LocalStorageFunction/GetUserFromLocalStorage/GetUserFromLocalStorage';
import type { ObjUser } from '../../Components/InterfaceAll/IObjUser/IObjUser';
import * as Styled from './styled';
import HeaderFullMain from '../../Components/HeaderFullComponents/HeaderFullMain/HeaderFullMain';

export interface ContextHomeProps {
  userObj: ObjUser | null;
  // setUserObj: React.Dispatch<React.SetStateAction<ObjUser | null>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ContextHome = createContext<ContextHomeProps | null>(null);

const Home = () => {
  const [userObj, setUserObj] = useState<ObjUser | null>(null);
  const location = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    // const objUser = GetUserFromLocalStorage();

    // if (objUser.isNullUserLocalStorage) {
    //   nav('/login');
    //   return;
    // }

    // if (objUser.user === null) {
    //   localStorage.removeItem('user');

    //   nav('/login');
    //   return;
    // }

    // setUserObj(objUser.user);
  }, [location, nav]);

  return (
    <ContextHome.Provider
      value={{
        userObj: userObj,
      }}
    >
      <Styled.ContainerMain>
        {/* <HeaderMain></HeaderMain>
        <HomeBodyMain></HomeBodyMain> */}
        <Styled.ContainerImg>
          <HeaderFullMain></HeaderFullMain>
        </Styled.ContainerImg>
      </Styled.ContainerMain>
    </ContextHome.Provider>
  );
};

export default Home;
