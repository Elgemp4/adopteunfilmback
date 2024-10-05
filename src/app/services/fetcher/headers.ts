const headers = {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`       
}

export default headers;