import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserLikedMovies } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { clearData } from "../store";

const UserLiked = () => {
    const navigate = useNavigate();

    const [isScrolled, setIsScrolled] = useState(false);

    const movies = useSelector((state) => state.streamify.movies);
    const [email, setEmail] = useState(undefined);
    const dispatch = useDispatch();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) setEmail(currentUser.email);
        else navigate("/login");
    })


    useEffect(() => {
        if (email) {
            dispatch(getUserLikedMovies(email));
        }
        return () => dispatch(clearData());

    }, [dispatch, email]);


    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);

        return () => (window.onscroll = null);
    }

    return (
        <Container>
            <Navbar isScrolled={isScrolled} />
            <div className="content flex column">
                <h1>My List</h1>
                <div className="grid flex">
                    {movies && movies.map((movie) => (
                        <Card movieData={movie}
                            key={movie.id}
                            isLiked={true} />
                    ))}
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
.content{
    margin: 2.3rem;
    margin-top: 10rem;
    gap: 3rem;
    h1{
        margin-left: 3rem;
    }
    .grid{
        flex-wrap: wrap;
        gap: 1rem;
    }
}
`;

export default UserLiked;