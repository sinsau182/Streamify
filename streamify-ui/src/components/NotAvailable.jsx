import styled from 'styled-components';

const NotAvailable = () => {
    return (
        <H1 className="not-available">
            No Movies Available for selected genre
        </H1>
    );
}

const H1 = styled.h1`
text-align: center;
color: white;
margin-top: 4rem;
`;

export default NotAvailable;