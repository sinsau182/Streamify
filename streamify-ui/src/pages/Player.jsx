import { styled } from "styled-components";
import { BsArrowLeft } from 'react-icons/bs';
import video from '../assets/video.mp4';
import { useNavigate } from "react-router-dom";

const Player = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <div className="player">
                <div className="back">
                    <BsArrowLeft onClick={() => navigate(-1)} />
                </div>
                <video src={video} autoPlay loop
                    controls muted></video>
            </div>
        </Container>
    );
}

const Container = styled.div`
.player{
    width: 100vw;
    height: 100vh;
    .back{
        position: fixed;
        top: 0;
        left: 0;
        padding: 2rem;
        z-index: 1;
        svg{
            font-size: 3rem;
            cursor: pointer;
            border-radius: 100%;
            padding: 0.2rem;
            transition: 0.3s ease-in-out;
        }
    }
    video{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
`;

export default Player;