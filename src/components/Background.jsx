import styled from 'styled-components';

export default function GreyBG() {
    return (
        <GreyBackground />
    )
}

const GreyBackground = styled.div`
    width: 100%;
    height: 100%;
    background-color: #E5E5E5;
    position: fixed;
    top: 0;
    z-index: -1;
`;