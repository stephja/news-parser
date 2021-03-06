import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import ShareIcon from '@material-ui/icons/Share';
import CardActionArea from '@material-ui/core/CardActionArea';
import moment from 'moment';
import './article.css';

const styles = theme => ({
  card: {
    // maxWidth: 750,
    marginBottom: '25px;',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
});

function Article(props) {
  const { classes } = props;
  const article = props.article;

  return (
    <Card className={classes.card}>
      <a href={article.url} target='_blank' rel='noopener noreferrer'>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={article.urlToImage}
            title={article.title}
            alt='/'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {article.title}
            </Typography>
            <Typography component='p' className='card-text'>
              {article.description}
            </Typography>
            <Typography component='p' className='publish-date'>
              {`${article.source.name} · ${moment(article.publishedAt).fromNow()}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </a>
    </Card>
  );
}

export default withStyles(styles)(Article);
