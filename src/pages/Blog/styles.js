import { makeStyles } from '@material-ui/core/styles';

export const useBlogStyles = makeStyles((theme) => ({
    postsContainer:{
        '@media(min-width: 960px)':{
            display: 'grid',
            gridTemplateColumns: 'repeat(2,1fr)',
            aligItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
        },

        '@media(min-width: 1280px)':{
            gridTemplateColumns: 'repeat(3,1fr)',
        }
    }
}));

export const usePostCardStyles = makeStyles((theme) => ({
    container: {
        margin: '1rem 0',
    },
    cover: {
        width: '100%',
        maxHeight: '300px',
        objectFit: 'cover'
    }
}));