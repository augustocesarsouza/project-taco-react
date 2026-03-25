import styled from 'styled-components';


export const ContainerMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  background: #171717;
  color: #fff;
  position: relative;
  user-select: none;
`;

export const ContainerFirst = styled.div`
    display: flex;
    width: 33%;
    z-index: 5;
`;

export const ContainerSecond = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 33%;
    padding: 0px 30px;
    
`;

export const ContainerContainerInner = styled.div`
    overflow: hidden;
    width: 100%;
    /* position: relative; */
    left: 0;
`;

export const Slider = styled.div<{ $animate: boolean }>`
  display: flex;
  width: 300%;

  transition: ${({ $animate }) =>
    $animate ? "transform 0.5s ease-in-out" : "none"};

  transform: ${({ $animate }) =>
    $animate ? "translateX(-33.333%)" : "translateX(0)"};
`;

export const ContainerInnerText = styled.div`
    width: 33.333%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    gap: 10px;
`;

export const ContainerThird = styled.div`
    display: flex;
    justify-content: right;
    align-items: end;
    width: 33%;
    color: #c1c1c1;
    font-size: 12px;
    gap: 30px;
    padding-right: 30px;
    line-height: 1;
    height: 24px;
     
`;

// export const Link = styled.a`
//     display: flex;
//     cursor: pointer;

//     &:hover {
//         color: red;
//     }
// `;

export const Link = styled.span`
  position: relative;
  display: inline-block;
  cursor: pointer;
  padding-bottom: 4px; /* espaço fixo para a linha */

  &:hover {
    color: #fff;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #fff;

    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;