import { useEffect, useState } from 'react';
import * as Styled from './styled';
import SvgArrow from '../../../SvgAll/SvgArrow/SvgArrow';
import { Url } from '../../../../Utils/Url';
import type { ObjUser } from '../../../InterfaceAll/IObjUser/IObjUser';
import { apiFetch } from '../../../../Api/apiFetch';

const ProfileMain = () => {
    const [birthDate, setBirthDate] = useState("");
    const [cpf, setCpf] = useState("");
    const [showDataUser, setShowDataUser] = useState(true);
    const [userLogin, setUserLogin] = useState<ObjUser | null>(null);
    const [loadInfoUser, setLoadInfoUser] = useState(false);

    const [cpfError, setCpfError] = useState(false);

    const [form, setForm] = useState({
        id: "",
        email: "",
        firstName: "",
        lastName: "",
        cpf: "",
        gender: "",
        cellPhone: "",
        birthDate: ""
    });
    
    
    const formatarTelefone = (value: string) => {
        // 1. Remove tudo que não é número
        const apenasNumeros = value.replace(/\D/g, '');
        console.log(apenasNumeros);
        // 2. Aplica a máscara (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
        return apenasNumeros
        .replace(/^(\d{2})(\d)/g, '($1) $2') // Coloca parênteses no DDD
        .replace(/(\d{5})(\d{4})/, '$1-$2')  // Coloca hífen no número
        .slice(0, 15); // Limita o tamanho máximo
    };

    const [itWasTypeAtLeastOneTimeInCellPhone, setItWasTypeAtLeastOneTimeInCellPhone] = useState(false);

    const handleChangeTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setTelefone(formatarTelefone(e.target.value));

        setItWasTypeAtLeastOneTimeInCellPhone(true);
        setForm((prev) => (
            {
                ...prev,
                ["cellPhone"]: formatarTelefone(e.target.value)
            }
        ))
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        if(name === "birthDate"){
            let numbers = value.replace(/\D/g, "").slice(0, 8);

            if (numbers.length >= 5) {
                numbers = numbers.replace(/(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
            } else if (numbers.length >= 3) {
                numbers = numbers.replace(/(\d{2})(\d+)/, "$1/$2");
            }

            setBirthDate(numbers);

            setForm((prev) => ({
                ...prev,
                [name]: numbers
            }));

        }else {
            setForm((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    }

    const [resultValidateFields, setResultValidateFields] = useState(false);
    const [showLoadInfoUser, setShowLoadInfoUser] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if(userLogin === null) return;

        form["id"] = userLogin.id;

        form["birthDate"] = formatDateBrazil(form["birthDate"]);
        form["cpf"] = cpf;
        setShowLoadInfoUser(true);

        const resultValidate = validateIfAnyFieldIsInvalid();
        setResultValidateFields(resultValidate);

        if(resultValidate){
            setTimeout(() => {
                setShowLoadInfoUser(false);
            }, 500);
            
            return;
        }
            
        const obj = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${userLogin.token}`,
                uid: userLogin.id ?? '',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        }

        const resp = await apiFetch(`${Url}/user/update-user`, obj);

        if (resp.status === 200) {
            const json = await resp.json();
            const data = json.data;
            console.log(data);
            setShowLoadInfoUser(false);
            setShowDataUser((prev) => !prev);
            const obj = {id: data.id, email: data.email, firstName: data.name, lastName: data.lastName,  cpf: data.cpf,  gender: data.gender, cellPhone: data.telephone,  birthDate: data.dateOfBirth};
            setCpf(data.cpf);
            setForm(obj);
        } else if (resp.status === 400) {
            const body = await resp.json();
            const data = body.data;
        }
    }
    
    const validateIfAnyFieldIsInvalid = () => {

        if(cpfError){
            return true;
        }

        if(form.cellPhone.length < 15){
            return true;
        }

        return false;
    }

    const onClickChangeDate = () => {
        setShowDataUser((prev) => !prev);
    }

    const onClickBackDatePersonal = () => {
        setShowDataUser((prev) => !prev);
        const obj = {id: "", email: "", firstName: "", lastName: "",  cpf: "",  gender: "", cellPhone: "",  birthDate: ""};
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
        const obj = {
            headers: {
                Authorization: `Bearer ${user.token}`,
                uid: user.id ?? '',
                'Content-Type': 'application/json',
            }
        };

        const resp = await apiFetch(`${Url}/user/get-info-user/${user.id}`, obj);

        if (resp.status === 200) {
            const json = await resp.json();
            const data = json.data;
            let dataBR = "";

            if(data.dateOfBirth){
                const [year, month, day] = data.dateOfBirth.split("-");
                dataBR = `${day}/${month}/${year}`;
            }

            const obj = {id: data.id, email: data.email, firstName: data.name, lastName: data.lastName,  
                cpf: data.cpf,  gender: data.gender, cellPhone: data.telephone,  birthDate: dataBR};
            
            setBirthDate(obj.birthDate);
            setCpf(data.cpf);

            setForm(obj);
            setLoadInfoUser(true);
            // inserir  nos "Dados pessoais"

        } else if (resp.status === 400) {
            const body = await resp.json();
            const data = body.data;
        }
    }

    const formatDateBrazil = (date: string) => {
        if(!date.includes("/")){
            const [year, month, day] = date.split("-");
            const dataBR = `${day}/${month}/${year}`;
            return dataBR;
        }else {
            return date;
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
       
        if(!isNaN(Number(event.key)) || event.key === "Backspace"){
            setCpf((prev) => {
                let newString = "";

                if(event.key === "Backspace"){
                    const newStringCpf = prev.slice(0, -1);
                    let clean2 = newStringCpf.replace(/[.-]/g, "");

                    if(clean2.length < 11 && clean2.length > 0){
                        setCpfError(true);
                    }else {
                        setCpfError(false);
                    }

                    return newStringCpf;
                }

                let clean = prev.replace(/[.-]/g, "");

                if(clean.length < 11){
                    clean += event.key;
                }
                
                if(clean.length < 11 && clean.length > 0){
                    setCpfError(true);
                }else {
                    setCpfError(false);
                }

                for (let i = 0; i < clean.length; i++) {
                    const element = clean[i];
                    newString += element;

                    if(i === 2 || i === 5){
                        newString += ".";
                    }

                    if(i === 8){
                        newString += "-"; 
                    }
                }

                setForm((prev) => ({
                    ...prev,
                    ["cpf"]: newString
                }));

                return newString;
            });
        }
    };

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
                                                {loadInfoUser && (
                                                    <span>{form.firstName}</span>
                                                )}
                                            </Styled.ContainerFirstLabelAndInfo>
                                            <Styled.ContainerFirstLabelAndInfo>
                                                <label>Sobrenome</label>
                                                {loadInfoUser && (
                                                    <span>{form.lastName}</span>
                                                )}
                                            </Styled.ContainerFirstLabelAndInfo>
                                        </Styled.ContainerInfoInner>

                                         <Styled.ContainerInfoInner>
                                            <Styled.ContainerFirstLabelAndInfo>
                                                <label>CPF</label>
                                                {loadInfoUser && (
                                                    <span>{form.cpf}</span>
                                                )}
                                            </Styled.ContainerFirstLabelAndInfo>
                                            <Styled.ContainerFirstLabelAndInfo>
                                                <label>Gênero</label>
                                                {loadInfoUser && (
                                                    <span>{form.gender === "M" ? "Masculino" : "Feminino"}</span>
                                                )}
                                            </Styled.ContainerFirstLabelAndInfo>
                                        </Styled.ContainerInfoInner>

                                        <Styled.ContainerInfoInner>
                                            <Styled.ContainerFirstLabelAndInfo>
                                                <label>Nascimento</label>
                                                {loadInfoUser && (
                                                    <span>{form.birthDate}</span>
                                                )}
                                            </Styled.ContainerFirstLabelAndInfo>
                                            <Styled.ContainerFirstLabelAndInfo>
                                                <label>Telefone</label>
                                                {loadInfoUser && (
                                                    <span>{form.cellPhone}</span>
                                                )}
                                            </Styled.ContainerFirstLabelAndInfo>
                                        </Styled.ContainerInfoInner>

                                        <Styled.ContainerSecondInfos>
                                            <label>Email</label>
                                            {loadInfoUser && (
                                                <span>{form.email}</span>
                                            )} 
                                        </Styled.ContainerSecondInfos>
                                    </Styled.ContainerFirstInfos>
                                    
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
                                        $nameInput='firstName'
                                        $error={false}
                                        value={form.firstName}
                                        onChange={handleChange}
                                    />
                                    </Styled.FormGroup>

                                    <Styled.FormGroup>
                                    <Styled.Label>Último Nome: *</Styled.Label>
                                    <Styled.Input
                                        name="lastName"
                                        $nameInput='lastName'
                                        $error={false}
                                        value={form.lastName}
                                        onChange={handleChange}
                                    />
                                    </Styled.FormGroup>

                                    <Styled.FormGroup>
                                        <Styled.Label>CPF: *</Styled.Label>
                                        <Styled.Input
                                            name="cpf"
                                            $nameInput='cpf'
                                            $error={cpfError}
                                            value={cpf}
                                            onKeyDown={handleKeyDown}
                                            onChange={handleChange}
                                        />
                                        {cpfError && (
                                            <Styled.SpanError>Valor inválido.</Styled.SpanError>
                                        )}
                                    
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
                                            $nameInput='cellPhone'
                                            $error={false}
                                            value={form.cellPhone}
                                            onChange={handleChangeTwo}
                                            placeholder="(00) 00000-0000"
                                        />

                                        {itWasTypeAtLeastOneTimeInCellPhone && form.cellPhone.length < 15 && (
                                            <Styled.SpanError>Valor inválido.</Styled.SpanError>
                                        )}
                                    </Styled.FormGroup>

                                    <Styled.FormGroup>
                                    <Styled.Label>Nascimento: *</Styled.Label>
                                    <Styled.Input
                                        name="birthDate"
                                        $nameInput='birthDate'
                                        $error={false}
                                        value={birthDate || ""}
                                        onChange={handleChange}
                                    />
                                </Styled.FormGroup>

                                <Styled.Footer>
                                    <Styled.Link>Incluir dados de Pessoa Jurídica</Styled.Link>
                                    <Styled.Button type="submit" onClick={handleSubmit}>
                                        {!showLoadInfoUser && (
                                            <>
                                                Salvar mudanças
                                            </>
                                        )}

                                        {showLoadInfoUser && (
                                            <Styled.LoadingSpinner />
                                        )}
                                        </Styled.Button>
                                   
                                </Styled.Footer>
                            </Styled.ContainerInnerFormFull>
                        </Styled.ContainerFormFull>
                    </Styled.Container>
                )}
        </Styled.ContainerMain>
    )
}

export default ProfileMain;