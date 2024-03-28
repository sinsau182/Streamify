import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo11 from '../assets/logo11.png'

const Header = ({ login }) => {
    const navigate = useNavigate();

    return (
        <Container className='flex a-center j-between'>
            <div className="logo11">
                <img src={logo11} alt="logo11" />
            </div>
            <button onClick={() => navigate(login ? "/login" : "/signup")} >{login ? "Sign In" : "Sign Up"}</button>
        </Container>
    );
}

const Container = styled.div`
padding: 0 4rem;
.logo{
    img{
        height: 5rem;
    }
}
button{
    padding: 0.5rem 1rem;
    background-color: #01DED7;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
}
`;

export default Header;