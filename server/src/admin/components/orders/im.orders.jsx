// @ts-ignore
import React from 'react'
import {orderType} from '../../helper'
import Orders from "./fetchOrders";

const IMOrders = () => <Orders type={orderType.INDIVIDUAL_MEAL}/>

export default IMOrders;
