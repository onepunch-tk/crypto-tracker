import {Outlet} from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;
function Root() {
    return (
        <Container>
            <Outlet/>
        </Container>
    );
}

export default Root;