import { useState } from 'react';
import * as Styled from './styled';
import SvgArrow from '../../../SvgAll/SvgArrow/SvgArrow';

const AddressesMain = () => {
    const [showDataAddress, setShowDataAddress] = useState(true);

    const onClickBackDatePersonal = () => {
        setShowDataAddress((prev) => !prev);
        const obj = {id: "", email: "", firstName: "", lastName: "",  cpf: "",  gender: "", cellPhone: "",  birthDate: ""};
        // setForm(obj);
    }

    return (
        <Styled.Container>
            <Styled.ContainerArrowGoBack onClick={onClickBackDatePersonal}>
                <SvgArrow rotate='0deg' width='25px' fill='black'/>
                <span>Voltar</span>
            </Styled.ContainerArrowGoBack>
            <Styled.Title>Endereços</Styled.Title>
        </Styled.Container>
    )
}

export default AddressesMain;