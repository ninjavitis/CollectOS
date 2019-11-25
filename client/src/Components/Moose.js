import React, {useContext, useEffect} from 'react';
import axios from 'axios'
import {useState} from 'react'
import {AuthContext} from '../Providers/AuthProvider'
import {MooseContext} from '../Providers/MooseProvider'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/styles';
import {ReactComponent as Moose} from '../Icons/Moose_loose.svg'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import RegistrationForm from './RegistrationForm'
import Paper from '@material-ui/core/Paper'
import ToolBar from '@material-ui/core/ToolBar'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar';


const styles = (theme => ({
  registrationModal:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: theme.palette.background.border,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: theme.palette.background.borderRadius,
    outline: 'none',
  },
  mooseCard: {
    padding:'10px'
  },
  center: {
    alignItems:'center',
    justifyContent:'center',
    justify:'center',
    margin:'auto'
  },
  chip: {
    margin: theme.spacing(1)
  },
}))

export default withStyles(styles)(({classes}) => {
  const {authenticated, remainingClicks, mooseInteraction} = useContext(AuthContext)
  const {activeMoose, getActiveMoose, clearMoose} = useContext(MooseContext)
  const {getClickCount} = useContext(MooseContext)
  const [clicks, setClicks] = useState(0)
  const [level, setLevel] = useState(1)
  
  useEffect(()=>{
    if (authenticated){
      getActiveMoose()
    } else {
      clearMoose()
    }
  },[authenticated])

  const handleClick = () => {
    if(authenticated){
      if(remainingClicks > 0){
        mooseInteraction()
      } else {
        alert('no clicks remaining')
      }
    } else {
      handleModalOpen()
    }
  }

  // Registration Modal Section
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const registerModal = (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.registrationModal}
        open={modalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
      <Fade in={modalOpen}>
        <Paper className={classes.paper}>
          <RegistrationForm handleClose={()=>handleModalClose()}/>
        </Paper>
      </Fade>
    </Modal>
  )

  return(
    <>
      <Card className={classes.mooseCard} border={0} >
        <ToolBar>
          <Chip label={'Name: ' + activeMoose.name } className={classes.chip} />
          <Chip label={'Type: ' + activeMoose.type } className={classes.chip} />
          <Chip 
            avatar={<Avatar>LV</Avatar>}
            label={activeMoose.level}
            className={classes.chip}
          />
          <Chip label={'Clicks: ' + activeMoose.clicks } className={classes.chip} />
          <Chip label={'To next level: ' + activeMoose.clicksToLevel } className={classes.chip} />
          <Chip label={'Age: ' + activeMoose.age } className={classes.chip} />
        </ToolBar>
        <CardActionArea
          onClick={handleClick}
        >
          <CardMedia>
            <Moose />
          </CardMedia>
        </CardActionArea>
        <CardContent>
          Artist: Rick Moosetly
        </CardContent>
      </Card>
      {registerModal}
    </>
  )
})

