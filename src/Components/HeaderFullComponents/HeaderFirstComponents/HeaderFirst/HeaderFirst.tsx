import SvgArrow from '../../../SvgAll/SvgArrow/SvgArrow';
import * as Styled from './styled';
import { useEffect, useState } from "react";

const HeaderFirst = () => {
    const [slides, setSlides] = useState([
    "Retire nas lojas com Frete Grátis - 1",
    "Retire nas lojas com Frete Grátis - 2",
    "Retire nas lojas com Frete Grátis - 3",
    ]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleTransitionEnd = () => {
        setIsAnimating(false);
        
        setSlides((prev) => {
            const first = prev[0];
            const rest = prev.slice(1);

            return [...rest, first];
        });
    }

    return (
        <Styled.ContainerMain>
            <Styled.ContainerFirst></Styled.ContainerFirst>
            <Styled.ContainerSecond>
                <SvgArrow rotate='0deg'/>
                    <Styled.ContainerContainerInner>
                        <Styled.Slider $animate={isAnimating} onTransitionEnd={handleTransitionEnd}>
                           {slides.map((text, i) => (
                                <Styled.ContainerInnerText key={i}>
                                    <span>{text}</span>
                                </Styled.ContainerInnerText>
                            ))}
                        </Styled.Slider>
                    </Styled.ContainerContainerInner>
                <SvgArrow rotate='180deg'/>
            </Styled.ContainerSecond>
            <Styled.ContainerThird>
                <Styled.Link>Multimarcas</Styled.Link>
                <Styled.Link>Nossas lojas</Styled.Link>
                <Styled.Link>Seja um franqueado</Styled.Link>
            </Styled.ContainerThird>
        </Styled.ContainerMain>
    )
}

export default HeaderFirst;

