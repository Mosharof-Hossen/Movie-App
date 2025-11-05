export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}



// const url = 'https://api.themoviedb.org/3/discover/movie?
// include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmRhMzM4ODg3YTk1ZDQwODk4MWY5NzJjOTBiMDk2ZSIsIm5iZiI6MTc2MjMxOTI5MS4yMDYsInN1YiI6IjY5MGFkYmJiZmVmNTQ5ZGUwNDYxM2EwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7v3BZboHUct7Iy9I1hJNaAb8CwSdnDxd4zjvOwM90HI'
//     }
// };

// fetch(url, options)
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.error(err));

export const fetchMovies = async ({query}: {query: string}) => {
    const endPoint = query ? `/search/movie?query=${query}` : `/discover/movie?sort_by=popularity.desc`
    const response = await fetch(endPoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers
    });
    if(!response.ok) {
        throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data;
}