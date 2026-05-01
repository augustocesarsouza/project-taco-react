import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Styled from './styled';
import SvgArrow from '../../../SvgAll/SvgArrow/SvgArrow';
import { useOutletContext } from "react-router-dom";
import { Url } from '../../../../Utils/Url';
import { apiFetch } from '../../../../Api/apiFetch';

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

    useEffect(() => {
        const userString = localStorage.getItem("userLogin");
        if(userString){
            const user = JSON.parse(userString);
            checkIfUserHaveAddress(user);
        }
    }, [])

    const checkIfUserHaveAddress = async (user: any) => {
        const obj = {
            headers: {
                Authorization: `Bearer ${user.token}`,
                uid: user.id ?? '',
                'Content-Type': 'application/json',
            }
        };

        const resp = await apiFetch(`${Url}/address/get-info-address-by-user-id/${user.id}`, obj);

        if (resp.status === 200) {
            const json = await resp.json();
            const data = json.data;
            console.log(data);
        }
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