import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider'
import { AppContext } from '../Providers/AppProvider'
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ToolBar from '@material-ui/core/Toolbar'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Tooltip from '@material-ui/core/Tooltip'

import CollectibleSM from './CollectibleSM'
import Draggable from './Draggable'

const styles = (theme =>(
  {
    main:{
      maxHeight: 'calc(100vh - 84px)',
      overflow: 'auto',
    },
    grid:{
      width:'100%',
      padding: '0px 20px',

    },
    toolbar:{
      minHeight:'4vh',
    },
    formControl:{
      margin: theme.spacing(2),
    }
  }
))

export default withStyles(styles)(({items, classes}) => {
  const {authenticated} = useContext(AuthContext)
  const { collection, fetchCollection, sortCollection, updateActiveCollectible, } = useContext(AppContext)
  
  const [key, setKey] = useState('created_at')
  const [direction, setDirection] = useState(1)

  useEffect(()=>{
    sortCollection(key, direction)
  },[key,direction])


  useEffect(()=>{
    if (authenticated && collection.length === 0){
      fetchCollection()
    }
  },[authenticated])

  const handleSortBy1Change = (e) =>{
    setKey(e.target.value)
  }

  const handleDirectionChange = (e) => {
    setDirection(e.target.value)
  }
  
  // linearly stagger drawing the cards
  const delay = (step,interval) => {
    let base = 0;
    return `${base + (interval * (step - 1))}ms`
  }
  
  const sortByItems = [
    <MenuItem value={'name'}>Name</MenuItem>,
    <MenuItem value={'created_at'}>Age</MenuItem>,
    <MenuItem value={'clicks'}>Clicks</MenuItem>,
    <MenuItem value={'level'}>Level</MenuItem>,
  ]
  
  const sortDirections = [
    <MenuItem value={1}>Ascending</MenuItem>,
    <MenuItem value={-1}>Descending</MenuItem>
  ]
  
  const SortControls = (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="sort-by">Sort By</InputLabel>
        <Select 
          labelId="sort-by"
          className={classes.selection}
          value={key}
          onChange={handleSortBy1Change}
        >
          {sortByItems}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="sort-direction">Sort Direction</InputLabel>
        <Select 
          labelId="sort-direction"
          className={classes.selection}
          value={direction}
          onChange={handleDirectionChange}
        >
          {sortDirections}
        </Select>
      </FormControl>
    </>
  )

  const collectibles = (
    collection.map((item,i) =>
      <Grow key={item.id} in={true} style={{ transitionDelay: delay(i,50)}}>
      <Grid item xs={12} sm={6} md={4} lg={2}>
        <Tooltip title="Click to set this as your active collectible!">
          {/* Collectible wrapped in div as functional components dont take refs (req'd for tooltip) */}
          <div>
            <Draggable item={item}>
              <CollectibleSM 
                item={item}
                action={()=>updateActiveCollectible(item.id)}
              />
            </Draggable>
          </div>
        </Tooltip>
      </Grid>
    </Grow>
    )
  )
  
  const Main = () => {
    if (collection.length > 0) {
      return (
        <div className={classes.main}>
          <ToolBar className={ classes.toolbar }>
            {SortControls}
          </ToolBar> 
          <Grid className={ classes.grid } container spacing={1}>
            {collectibles}
          </Grid>
        </div>
      )
    } else {
      return(
        <Typography>Loading Collection...</Typography>
        )
      }
    }
    

    return(
    <Paper elevation={8}>
      <Main />
    </Paper>
  )
})
