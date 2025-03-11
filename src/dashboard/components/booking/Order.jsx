import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { ordersState } from "../../../store/ordersSlice";
import OrderBrief from "./OrderBrief";

export default function Order({ orderId }) {
  const orders = useSelector(ordersState);
  const [order] = orders.filter((x) => x.id === orderId[0]);

  
  const handleOpen = () => orderId[1](null);

  return (
    <>
      <Dialog open={true} size="xl" handler={handleOpen}>
        <DialogHeader>{order.customer.name}</DialogHeader>
        <DialogBody>
          <OrderBrief order={order}/>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
