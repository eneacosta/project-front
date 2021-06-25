import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import Title from '../components/Title';
import { getSaldos } from '../services/UserService';
import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { getCoins, newCoin } from '../services/CoinService'
import StyledSnackbar from '../components/Snackbar';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  red_amount: {
    color: "red"
  },
  green_amount: {
    color: "green"
  },
  send: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Home() {
  const classes = useStyles();
  const [coins, setCoins] = useState(false);
  const [snack, setSnack] = useState({ "open": false, "severity": "", "message": "" });
  const paper = clsx(classes.paper);
  const [name, setName] = useState("")
  const [cod, setCod] = useState("")

  const refreshCoins = async () => {
    await getCoins().then(response => {
      setCoins(response.data)
    })
      .catch(error => {
        setSnack({ "open": true, "severity": "error", "message": error?.response?.data?.message })
      })
  }
  useEffect(async () => {
    if (!(coins)) {
      await refreshCoins();
    }

  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await newCoin(name, cod).then(response => {
      setSnack({ "open": true, "severity": "success", "message": response.data.message })
      setName("")
      setCod("");
      refreshCoins();
    })
      .catch(error => {
        setSnack({ "open": true, "severity": "error", "message": error.response?.data?.message })
      })
  }

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({ ...snack, "open": false });
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <StyledSnackbar open={snack.open} handleClose={handleCloseSnack} severity={snack.severity} message={snack.message} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={paper}>
            <Title>Nueva moneda</Title>
            <React.Fragment>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={5}>
                    <TextField
                      required
                      variant="outlined"
                      margin="normal"
                      type="text"
                      fullWidth
                      value={name}
                      id="cantidad"
                      label="Nombre"
                      name="cantidad"
                      autoComplete="cantidad"
                      onChange={e => setName(e.target.value)}

                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <TextField
                      required
                      variant="outlined"
                      margin="normal"
                      type="text"
                      fullWidth
                      value={cod}
                      id="cantidad"
                      label="Código"
                      name="cantidad"
                      autoComplete="cantidad"
                      onChange={e => setCod(e.target.value)}

                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button
                      type="submit"
                      variant="outlined"
                      size="large"
                      color="primary"
                      margin="normal"
                      fullWidth
                      className={classes.send}
                    >
                      Guardar
                    </Button>
                  </Grid>
                </Grid>
              </form>

            </React.Fragment>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <React.Fragment>
              <Title>Monedas</Title>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell align="center">Código</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {coins ? coins.map((coin) => (
                    <TableRow >
                      <TableCell>{coin.name}</TableCell>
                      <TableCell align="center">{coin.cod}</TableCell>
                    </TableRow>
                  )) : null}
                </TableBody>
              </Table>
            </React.Fragment>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}