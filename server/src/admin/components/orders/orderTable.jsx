// @ts-ignore
import React from 'react'
// @ts-ignore
import moment from 'moment'
import {
  Button,
  DropDown,
  DropDownItem,
  DropDownMenu,
  DropDownTrigger,
  Icon,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@admin-bro/design-system'
import { deliveryStatusType } from '../../helper'

export const IndividualMealsTable = ({sort, onSorting, meals, handleDelivered}) => {
  return (
    <Table style={styles.table}>
      <TableHead>
        <TableRow>
          <TableCell className="main">Order <Icon onClick={() => onSorting('orderId')}
                                                  icon={`Caret${sort['orderId'] === 'desc' ? 'Up' : 'Down'}`}
                                                  color="primary100" ml="default"/></TableCell>
          <TableCell className="main">Dish <Icon onClick={() => onSorting('title')}
                                                 icon={`Caret${sort['title'] === 'desc' ? 'Up' : 'Down'}`}
                                                 color="primary100" ml="default"/></TableCell>
          <TableCell className="main">Quantity</TableCell>
          <TableCell className="main">Delivery Status <Icon onClick={() => onSorting('deliveryStatus')}
                                                            icon={`Caret${sort['deliveryStatus'] === 'desc' ? 'Up' : 'Down'}`}
                                                            color="primary100" ml="default"/></TableCell>
          <TableCell className="main">Address</TableCell>
          <TableCell className="main">Customer</TableCell>
          <TableCell className="main">Delivery Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          meals.map((m, i) => {
            return (
              <TableRow key={i}>
                <TableCell>
                  <Link className="tCNec" href={`/admin/resources/Order/records/${m._id}/show`}>{m._id}</Link>
                </TableCell>
                <TableCell>
                  <Link className="tCNec"
                        href={`/admin/resources/Dish/records/${m.individualMeals._id}/show`}>{m.individualMeals.title}</Link>
                </TableCell>
                <TableCell>{m.individualMeals.quantity}</TableCell>
                <TableCell>
                  <DropDown stick="left">
                    <DropDownTrigger>
                      <Button style={{minHeight: 58}}>
                        {m.deliveryStatus || 'Not Delivered'}
                      </Button>
                    </DropDownTrigger>
                    <DropDownMenu>
                      {
                        Object.values(deliveryStatusType).map(type =>
                          <DropDownItem onClick={() => handleDelivered(m, i, type)}>{type}</DropDownItem>
                        )
                      }
                    </DropDownMenu>
                  </DropDown>
                </TableCell>
                <TableCell>
                  <Link className="tCNec" href={`/admin/resources/Address/records/${m.address._id}/show`}>{m.address.name}</Link>
                </TableCell>
                <TableCell>
                  <Link className="tCNec" href={`/admin/resources/User/records/${m.customer._id}/show`}>{m.customer.name}</Link>
                </TableCell>
                <TableCell>{moment(m.deliveryDate).format('DD MMM YYYY')}</TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
};

export const MealPlansTable = ({sort, onSorting, meals, handleDelivered}) => {
  return (
    <Table style={styles.table}>
      <TableHead>
        <TableRow>
          <TableCell className="main">Order <Icon onClick={() => onSorting('orderId')}
                                                  icon={`Caret${sort['orderId'] === 'desc' ? 'Up' : 'Down'}`}
                                                  color="primary100" ml="default"/></TableCell>
          <TableCell className="main">Dish <Icon onClick={() => onSorting('title')}
                                                 icon={`Caret${sort['title'] === 'desc' ? 'Up' : 'Down'}`}
                                                 color="primary100" ml="default"/></TableCell>
          <TableCell className="main">Label</TableCell>
          <TableCell className="main">Delivery Status <Icon onClick={() => onSorting('deliveryStatus')}
                                                            icon={`Caret${sort['deliveryStatus'] === 'desc' ? 'Up' : 'Down'}`}
                                                            color="primary100" ml="default"/></TableCell>
          <TableCell className="main">Address</TableCell>
          <TableCell className="main">Customer</TableCell>
          <TableCell className="main">Delivery Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          meals.map((meal, i) => {
            const { plan: { items, dayLabel, deliveryDate } } = meal.mealPlans;
            return (
              <TableRow key={i}>
                <TableCell>
                  <Link className="tCNec" href={`/admin/resources/Order/records/${meal._id}/show`}>{meal._id}</Link>
                </TableCell>
                <TableCell>
                  <Link className="tCNec"
                        href={`/admin/resources/Dish/records/${items._id}/show`}>{items.title}</Link>
                </TableCell>
                <TableCell>{`${dayLabel} - ${items.label}`}</TableCell>
                <TableCell>
                  <DropDown stick="left">
                    <DropDownTrigger>
                      <Button style={{minHeight: 58}}>
                        {items.deliveryStatus || 'Not Delivered'}
                      </Button>
                    </DropDownTrigger>
                    <DropDownMenu>
                      {
                        Object.values(deliveryStatusType).map(type =>
                          <DropDownItem onClick={() => handleDelivered(meal, i, type)}>{type}</DropDownItem>
                        )
                      }
                    </DropDownMenu>
                  </DropDown>
                </TableCell>
                <TableCell>
                  <Link className="tCNec" href={`/admin/resources/Address/records/${meal.address._id}/show`}>{meal.address.name}</Link>
                </TableCell>
                <TableCell>
                  <Link className="tCNec" href={`/admin/resources/User/records/${meal.customer._id}/show`}>{meal.customer.name}</Link>
                </TableCell>
                <TableCell>{moment(deliveryDate).format('DD MMM YYYY')}</TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>
  )
}

const styles = {
  table: { marginTop: 50 }
};
