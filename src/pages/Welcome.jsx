import React from "react"
import styled from "styled-components"
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
    margin: 0 auto;
    margin-top: 7%;
    padding: 3%;
    width: 50%;
    height: 60%;
    background-color: rgb(52, 58, 64);
`

const CardText = styled.p`
    color: white;
    font-weight: bold;
`
const CardHeader = styled.h1`
    margin: 2% auto;
    font-size: 1.7rem;
    color: white;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const AddButton = styled.button.attrs({
    className: `btn btn-success`,
})`
    margin: 15px 15px 15px 5px;
`

const Welcome = () => {

    return(
        <Wrapper>
            <CardHeader>Mern Movies</CardHeader>
            <CardText>This is an example app I made to get more experience with the MERN stack and more hands on exposure to MongoDB!</CardText>
                <Link to="/movies/create">
                    <AddButton>
                        Add a movie
                    </AddButton>
                </Link>
            <Link to="/movies/list">
                <Button>
                    See movie list
                </Button>
            </Link>
        </Wrapper>
    )
}

export default Welcome