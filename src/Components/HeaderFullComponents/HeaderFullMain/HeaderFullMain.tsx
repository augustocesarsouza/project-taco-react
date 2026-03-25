import HeaderFirst from '../HeaderFirstComponents/HeaderFirst/HeaderFirst';
import HeaderSecond from '../HeaderSecondComponents/HeaderSecond/HeaderSecond';
import * as Styled from './styled';

const HeaderFullMain = () => {
  return (
    <Styled.ContainerMain>
      <HeaderFirst />
      <HeaderSecond />

      {/* <HeaderSecondMain></HeaderSecondMain> */}
    </Styled.ContainerMain>
  );
};

export default HeaderFullMain;
