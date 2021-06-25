import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
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
import { sendMoney, getOperations, getDeposits, newDeposit } from '../services/OpertationService'
import { getCoins } from '../services/CoinService'
import { getUsername } from '../utils';
import FormHelperText from '@material-ui/core/FormHelperText';
import StyledSnackbar from '../components/Snackbar';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function preventDefault(event) {
  event.preventDefault();
}
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
  const [saldos, setSaldos] = useState(false);
  const [coins, setCoins] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [usernameTo, setUsernameTo] = useState("");
  const [amount, setAmount] = useState("");
  const [operations, setOperations] = useState(false);
  const [snack, setSnack] = useState({ "open": false, "severity": "", "message": "" });
  const paper = clsx(classes.paper);
  const username = getUsername();

  const [selectedDepositCoin, setSelectedDepositCoin] = useState(false);
  const [depositAmount, setDepositAmount] = useState(false);
  const [deposits, setDeposits] = useState(false);

  const refreshSaldos = async () => {
    await getSaldos().then(response => {
      setSaldos(response.data)
    })
      .catch(error => {
        setSnack({ "open": true, "severity": "error", "message": error?.response?.data?.message })
      })
  }
  const refreshOperations = async () => {
    await getOperations().then(response => {
      setOperations(response.data)
    })
      .catch(error => {
        setSnack({ "open": true, "severity": "error", "message": error?.response?.data?.message })
      })
  }
  const refreshDeposits = async () => {
    await getDeposits().then(response => {
      setDeposits(response.data)
    })
      .catch(error => {
        setSnack({ "open": true, "severity": "error", "message": error?.response?.data?.message })
      })
  }
  const refreshCoins = async () => {
    await getCoins().then(response => {
      setCoins(response.data)
    })
      .catch(error => {
        setSnack({ "open": true, "severity": "error", "message": error?.response?.data?.message })
      })
  }
  useEffect(async () => {
    if (!(saldos)) {
      await refreshSaldos();
    }

    if (!(operations)) {
      await refreshOperations();
    }
    if (!(coins)) {
      await refreshCoins();
    }
    if (!(deposits)) {
      await refreshDeposits();
    }

  });

  const handleChange = (event) => {
    setSelectedCoin(event.target.value);
  };
  const handleDepositChange = (event) => {
    setSelectedDepositCoin(event.target.value);
  };

  const handleSubmitSend = async (e) => {
    e.preventDefault();
    setSubmited(true)
    if (!(selectedCoin)) return;
    await sendMoney(usernameTo, amount, selectedCoin).then(response => {
      setSnack({ "open": true, "severity": "success", "message": response.data.message })
      setUsernameTo("")
      setAmount("")
      refreshSaldos();
      refreshOperations();
    })
      .catch(error => {
        setSnack({ "open": true, "severity": "error", "message": error.response?.data?.message })
      })
  }
  const handleSubmitDeposit = async (e) => {
    e.preventDefault();
    await newDeposit(depositAmount, selectedDepositCoin).then(response => {
      setSnack({ "open": true, "severity": "success", "message": response.data.message })
      setDepositAmount("")
      refreshSaldos();
      refreshDeposits();
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
            <Title>Nuevo envio de dinero</Title>
            <React.Fragment>
              <form onSubmit={handleSubmitSend}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      required
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      value={usernameTo}
                      id="username"
                      label="Nombre de usuario"
                      name="username"
                      autoComplete="username"
                      onChange={e => setUsernameTo(e.target.value)}

                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      required
                      variant="outlined"
                      margin="normal"
                      type="number"
                      fullWidth
                      value={amount}
                      id="cantidad"
                      label="Cantidad"
                      name="cantidad"
                      autoComplete="cantidad"
                      onChange={e => setAmount(e.target.value)}

                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <FormControl variant="outlined" fullWidth margin="normal">
                      <InputLabel id="demo-simple-select-outlined-label">Moneda</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={selectedCoin}
                        required
                        onChange={handleChange}
                        label="Age"
                        rules={{ required: true }}

                      >
                        {coins ? coins.map((coin) => {
                          return <MenuItem value={coin.id}>{coin.cod}</MenuItem>
                        }) : null}
                      </Select>
                      {(submited && !selectedCoin) && <FormHelperText className={classes.red_amount}>Debe seleccionar una moneda.</FormHelperText>}
                    </FormControl>
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
                      Enviar
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
              <Title>Operaciones Realizadas</Title>
              <Table >
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Usuario</TableCell>
                    <TableCell align="center">Moneda</TableCell>
                    <TableCell align="center">Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {operations ? operations.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      {username == row.user_from.username ?
                        <React.Fragment>
                          <TableCell>Envío</TableCell>
                          <TableCell>{row.user_to.username}</TableCell>
                          <TableCell align="center">{row.coin.cod}</TableCell>
                          <TableCell align="center" className={classes.red_amount}>{row.amount}</TableCell>
                        </React.Fragment>
                        :
                        <React.Fragment>
                          <TableCell>Recepcion</TableCell>
                          <TableCell>{row.user_from.username}</TableCell>
                          <TableCell align="center">{row.coin.cod}</TableCell>
                          <TableCell align="center" className={classes.green_amount}>{row.amount}</TableCell>
                        </React.Fragment>
                      }
                    </TableRow>
                  )) : null}
                </TableBody>
              </Table>
            </React.Fragment>
          </Paper>
        </Grid>
      </Grid>
      <Box pt={4}>
        <Copyright />
      </Box>
    </Container>
  );
}