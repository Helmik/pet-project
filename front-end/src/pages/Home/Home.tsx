import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import HomeCard from '../../components/HomeCard/HomeCard';
import { categoryApi } from '../../api/index';
import CategoryInterface from '../../../../common/interfaces/Category.interface';
import { ResponseCategoriesInterface } from '../../../../common/interfaces/Response.interface';

import './Home.scss';

function Home() {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [t] = useTranslation('global');

  useEffect(() => {
    categoryApi
      .getAllCategories()
      .then((rp: ResponseCategoriesInterface ) => {
        setCategories(rp.categories || []);
      });
  }, [t]);

  return (
    <Box sx={{ flexGrow: 1 }} id="cards-container">
      <Grid container columnSpacing={{ xs: 4, sm: 4, md: 4, lg: 4 }} justifyContent="center" alignItems="stretch">
        {
          categories.map(cat => (
            <Grid key={cat.id} xs={12} sm={6} lg={3}>
              <HomeCard category={cat}/>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
}

export default Home;
