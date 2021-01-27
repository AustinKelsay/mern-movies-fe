import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

const Card = styled.div`
    width: 60%;
    color: black;
    border: 1px solid black;
    margin: 1% auto;
    padding: 1%;
    background-image: linear-gradient(140deg, rgb(234, 222, 219) 0%, rgb(188, 112, 164) 50%, rgb(191, 214, 65) 75%)
`

const CardText = styled.p`
    color: black;
    font-weight: bold;
`
const CardHeader = styled.h1`
    margin: 2% auto;
    font-size: 1.7rem;
    color: black;
`

const TimesContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: white;
    width: 95%;
    padding: 1%;
    border: 1px solid black;
    border-radius: 5px;
`

class UpdateMovie extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/movies/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteMovie extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the movie ${this.props.id} permanently?`,
            )
        ) {
            api.deleteMovieById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class MoviesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllMovies().then(movies => {
            this.setState({
                movies: movies.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { movies, isLoading } = this.state
        console.log('TCL: MoviesList -> render -> movies', movies)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                filterable: true,
            },
            {
                Header: 'Time',
                accessor: 'time',
                Cell: props => <span>{props.value.join(' / ')}</span>,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteMovie id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateMovie id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!movies.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    movies.map((movie) => {
                        return(
                            <Card>
                                <CardHeader>{movie.name}</CardHeader>
                                Ratings:
                                <CardText>{movie.rating}</CardText>
                                Showtimes:
                                <TimesContainer>
                                    {movie.time.map((tme) => {
                                        return <CardText>{tme}</CardText>
                                    })}
                                </TimesContainer>
                            </Card>
                        )
                    })
                )}
            </Wrapper>
        )
    }
}

export default MoviesList