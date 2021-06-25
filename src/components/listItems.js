import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { useHistory } from "react-router-dom";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

export default function ListItems(props) {
  let history = useHistory()
  const redirectTo = (route) => {
    history.push(route)
  }
  return (
    <div>
    <Divider />
      <List><div>
      <ListItem button onClick={() => redirectTo("/dashboard/wallet")}>
        <ListItemIcon>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText primary="Balances" />
      </ListItem>
      <ListItem button onClick={() => redirectTo("/dashboard/operations")}>
        <ListItemIcon>
          <FormatListBulletedIcon />
        </ListItemIcon>
        <ListItemText primary="Operaciones"  />
      </ListItem>
      <ListItem button onClick={() => redirectTo("/dashboard/deposits")}>
        <ListItemIcon>
          <AccountBalanceIcon />
        </ListItemIcon>
        <ListItemText primary="Depositos"/>
      </ListItem>
      <ListItem button onClick={() => redirectTo("/dashboard/coins")}>
        <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Monedas" />
      </ListItem>
    </div></List>
      <Divider />
      
    </div>
  );
  }