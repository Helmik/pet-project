import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import './HomeCard.scss';

function HomeCard(props: any) {
  const { id, description, name, images, url } = props.category;
  const imagesArray = images.split(',');
  const times = [11000, 13000, 17000, 19000, 23000, 29000, 31000];

  const [image, setImage] = useState<string>(imagesArray[Math.floor(Math.random() * imagesArray.length)]);

  function getImage() {
    let img = imagesArray[Math.floor(Math.random() * imagesArray.length)];
    while (img === image) {
      img = imagesArray[Math.floor(Math.random() * imagesArray.length)];
    }
    return img;
  }
  
  useEffect(() => {
    const t = times[Math.floor(Math.random() * times.length)];
    const timer = setTimeout(() =>{
      setImage(getImage());
    }, t);

    return () => {
      clearTimeout(timer)
    };
  });

  return (
    <Link to={url} key={id} className="home-card link-nav">
      <Card className="menu-card">
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`../../assets/img/${image}`}
            alt={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name} {url}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default HomeCard;
