import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './styled';
import SvgArrow from '../../../SvgAll/SvgArrow/SvgArrow';
import { useOutletContext } from "react-router-dom";

type ContextType = {
  setActiveWhich: (value: number) => void;
};

const AddressesMain = () => {
    const [showDataAddress, setShowDataAddress] = useState(true);
    const nav = useNavigate();
    const { setActiveWhich } = useOutletContext<ContextType>();


    const onClickBackDatePersonal = () => {
        setShowDataAddress((prev) => !prev);
        const obj = {id: "", email: "", firstName: "", lastName: "",  cpf: "",  gender: "", cellPhone: "",  birthDate: ""};
        // setForm(obj);
    }

    const onClickBackToDataPersonal = () => {
        nav("/account/profile");
        setActiveWhich(0);
    }

    return (
        <Styled.Container>
            <Styled.ContainerMainArrowBackAndButtonAddAddress>
                <Styled.ContainerMainArrowBackAddress onClick={() => onClickBackToDataPersonal()}>
                    <Styled.ContainerArrowGoBack onClick={onClickBackDatePersonal}>
                        <SvgArrow rotate='0deg' width='25px' fill='black'/>
                        <span>Voltar</span>
                    </Styled.ContainerArrowGoBack>
                    <Styled.Title>Endereços</Styled.Title>
                </Styled.ContainerMainArrowBackAddress>

                <Styled.ButtonAddAddress>Adicionar endereço</Styled.ButtonAddAddress>
            </Styled.ContainerMainArrowBackAndButtonAddAddress>
            
            <Styled.ContainerYetDontHaveAddress>
                <span>você ainda não tem endereços cadastrados</span>
            </Styled.ContainerYetDontHaveAddress>
        </Styled.Container>
    )
}

export default AddressesMain;