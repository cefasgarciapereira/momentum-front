import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, getAuthor } from 'utils/blog';
import { PrismicText, LoadingScreen } from 'components';
import { Box, Typography, Tooltip, Avatar } from '@material-ui/core';
import { usePostStyles } from './styles';

export default function Post(){
    const { id } = useParams();
    const classes = usePostStyles();
    const [post, setPost] = useState();
    const [author, setAuthor] = useState();

    useEffect(() => {
        getPostById(id)
        .then(res => {
            const newPost = res.results[0].data;
            getAuthor(newPost.author.id)
            .then(res => {
                const newAuthor = res.results[0].data;
                setPost(newPost)
                setAuthor(newAuthor)
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    },[id])

    if(!post || !author) return <LoadingScreen/>

    return(
        <Box className={classes.container}>
            <Box className={classes.inner}>
                <Box display='flex' alignItems="center" justifyContent="center">
                    <Typography className={classes.title} variant="h2" align="center">
                        {post.title[0].text}
                    </Typography>
                </Box>
                    <Box className={classes.authorBox}>
                        <Avatar alt={author.name} src={author.profile_picture.url} />
                        <Box>
                            <Tooltip title={author.bio[0].text}>
                                <Typography className={classes.name}>{author.name}</Typography>
                            </Tooltip>
                            <Typography variant="caption">{post.date}</Typography>
                        </Box>
                    </Box>
                <PrismicText text={post.text}/>
            </Box>
        </Box>
    )
}