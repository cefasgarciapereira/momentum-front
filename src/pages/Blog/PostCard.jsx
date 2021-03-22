import { 
  Card,
  Box,
  CardActionArea,
  CardContent,
  Typography
} from '@material-ui/core';
import { capitalizeSlug } from 'utils/helper';
import { usePostCardStyles } from './styles';
import { Link } from 'react-router-dom'; 

export default function PostCard(props) {
  const { data, id } = props;
  const { title, preview, cover, author, date } = data;
  const classes = usePostCardStyles();


  return (
    <Card className={classes.container}>
      <CardActionArea component={Link} to={`/post/${id}`}>
        <img
          className={classes.cover}
          src={cover.url}
          alt="cover"
        />
        <CardContent>
          <Box display="flex" flexDirection="column">
            <Typography gutterBottom variant="h5" component="h2">
              {title[0].text}
            </Typography>
            <Typography variant="caption">
              {capitalizeSlug(author.slug)}
            </Typography>
            <Typography variant="caption">
              {date}
            </Typography>
          </Box>
          <Typography variant="body2" color="textSecondary" component="p">
            {preview[0].text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}