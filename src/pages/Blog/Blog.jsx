import { useState, useEffect } from 'react'
import {
    Box,
    TextField
} from '@material-ui/core'
import PostCard from './PostCard'
import { getPosts, searchPost } from 'utils/blog'
import { useBlogStyles } from './styles';

let time = null;

export default function Blog() {
    const classes = useBlogStyles();
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts()
            .then(res => {
                setPosts(res.results)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSearch = (searchTerm) => {
        clearTimeout(time);
        time = setTimeout(() => {
            searchPost(searchTerm)
                .then(res => {
                    setPosts(res.results)
                })
                .catch(err => console.log(err))
        }, 700)
    }


    return (
        <Box>
            <TextField
                fullWidth
                id="outlined-basic"
                label="Buscar"
                variant="outlined"
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Buscar" />
            {(!posts.length > 0) && <h3>Nenhum post encontrado.</h3>}
            <Box className={classes.postsContainer}>
                {posts.map(post => (< PostCard key={post.id} id={post.id} data={post.data} />))}
            </Box>
        </Box>
    )
}