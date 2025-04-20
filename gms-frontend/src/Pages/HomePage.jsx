import React, { useEffect } from 'react'
import axios from 'axios'
import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useContext } from 'react'
import { ContextFunction } from '../Context/Context'



const HomePage = () => {
    const { setCart } = useContext(ContextFunction)
    //let authToken = localStorage.getItem('Authorization')
    useEffect(() => {
        getCart()
        window.scroll(0, 0)
    }, [])

    return (
        <>
            <Container maxWidth='xl' style={{ display: 'flex', justifyContent: "center", padding: 0, flexDirection: "column", marginBottom: 70 }}>
                <Container style={{ marginTop: 90, display: "flex", justifyContent: 'center' }}>
                    <SearchBar />
                </Container>
                <Typography variant='h3' sx={{ textAlign: 'center', marginTop: 10, color: '#1976d2', fontWeight: 'bold' }}>Categories</Typography>
            </Container >
            <CopyRight sx={{ mt: 8, mb: 10 }} />
        </ >
    )
}

export default HomePage