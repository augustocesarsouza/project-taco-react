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

    const [openAddAddress, setOpenAddAddress] = useState(false);
    const [showYouDontHaveAddress, setShowYouDontHaveAddress] = useState(true);
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState(null);

    const estadosUF = [
    { uf: "AC", nome: "Acre" },
    { uf: "AL", nome: "Alagoas" },
    { uf: "AP", nome: "Amapá" },
    { uf: "AM", nome: "Amazonas" },
    { uf: "BA", nome: "Bahia" },
    { uf: "CE", nome: "Ceará" },
    { uf: "DF", nome: "Distrito Federal" },
    { uf: "ES", nome: "Espírito Santo" },
    { uf: "GO", nome: "Goiás" },
    { uf: "MA", nome: "Maranhão" },
    { uf: "MT", nome: "Mato Grosso" },
    { uf: "MS", nome: "Mato Grosso do Sul" },
    { uf: "MG", nome: "Minas Gerais" },
    { uf: "PA", nome: "Pará" },
    { uf: "PB", nome: "Paraíba" },
    { uf: "PR", nome: "Paraná" },
    { uf: "PE", nome: "Pernambuco" },
    { uf: "PI", nome: "Piauí" },
    { uf: "RJ", nome: "Rio de Janeiro" },
    { uf: "RN", nome: "Rio Grande do Norte" },
    { uf: "RS", nome: "Rio Grande do Sul" },
    { uf: "RO", nome: "Rondônia" },
    { uf: "RR", nome: "Roraima" },
    { uf: "SC", nome: "Santa Catarina" },
    { uf: "SP", nome: "São Paulo" },
    { uf: "SE", nome: "Sergipe" },
    { uf: "TO", nome: "Tocantins" },
    ];

    const [form, setForm] = useState({
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
        nome: "",
    });

    const onClickAddAddress = () => {
        setOpenAddAddress((prev) => !prev);
        setShowYouDontHaveAddress((prev) => !prev);
    }

    const onChangeInputCep = async (e: any) => {
        const formatted = formatCep(e.target.value);
        setCep(formatted);

        const cleanCep = formatted.replace(/\D/g, "");
        if (cleanCep.length === 8) {
            const data = await fetchCep(cleanCep);
            
            if (data) {
                const endereco = data.logradouro;
                const complemento = data.complemento;
                const bairro = data.bairro;
                const cidade = data.localidade;
                const estado = data.uf;

                setForm((prev) => ({
                    ...prev,
                    endereco,
                    complemento,
                    bairro,
                    cidade,
                    estado,
                }));
            }
        }
    }

    const fetchCep = async (cep: string) => {
        try {
            const cleanCep = cep.replace(/\D/g, "");

            if (cleanCep.length !== 8) return null;

            const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
            const data = await response.json();

            if (data.erro) {
            console.log("CEP não encontrado");
            return null;
            }

            return data;
        } catch (error) {
            console.error("Erro ao buscar CEP:", error);
            return null;
        }
    };
    
    const formatCep = (value: string) => {
        const numbers = value.replace(/\D/g, "");

        const limited = numbers.slice(0, 8);

        if (limited.length <= 5) {
            return limited;
        }

        return `${limited.slice(0, 5)}-${limited.slice(5)}`;
    };

     const handleChange = (field: string) => (e: any) => {
        setForm({ ...form, [field]: e.target.value });
    };


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

                <Styled.ButtonAddAddress onClick={onClickAddAddress}>Adicionar endereço</Styled.ButtonAddAddress>
            </Styled.ContainerMainArrowBackAndButtonAddAddress>
            
            {showYouDontHaveAddress && (
                <Styled.ContainerYetDontHaveAddress>
                    <span>você ainda não tem endereços cadastrados</span>
                </Styled.ContainerYetDontHaveAddress>
            )}

            {openAddAddress && (
                 <Styled.ContainerAddAddress>
                    <Styled.CardAddAddress>
                        <Styled.TitleAddAddress>ADICIONAR ENDEREÇO</Styled.TitleAddAddress>

                        <Styled.LabelAddAddress>País: *</Styled.LabelAddAddress>
                        <Styled.SelectAddAddress>
                            <option>Brasil</option>
                        </Styled.SelectAddAddress>

                        <Styled.LabelAddAddress>CEP: *</Styled.LabelAddAddress>
                            <Styled.RowAddAddress>
                            <Styled.InputAddAddress type="text" value={cep} onChange={onChangeInputCep}/>
                            <Styled.CepLinkAddAddress>Não sei meu CEP</Styled.CepLinkAddAddress>
                        </Styled.RowAddAddress>

                         <Styled.Form>
                            <Styled.Label>Endereço: *</Styled.Label>
                            <Styled.Input
                                value={form.endereco}
                                onChange={handleChange("endereco")}
                            />

                            <Styled.Label>Número: *</Styled.Label>
                            <Styled.Input
                                value={form.numero}
                                onChange={handleChange("numero")}
                            />

                            <Styled.Label>Complemento: *</Styled.Label>
                            <Styled.Input
                                value={form.complemento}
                                onChange={handleChange("complemento")}
                            />

                            <Styled.Label>Bairro</Styled.Label>
                            <Styled.Input
                                value={form.bairro}
                                onChange={handleChange("bairro")}
                            />

                            <Styled.Label>Cidade</Styled.Label>
                            <Styled.Input
                                value={form.cidade}
                                onChange={handleChange("cidade")}
                            />

                            <Styled.Label>Estado</Styled.Label>
                            <Styled.Select
                                value={form.estado}
                                onChange={handleChange("estado")}
                            >
                            {estadosUF.map((estado) => (
                                <option key={estado.uf} value={estado.uf}>
                                {estado.uf}
                                </option>
                            ))}
                            </Styled.Select>

                            <Styled.Label>Nome do destinatário: *</Styled.Label>
                            <Styled.Input
                            onChange={handleChange("nome")}
                            />
                        </Styled.Form>

                        <Styled.ButtonConfirmAddress>Confirmar e adicionar</Styled.ButtonConfirmAddress>
                    </Styled.CardAddAddress>
                </Styled.ContainerAddAddress>
            )}
        </Styled.Container>
    )
}

export default AddressesMain;