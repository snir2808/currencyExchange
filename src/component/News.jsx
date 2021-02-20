import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React, {useState,useEffect} from 'react'
  import { makeStyles } from '@material-ui/core/styles';
  import Card from '@material-ui/core/Card';
  import CardActionArea from '@material-ui/core/CardActionArea';
  import CardActions from '@material-ui/core/CardActions';
  import CardContent from '@material-ui/core/CardContent';
  import CardMedia from '@material-ui/core/CardMedia';
  import Button from '@material-ui/core/Button';
  import Typography from '@material-ui/core/Typography';
  
  export default function News() {
      const [post, setPost] = useState([])
      
      useEffect(() => {
          var promise = new Promise(function(resolve, reject) {
              var request = new XMLHttpRequest();
              request.open('GET', 'https://newsapi.org/v2/top-headlines?country=us&apiKey=e7d9c538f9e34559a3d950c8adbbe555')
              request.onload = function() {
                  if (request.status == 200) {
                      resolve(request.response); // we got data here, so resolve the Promise
                    } else {
                        reject(Error(request.statusText)); // status is not 200 OK, so reject
                    }
                };
                request.onerror = function() {
                    reject(Error('Error fetching data.')); // error occurred, reject the  Promise
                };
                request.send(); //send the request
        });
        promise.then(function(data) {
            setPost(JSON.parse(data).articles)  
        }, function(error) {
            console.log('error.message');
      })
    }, []);
    
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    
      const withe = "#ffffff"
      const useStyles = makeStyles({
          root: {
              maxWidth: 300,
              height:280,
              marginBottom: 5,
              marginTop: 10,
              boxShadow: "inset 2px -50px 40px -3px rgba(143,143,143,1)",
            },
            media: {
                height: 140,
        },
        title: {
          fontSize: 17,
          padding:2.5,
        },
        description: {
            fontSize: 12,
            padding:2.5,   
        },
        card: {
          margin:0,
          padding:0
        }
    });   
    const classes = useStyles();     
    return (
    <div className="App">
    <h1>News Around The World</h1>
     <Carousel
        arrows={false}
        additionalTransfrom={0}
        autoPlaySpeed={3000}
        centerMode={true}
        customTransition=" 1500ms ease-in-out "
        draggable
        focusOnSelect={true}
        minimumTouchDrag={80}
        renderButtonGroupOutside={true}
        slidesToSlide={1}
        swipeable
        transitionDuration={1000}
        autoPlay = {true}
        responsive={responsive}
        infinite={true}
        >
        {post.map(item =>{
        return (
<div className ='post' onClick = {()=>{ window.open(`${item.url}`)}}>      <Card className={classes.root}>
     <CardActionArea >
        <CardMedia 
            className={classes.media}
            image={`${item.urlToImage}`}
            title="Contemplative Reptile"
        />
        <CardContent className={classes.card}>
            <Typography  className={classes.title} gutterBottom variant="h5" component="h2">
                {item.title}
            </Typography>
            <Typography className={classes.description} variant="body2" color="textSecondary" component="p">
                {item.description}
            </Typography>
        </CardContent>
     </CardActionArea>
    </Card>
</div>
)
})}
</Carousel>
</div>
      )
  }
  