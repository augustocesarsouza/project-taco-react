import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import * as Styled from './styled';
import Home from '../Home/Home';
import AccountMenuMain from '../../Components/AccountMenuComponents/AccountMenuMain/AccountMenuMain';
import ProfileMain from '../../Components/AccountMenuComponents/ProfileComponents/ProfileMain/ProfileMain';
import AddressesMain from '../../Components/AccountMenuComponents/AddressesComponents/AddressesMain/AddressesMain';
const AppContent = () => {
  document.body.style.overflowY = 'none';

  const location = useLocation();
  useEffect(() => {
    // location.pathname.includes('/filme')
  }, [location]);

  return (
    <Styled.ContainerMain key="">
      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route path="/login" element={<LoginComponentMain />} />
        <Route path="/account" element={<LoginComponentMain />} /> */}

        <Route path="/account" element={<AccountMenuMain />}>
          <Route index element={<Navigate to="profile" />}></Route>
          <Route path="profile" element={<ProfileMain />} />
          <Route path="addresses" element={<AddressesMain />} />
          {/* outros aqui route */}
        </Route>

        {/* <Route path="/signup" element={<Home />} /> -> ESSE AQUI TEM QUE FAZER CADASTRO LÁ NO SITE PARA VER COMO QUE É GRAVA NO OBS */}
        {/* <Route path="/filme/:title" element={<SelectCinema />} /> */}
      </Routes>
    </Styled.ContainerMain>
  );
};
// MyCupons
export default AppContent;
