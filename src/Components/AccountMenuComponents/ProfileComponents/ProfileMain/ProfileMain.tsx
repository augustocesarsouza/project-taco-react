import { useEffect, useState } from 'react';
import * as Styled from './styled';
import SvgArrow from '../../../SvgAll/SvgArrow/SvgArrow';
import { Url } from '../../../../Utils/Url';
import type { ObjUser } from '../../../InterfaceAll/IObjUser/IObjUser';

const ProfileMain = () => {
    const [email, setEmail] = useState("augustocesarsantana90@gmail.com");
    const [showDataUser, setShowDataUser] = useState(true);
    const [userLogin, setUserLogin] = useState<ObjUser | null>(null);

    const [form, setForm] = useState({
        id: "",
        firstName: "",
        lastName: "",
        cpf: "",
        gender: "",
        cellPhone: "",
        birthDate: ""
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if(userLogin === null) return;

        form["id"] = userLogin.id;

        const resp = await fetch(`${Url}/user/update-user`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${userLogin.token}`,
                uid: userLogin.id ?? '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        });

        if (resp.status === 200) {
            const json = await resp.json();
            const data = json.data;
            console.log(data);

            // setShowDataUser((prev) => !prev);
            const obj = {id: "", firstName: "", lastName: "",  cpf: "",  gender: "", cellPhone: "",  birthDate: ""};
            setForm(obj);
        } else if (resp.status === 400) {
            const body = await resp.json();
            const data = body.data;
        }
    }

    const onClickChangeDate = () => {
        setShowDataUser((prev) => !prev);
    }

    const onClickBackDatePersonal = () => {
        setShowDataUser((prev) => !prev);
        const obj = {id: "", firstName: "", lastName: "",  cpf: "",  gender: "", cellPhone: "",  birthDate: ""};
        setForm(obj);
    }

    useEffect(() => {
        const userString = localStorage.getItem("userLogin");
        if(userString){
            const user = JSON.parse(userString);
            setUserLogin(user);
            getUserUpdate(user);
        }
        
    }, []);

    const getUserUpdate = async (user: ObjUser ) => {
        const resp = await fetch(`${Url}/user/get-info-user/${user.id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
                uid: user.id ?? '',
                'Content-Type': 'application/json',
            }
        });

        if (resp.status === 200) {
            const json = await resp.json();
            const data = json.data;
            console.log(data);
            // inserir  nos "Dados pessoais"

        } else if (resp.status === 400) {
            const body = await resp.json();
            const data = body.data;
        }
    }

    return (
        <Styled.ContainerMain>
                {showDataUser && (
                    <>
                        <h1>Dados pessoais</h1>
                        <Styled.ContainerInfoUserAndNewsletter>
                                <Styled.ContainerSecondMain>
                                    <Styled.ContainerFirstInfos>
                                        <Styled.ContainerInfoInner>
                                            <Styled.ContainerFirstLabelAndInfo>
                                                <label>Seu nome</label>
                                            </Styled.ContainerFirstLabelAndInfo>
                                            <Styled.ContainerFirstLabelAndInfo>
                                                <label>CPF</label>
                                            </Styled.ContainerFirstLabelAndInfo>
                                            <Styled.ContainerFirstLabelAndInfo>
                                                <label>Nascimento</label>
                                            </Styled.ContainerFirstLabelAndInfo>
                                        </Styled.ContainerInfoInner>
                                        <Styled.ContainerInfoInner>
                                            <Styled.ContainerFirstLabelAndInfo>
                                                <label>Seu nome</label>
                                            </Styled.ContainerFirstLabelAndInfo>
                                            <Styled.ContainerFirstLabelAndInfo>
                                                <label>CPF</label>
                                            </Styled.ContainerFirstLabelAndInfo>
                                            <Styled.ContainerFirstLabelAndInfo>
                                                <label>Nascimento</label>
                                            </Styled.ContainerFirstLabelAndInfo>
                                        </Styled.ContainerInfoInner>
                                    </Styled.ContainerFirstInfos>
                                    <Styled.ContainerSecondInfos>
                                        <label>Email</label>
                                        <span>{email}</span>
                                    </Styled.ContainerSecondInfos>

                                    <Styled.ButtonChangeData onClick={onClickChangeDate}>Alterar dados pessoais</Styled.ButtonChangeData>
                                </Styled.ContainerSecondMain>

                            <Styled.ContainerNewsLetter>
                                <h1>Newsletter</h1>
                            </Styled.ContainerNewsLetter>
                        </Styled.ContainerInfoUserAndNewsletter>
                    </>
                )}
                    {/* !showDataUser */}
                {!showDataUser && (
                     <Styled.Container>
                        <Styled.ContainerArrowGoBack onClick={onClickBackDatePersonal}>
                            <SvgArrow rotate='0deg' width='25px' fill='black'/>
                            <span>Dados pessoais</span>
                        </Styled.ContainerArrowGoBack>
                        <Styled.Title>Alterar dados pessoais</Styled.Title>

                        <Styled.ContainerFormFull>
                            <Styled.Span>Dados pessoais</Styled.Span>

                            <Styled.ContainerInnerFormFull>
                                <Styled.FormGroup>
                                    <Styled.Label>Primeiro Nome: *</Styled.Label>
                                    <Styled.Input
                                        name="firstName"
                                        value={form.firstName}
                                        onChange={handleChange}
                                    />
                                    </Styled.FormGroup>

                                    <Styled.FormGroup>
                                    <Styled.Label>Último Nome: *</Styled.Label>
                                    <Styled.Input
                                        name="lastName"
                                        value={form.lastName}
                                        onChange={handleChange}
                                    />
                                    </Styled.FormGroup>

                                    <Styled.FormGroup>
                                    <Styled.Label>CPF: *</Styled.Label>
                                    <Styled.Input
                                        name="cpf"
                                        value={form.cpf}
                                        onChange={handleChange}
                                    />
                                    </Styled.FormGroup>

                                    <Styled.FormGroup>
                                    <Styled.Label>Gênero:</Styled.Label>
                                    <Styled.Select
                                        name="gender"
                                        value={form.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="">Opcional</option>
                                        <option value="M">Masculino</option>
                                        <option value="F">Feminino</option>
                                    </Styled.Select>
                                    </Styled.FormGroup>

                                    <Styled.FormGroup>
                                    <Styled.Label>Telefone: *</Styled.Label>
                                    <Styled.Input
                                        name="cellPhone"
                                        value={form.cellPhone}
                                        onChange={handleChange}
                                    />
                                    </Styled.FormGroup>

                                    <Styled.FormGroup>
                                    <Styled.Label>Nascimento: *</Styled.Label>
                                    <Styled.Input
                                        type="date"
                                        name="birthDate"
                                        value={form.birthDate}
                                        onChange={handleChange}
                                    />
                                </Styled.FormGroup>

                                <Styled.Footer>
                                    <Styled.Link>Incluir dados de Pessoa Jurídica</Styled.Link>
                                    <Styled.Button type="submit" onClick={handleSubmit}>Salvar mudanças</Styled.Button>
                                </Styled.Footer>
                            </Styled.ContainerInnerFormFull>
                        </Styled.ContainerFormFull>
                    </Styled.Container>
                )}
        </Styled.ContainerMain>
    )
}

export default ProfileMain;