import React from 'react'
import moment from 'moment';
import { sortBy } from 'lodash';
import { Box, Table, TableCaption, Text, TableHead, TableRow, TableCell, TableBody, Link } from '@admin-bro/design-system'
import {getDeliveryStatusColor, unflatten} from '../helper'

const IndividualMeals = (props) => {

  let { record: { params } } = props
  let { individualMeals = [] } = unflatten(params);

  if(!individualMeals.length) return null;

  individualMeals = sortBy(individualMeals, ['deliveryDate']);

  return (
    <Box marginBottom="xxl" variant="grey">
      <Table style={{marginTop: 50}}>
        <TableCaption>
          <Text as="span">Individual Meals</Text>
        </TableCaption>
        <TableHead>
          <TableRow>
            <TableCell>Dish ID</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Delivery Date</TableCell>
            <TableCell>Delivered Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            individualMeals.map(m =>
              <TableRow>
                <TableCell>
                  <Link className="tCNec" href={`/admin/resources/Dish/records/${m._id}/show`}>{m.title}</Link>
                </TableCell>
                <TableCell>{m.quantity}</TableCell>
                <TableCell>{moment(m.deliveryDate).format('DD MMM YYYY')}</TableCell>
                <TableCell style={{color: getDeliveryStatusColor(m.deliveryStatus)}}>{m.deliveryStatus || 'Not Delivered'}</TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </Box>
  )
}

export default IndividualMeals
