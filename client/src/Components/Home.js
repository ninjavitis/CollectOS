import React from 'react';

// Material UI 
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';

// Mooseclicker components
import Moose from './Moose'
import ShopBox from './ShopBox'
import Collection from './Collection'

const styles = (theme => (
  {
    displayArea:{},
    grid:{
      flexWrap: 'wrap',
      padding: '25px',
    },
    shopPanel:{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    moosePanel:{
    }
  }
  ))

export default withStyles(styles)(({classes}) => { 
  return(
    <Grid
      className={classes.grid}
      container
      direction="row"
      spacing={5}
    >
      <Grid item xs={12} lg={8}>
        <Moose className={classes.moosePanel}/>
        <Collection className={classes.collection} />
      </Grid>
      <Grid item xs={12} lg={4}>
        <ShopBox className={classes.shopPanel}/>
      </Grid>
    </Grid>
  )
})

