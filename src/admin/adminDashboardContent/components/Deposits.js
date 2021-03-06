import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useState, useEffect } from "react";
import { isAuthenticated } from "../../../auth";
import { listOrders } from "../../apiAdmin";
import moment from "moment";

export default function Deposits() {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // console.log(orders);

  let getTotal = () => {
    let totalSales = 0;
    for (let i = 0; i < orders.length; i++) {
      totalSales += orders[i].amount;
    }
    return totalSales.toFixed(2);
  };

  // console.log(getTotal());

  return (
    <React.Fragment>
      <Title>Total Sales</Title>
      <Typography component="p" variant="h4">
        ${getTotal()}
      </Typography>
      <Typography color="text.secondary">
        per {moment(new Date()).format("DD MMM, YYYY")}
      </Typography>
    </React.Fragment>
  );
}
