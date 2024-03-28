import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { styled } from "styled-components";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";
import { clearData } from '../store';


const Movies = () => {

    const navigate = useNavigate();

    const [isScrolled, setIsScrolled] = useState(false);

    const genresLoaded = useSelector((state) => state.streamify.genresLoaded);
    const movies = useSelector((state) => state.streamify.movies);
    const genres = useSelector((state) => state.streamify.genres);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGenres());
        return () => dispatch(clearData());

    }, [dispatch]);

    useEffect(() => {
        if (genresLoaded) dispatch(fetchMovies({ type: "tv" }));
        return () => dispatch(clearData());

    }, [dispatch, genresLoaded])

    window.onscroll = () => {
        setIsScrolled(window.scrollY === 0 ? false : true);

        return () => (window.onscroll = null);
    }

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/login");
    })

    return (
        <Container>
            <div className="navbar">
                <Navbar isScrolled={isScrolled} />
            </div>

            <div className="data">
                <SelectGenre genres={genres} type="tv" />
                {
                    movies.length ?
                        (<Slider movies={movies} />) :
                        (<NotAvailable />)
                }
            </div>
        </Container>
    );
}

const Container = styled.div`
.data{
    margin-top: 10rem;
    position: relative;
    z-index: 3;
    .not-available{
        text-align: center;
        color: white;
        margin-top: 4rem;
    }
}
`;

export default Movies;