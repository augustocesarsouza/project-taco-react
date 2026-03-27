import { useLayoutEffect, useRef, useState } from 'react';
import * as Styled from './styled';
import { FiHeart, FiSearch, FiShoppingBag, FiUser } from "react-icons/fi";

import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaExclamation } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { Url } from '../../../../Utils/Url';
import { useNavigate } from 'react-router-dom';
import type { ObjUser } from '../../../InterfaceAll/IObjUser/IObjUser';
import { apiFetch } from '../../../../Api/apiFetch';


const HeaderSecond = () => {
    const [spanListNav] = useState<string[]>(["Novidades", "Masculino", "Feminino", "Kids", "Jeans", "Calçados", "Acessórios", "OFF"]);
    const [whichMouseOver, setWhichMouseOver] = useState(-1);

    const onMouseOverContainerSpan = (index: number) => {
        setWhichMouseOver(index);
    }

    const onMouseLeaveContainerSpan = (index: number) => {
        setWhichMouseOver(index);
    }

    const [clickLogin, setClickLogin]= useState(false);
    const [clickUserLogged, setClickUserLogged]= useState(false);
    const [openModalSendCodeEmail, setOpenModalSendCodeEmail]= useState(false);

    const onClickLogin = () => {
        setClickLogin((prev) => !prev);
    }

    const onClickUserLogged = () => {
        setClickUserLogged((prev) => !prev);
    }

    const onClickCloseModalLogin = () => {
        setClickLogin((prev) => !prev);
    }

    const onClickSendCodeEmail = () => {
        setOpenModalSendCodeEmail((prev) => !prev);
        setClickLogin((prev) => !prev);
    }

    const onClickCloseModalSendCodeEmail = () => {
        setOpenModalSendCodeEmail((prev) => !prev);
    }

    const [email, setEmail] = useState("");
    const [openModalTypeCodeSendToEmail, setOpenModalTypeCodeSendToEmail]= useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const resp = await apiFetch(`${Url}/public/user/send-code-email-to-create-account/${email}`);
        
         if (resp.status === 200) {
            const json = await resp.json();
            const data = await json.data;

            setOpenModalTypeCodeSendToEmail((prev) => !prev);
            setOpenModalSendCodeEmail((prev) => !prev);
        } else if (resp.status === 400) {
            const body = await resp.json();
            const data = body.data;
        }
    };

    const [code, setCode] = useState("");
    const inputCodeRef = useRef<HTMLInputElement>(null);
    const spanErrorRef = useRef<HTMLSpanElement>(null);
    const [invalidCode, setInvalidCode] = useState(false);
    const nav = useNavigate();
    const [userLogin, setUserLogin] = useState<ObjUser | null>(null);

    const handleSubmitCode = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInvalidCode(false);

        // setOpenModalTypeCodeSendToEmail((prev) => !prev);
        if(code.length < 6){
            setInvalidCode(true);

            const spanRef = spanErrorRef.current;

            if(spanRef){
                spanRef.textContent = "precisa ter 6 digito";
                spanRef.style.color = "red";
                spanRef.style.marginBottom = "10px";
            }
        }else {
            await fetch(`${Url}/public/user/verify-code-sent-to-email/${email}/${code}`)
            .then((response) => response.json())
            .then((resp: any) => {
                const data = resp.data;
                
                const spanRef = spanErrorRef.current;
                const inputCode = inputCodeRef.current;
                
                if(!data.codeValid){
                    setInvalidCode(!data.codeValid);
                    
                    if(spanRef && inputCode){
                        spanRef.textContent = data.message;
                        spanRef.style.color = "red";
                        spanRef.style.marginBottom = "10px";

                        inputCode.style.marginBottom = "10px";
                    }
                }

                if(data.codeValid){
                    setInvalidCode(false);

                    if(spanRef){
                        spanRef.textContent = "";
                        spanRef.style.color = "#fff";
                        spanRef.style.marginBottom = "0px";
                    }

                    console.log(data.data);
                    
                    setUserLogin(data.data);
                    localStorage.setItem("userLogin", JSON.stringify(data.data));
                    window.location.href = '/';
                }
            }).catch((err) => {
                console.log(err);
            });
            // const json = await res.json();
            // const data = json.data;
            
            // setInvalidCode(data.codeValid);
            
            
        }
    };

    const onClickCloseModalCode = () => {
        cleanSpanInputCodeAndMessage();

        setOpenModalTypeCodeSendToEmail((prev) => !prev);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const onlyNumbers = e.target.value.replace(/\D/g, '');
        const limited = onlyNumbers.slice(0, 6);
        const spanRef = spanErrorRef.current;

        if(limited.length > 5){
            if(spanRef){
                spanRef.textContent = "";
                spanRef.style.color = "#fff";
                spanRef.style.marginBottom = "0px";
            }

            setInvalidCode(false);
        }
        
        setCode(limited);
    };

    const onClickArrowBackFirst = () => {
        setClickLogin((prev) => !prev);
        setOpenModalSendCodeEmail((prev) => !prev);
    }

    const onClickArrowBackSecond = () => {
        cleanSpanInputCodeAndMessage();

        setOpenModalSendCodeEmail((prev) => !prev);
        setOpenModalTypeCodeSendToEmail((prev) => !prev);
        
    }

    const cleanSpanInputCodeAndMessage = () => {
        const spanRef = spanErrorRef.current;
        const inputCode = inputCodeRef.current;

        if(spanRef && inputCode){
            spanRef.textContent = "";
            spanRef.style.color = "#fff";
            spanRef.style.marginBottom = "0px";
            
            setCode("")
        }

        setInvalidCode(false);
    }
 
    useLayoutEffect(() => {
        const userString = localStorage.getItem("userLogin");
        if(userString){
            const user = JSON.parse(userString);
            
            setUserLogin(user);
        }
        
    }, []);

    const onClickProfile = () => {
        nav("/account/");
    };

    const onClickHome = () => {
        nav("/");
    };

    const onClickLogout = () => {
        setUserLogin(null);
        setClickUserLogged(false);
        localStorage.removeItem("userLogin");
        nav("/");
    }

    return (
        <Styled.ContainerMain>
            <Styled.ContainerNavMain>
                <Styled.ContainerImgTaco onClick={onClickHome}>
                    <Styled.Img src="https://taco.vtexassets.com/assets/vtex/assets-builder/taco.store-theme/3.0.1/img/logo-black--new___7d12f25a6ee2537a12efdbf390af763f.png" alt="taco" />
                </Styled.ContainerImgTaco>
                <Styled.ContainerNavSecond>
                    {spanListNav && spanListNav.map((el, i) => (
                        <Styled.ContainerSpanNav onMouseOver={() => onMouseOverContainerSpan(i)} onMouseLeave={() => onMouseLeaveContainerSpan(i)} 
                        $whichMouseOver={whichMouseOver} $index={i} key={i}>
                            <Styled.Span $index={i}>{el}</Styled.Span>

                            {i >= spanListNav.length && (
                                <Styled.SpanRed>OFF</Styled.SpanRed>
                            )}
                        </Styled.ContainerSpanNav>
                    ))}
                </Styled.ContainerNavSecond>
            </Styled.ContainerNavMain>

            <Styled.ContainerSecondNav>
                <Styled.Container>
                    <Styled.Input placeholder="O que você procura?" />
                    <Styled.Icon>
                        <FiSearch size={18} />
                    </Styled.Icon>
                </Styled.Container>

                <Styled.ContainerSecondPartIcons>
                    <Styled.IconWrapper>
                        <FiHeart size={22} />
                    </Styled.IconWrapper>
                    
                    {userLogin === null && (
                        <Styled.IconWrapper onClick={onClickLogin}>
                            <FiUser size={22} />
                        </Styled.IconWrapper>
                    )}
                    {/* <Styled.UserIcon>
                        <FiUser />
                    </Styled.UserIcon> */}

                    {userLogin && (
                        <Styled.ContainerUserCircleAll>
                                <Styled.SvgUserCircle xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" onClick={onClickUserLogged}>
                                    <path d="M470.5 463.6C451.4 416.9 405.5 384 352 384L288 384C234.5 384 188.6 416.9 169.5 463.6C133.9 426.3 112 375.7 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320C528 375.7 506.1 426.2 470.5 463.6zM430.4 496.3C398.4 516.4 360.6 528 320 528C279.4 528 241.6 516.4 209.5 496.3C216.8 459.6 249.2 432 288 432L352 432C390.8 432 423.2 459.6 430.5 496.3zM320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM320 304C297.9 304 280 286.1 280 264C280 241.9 297.9 224 320 224C342.1 224 360 241.9 360 264C360 286.1 342.1 304 320 304zM232 264C232 312.6 271.4 352 320 352C368.6 352 408 312.6 408 264C408 215.4 368.6 176 320 176C271.4 176 232 215.4 232 264z"/>
                                </Styled.SvgUserCircle>

                            {clickUserLogged && (
                                <Styled.ContainerUserCircleModal>
                                    <Styled.ContainerSpanUserCircle $index={0}>
                                        <Styled.SpanMain>Olá, </Styled.SpanMain>
                                        <FaExclamation />
                                    </Styled.ContainerSpanUserCircle>
                                    <Styled.ContainerSpanUserCircle $index={0} onClick={onClickProfile}>
                                        <Styled.SpanMain>Dados Pessoais</Styled.SpanMain>
                                    </Styled.ContainerSpanUserCircle>
                                    <Styled.ContainerSpanUserCircle $index={0}>
                                        <Styled.SpanMain>Meus Endereços</Styled.SpanMain>
                                    </Styled.ContainerSpanUserCircle>
                                    <Styled.ContainerSpanUserCircle $index={0}>
                                        <Styled.SpanMain>Meus Pedidos</Styled.SpanMain>
                                    </Styled.ContainerSpanUserCircle>
                                    <Styled.ContainerSpanUserCircle $index={0}>
                                        <Styled.SpanMain>Minha Lista</Styled.SpanMain>
                                    </Styled.ContainerSpanUserCircle>
                                    <Styled.ContainerSpanUserCircle $index={1}>
                                        <Styled.SpanMain onClick={onClickLogout}>Sair</Styled.SpanMain>
                                    </Styled.ContainerSpanUserCircle>
                                </Styled.ContainerUserCircleModal>
                            )}
                        </Styled.ContainerUserCircleAll>
                    )}
                    
                    {/* tirar isso aqui pegar no9 localStorage o usaurio se esta logado e trocar e tudo mais */}

                    <Styled.IconWrapper>
                        <FiShoppingBag size={22} />
                        <Styled.Badge>0</Styled.Badge>
                    </Styled.IconWrapper>
                </Styled.ContainerSecondPartIcons>
            </Styled.ContainerSecondNav>

            {clickLogin && (
                <Styled.Overlay>
                    <Styled.Modal $width='500px' $height='450px'>
                        <Styled.CloseButton onClick={onClickCloseModalLogin}>X</Styled.CloseButton>

                        <Styled.Title>Bem-vindo</Styled.Title>
                        <Styled.Subtitle>Escolha uma forma de acessar sua conta</Styled.Subtitle>

                        <Styled.PrimaryButton>
                        Entrar com email e senha
                        </Styled.PrimaryButton>

                        <Styled.SecondaryButton onClick={onClickSendCodeEmail}>
                        Receber código de acesso por email
                        </Styled.SecondaryButton>

                        <Styled.SocialButton $buttonNumber={1}>
                        <FcGoogle size={18} />
                        Entrar com Google
                        </Styled.SocialButton>

                        <Styled.SocialButton $buttonNumber={2}>
                        <FaFacebookF size={16} color="#1877F2" />
                        Entrar com Facebook
                        </Styled.SocialButton>

                        <Styled.RegisterText>
                        Não tem uma conta? <a>Cadastre-se</a>
                        </Styled.RegisterText>
                    </Styled.Modal>
                </Styled.Overlay>

            )}

            {openModalSendCodeEmail && (
                <Styled.Overlay>
                    <Styled.Modal $width='500px' $height='280px'>
                        <Styled.CloseButton onClick={onClickCloseModalSendCodeEmail}>X</Styled.CloseButton>
                        <Styled.ContainerArrow onClick={onClickArrowBackFirst}>
                            <FiArrowLeft size={20} />
                        </Styled.ContainerArrow>
                        <Styled.Title>Faça seu login</Styled.Title>
                        <Styled.Subtitle>Receba o código de acesso por e-mail</Styled.Subtitle>

                         <form onSubmit={handleSubmit}>
                            <Styled.Label $invalidCode={false}>Email: *</Styled.Label>
                            <Styled.InputEmail
                                type="email"
                                placeholder="Ex.: exemplo@mail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                $invalidCode={false}
                                required
                            />

                            <Styled.ButtonEmail type="submit">Enviar</Styled.ButtonEmail>
                        </form>
                    </Styled.Modal>
                </Styled.Overlay>
            )}

            {openModalTypeCodeSendToEmail && (
                <Styled.Overlay>
                    <Styled.Modal $width='500px' $height='280px'>
                        <Styled.CloseButton onClick={onClickCloseModalCode}>X</Styled.CloseButton>
                        <Styled.ContainerArrow onClick={onClickArrowBackSecond}>
                            <FiArrowLeft size={20} />
                        </Styled.ContainerArrow>
                        <Styled.Title>Faça seu login</Styled.Title>
                        <Styled.Subtitle>Digite o código enviado para seu email</Styled.Subtitle>

                         <form onSubmit={handleSubmitCode}>
                            <Styled.Label $invalidCode={invalidCode}>Código: *</Styled.Label>
                            <Styled.InputEmail
                                type="text"
                                placeholder="Adicione seu código de acesso"
                                value={code}
                                ref={inputCodeRef}
                                onChange={handleChange}
                                $invalidCode={invalidCode}
                            />

                            <Styled.ContainerErrorUser>
                                <span ref={spanErrorRef}></span>
                            </Styled.ContainerErrorUser>

                            <Styled.ButtonEmail type="submit">Confirmar</Styled.ButtonEmail>
                        </form>
                    </Styled.Modal>
                </Styled.Overlay>
            )}
        </Styled.ContainerMain>
    )
}

export default HeaderSecond;