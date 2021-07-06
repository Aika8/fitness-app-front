import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import SaveIcon from '@material-ui/icons/Save';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import {TextField, Breadcrumbs} from '@material-ui/core';
import {Card,CardActionArea ,CardMedia,CardContent, CardActions,Button} from '@material-ui/core'
import './dash.css'
import EService from '../../service';
import {useSnackbar } from 'notistack';
import {Redirect} from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" style={{color:'azure'}}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Maria Plume
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#121212',
    color: '#fff'
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: '#fff',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#90caf9'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: '#424242'
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    color: '#121212',
    fontWeight:'600'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#424242',
    color:'#fff'
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    color:'white'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    color:'white'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    backgroundColor: '#424242',
    color: '#fff',
    height: "100%"
  },
  multilineColor:{
    color:'white'
},
button:{
  margin: theme.spacing(1),
}
}));



export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleBack = () => {
    window.history.back()
  };

  const [title, setTitle] = React.useState('');
  const [cover, setCover] = React.useState('');
  const [brief, setBrief] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const service = new EService();
  const { enqueueSnackbar } = useSnackbar();

  const onChangeTitle = (e) =>{
    setTitle(e.target.value);
  };

  const onChangeCover = (e) =>{
    setCover(e.target.value);
  };


  const onChangeBrief = (e) =>{
    setBrief(e.target.value);
  };

  const onChangeDesc = (e) =>{
    setDesc(e.target.value);
  };


  const onSubmit = (e) =>{
       
    const post ={
      title: title,
      brief: brief,
      description:desc,
      cover: cover,
      priority: 1,
      access: 1
    }
    
    service.addPost(post).then((post)=>{
      if(post.data.id){
        let variant = 'success';
        enqueueSnackbar('new post added!', {variant});
      }else{
        let variant = 'error';
        enqueueSnackbar('something went wrong!', {variant});
      }
      setTitle("");
      setCover("");
      setBrief("");
      setDesc("");
    }

    );


    e.preventDefault();
  };

  if(props.temp === false){
    return <Redirect to ="/login"/>  
  }else{

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)} style={{color: 'dark'}}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} onClick={handleBack} style={{cursor:"pointer"}}>
            Maria Plume
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon style={{color:'azure'}}/>
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
      <form onSubmit={onSubmit}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={5} justify = "center">
            {/* Chart */}
            <Grid item xs={12} md={6} lg={8}>
              <Paper className={classes.paper}>
                    <Typography variant="h6" gutterBottom style={{color: '#90caf9'}}>
                        For Preview Card
                    </Typography>
                    
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                        <TextField
                            required
                            name="title"
                            label="title"
                            fullWidth
                            value={title}
                            onChange={onChangeTitle}
                            InputProps={{
                              classes: {
                                  input: classes.multilineColor
                              }
                          }}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            required
                            name="cover"
                            label="cover"
                            fullWidth
                            value={cover}
                            onChange={onChangeCover}
                            InputProps={{
                              classes: {
                                  input: classes.multilineColor
                              }
                          }}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            required
                            name="brief"
                            label="brief"
                            fullWidth
                            multiline
                            variant="outlined"
                            value={brief}
                            onChange={onChangeBrief}
                            InputProps={{
                              classes: {
                                  input: classes.multilineColor
                              }
                          }}
                            
                        />
                        </Grid>
                    </Grid>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={classes.paper} style={{backgroundColor: '#c79288', color: 'white'}}>
                <Card style={{border:'none', background: 'none', boxShadow: "none", color: 'white'}}>
                      <CardActionArea>
                          <CardMedia
                              component="img"
                              image={cover} 
                          />
                          <CardContent>
                          <Typography gutterBottom variant="h4" style={{fontSize: '2rem', fontWeight: '600', fontFamily:'Poppins'}}>
                              {title}
                          </Typography>
                          <Typography variant="body2" component="p" style={{lineHeight: 'inherit', fontWeight: '600', fontFamily:'Poppins', whiteSpace:'pre-line'}} dangerouslySetInnerHTML={{ __html: brief }}>
                          </Typography>
                          </CardContent>
                      </CardActionArea>
                      <CardActions>
                      </CardActions>
                  </Card>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.paper}>
              <Grid item xs={12}>
                        <TextField
                            required
                            name="description"
                            label="description"
                            fullWidth
                            multiline
                            variant="outlined"
                            value={desc}
                            onChange={onChangeDesc}
                            InputProps={{
                              classes: {
                                  input: classes.multilineColor
                              }
                          }}
                        />
                        </Grid>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper} style={{height: '400',backgroundColor: 'white', color: 'black'}}>
              <div>
                <Container>
                        <div class="row">

                            <div class="col-lg-12">

                                
                        <Breadcrumbs aria-label="breadcrumb" className="mt-4">
                                <Link color="inherit">
                                    Home
                                </Link>
                                <Typography>{title}</Typography>
                            </Breadcrumbs>

                                <h1 class="mt-4"> {title}</h1>

                                <hr/>

                                <div dangerouslySetInnerHTML={{ __html: desc }} style={{whiteSpace:'pre-line'}}>
                                </div>

                            </div>
                        </div>
                </Container>
               </div>
              </Paper>
            </Grid>

              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
                type="submit"
                >
                Save
              </Button>

          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
        </form>
      </main>
    </div>
  );
                        }
}