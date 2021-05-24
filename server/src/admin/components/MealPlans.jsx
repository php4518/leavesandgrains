import React from 'react'
import moment from 'moment';
import { Box, Table, TableCaption, Text, TableHead, TableRow, TableCell, TableBody, Link } from '@admin-bro/design-system'
import { unflatten, getDeliveryStatusColor } from '../helper'

const MealPlans = (props) => {
  let { record: { params } } = props
  const { mealPlans = [] } = unflatten(params);

  if(!mealPlans.length) return null;

  return (
    <Box marginBottom="xl" letiant="grey">
      {
        mealPlans.map(({ plan }, i) =>
          <Table style={{marginTop: 50}}>
            <TableCaption>
              <Text as="span">Meal Plans {i + 1}</Text>
            </TableCaption>
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Dish</TableCell>
                <TableCell>Delivery Date</TableCell>
                <TableCell>Delivered Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                plan.map(m => {
                  return m.items.map((a, i) =>
                    <TableRow>
                      <TableCell>{i === 0 ? m.dayLabel : ''}</TableCell>
                      <TableCell>{a.label}</TableCell>
                      <TableCell>
                        <Link className="tCNec" href={`/admin/resources/Dish/records/${a._id}/show`}>{a.title}</Link>
                      </TableCell>
                      <TableCell>{moment(m.deliveryDate).format('DD MMM YYYY')}</TableCell>
                      <TableCell style={{color: getDeliveryStatusColor(a.deliveryStatus)}}>{a.deliveryStatus || 'Not Delivered'}</TableCell>
                    </TableRow>
                  )
                })
              }
            </TableBody>
          </Table>
        )}
    </Box>
  )
}

export default MealPlans
