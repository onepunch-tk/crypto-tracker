import styled from "styled-components";
import {IHeaderProps} from "../../utils/coin-module";

const HeaderComponent = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;
function Header(props:IHeaderProps) {
    return (
        <HeaderComponent>
            <Title>{props.title??"Loading..."}</Title>
        </HeaderComponent>
    );
}

export default Header;