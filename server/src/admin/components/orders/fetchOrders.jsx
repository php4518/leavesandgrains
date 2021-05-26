// @ts-ignore
import React, {useEffect, useState} from 'react'
import {ApiClient} from 'admin-bro'
// @ts-ignore
import moment from 'moment'
import axios from 'axios'
import {cloneDeep, orderBy} from 'lodash'
import {Box, DatePicker,} from '@admin-bro/design-system'
import {objectToFormData, orderType} from '../../helper'
import {IndividualMealsTable, MealPlansTable} from "./orderTable";

const api = new ApiClient();
const baseUrl = ApiClient.getBaseUrl();
const apiUrl = baseUrl.replace('admin', 'api');

const Orders = ({type}) => {

  const [date, setDate] = useState(moment());
  const [sort, setSort] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allMeals, setAllMeals] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        let response = await axios.get(`${apiUrl}/admin-order/get-order-by-date?date=${date.format('YYYY-MM-DD')}&type=${type}`);
        if (response?.data) {
          setAllMeals(response?.data);
        }
      } catch (error) {
        setError('Unable to fetch orders');
        console.log('Unable to fetch orders', error)
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [date])

  const handleSorting = (type) => {
    sort[type] = sort[type] === 'asc' ? 'desc' : 'asc';
    setSort(sort);
    setAllMeals(orderBy(allMeals, Object.keys(sort), Object.values(sort)));
  };

  const handleDelivered = async (order, mealIndex, status) => {
    const {_id: recordId, index, individualMeals, planIndex, itemIndex} = order;
    const resourceId = 'Order';
    try {
      const orderRecord = await api.recordAction({resourceId, recordId, actionName: 'show'});
      const {data: {record: {params} = {}} = {}} = orderRecord;
      if (params) {
        if (individualMeals) {
          params[`individualMeals.${index}.deliveryStatus`] = status;
        } else {
          params[`mealPlans.${index}.plan.${planIndex}.items.${itemIndex}.deliveryStatus`] = status;
        }
        let data = objectToFormData(params);
        const response = await api.recordAction({
          resourceId, recordId, actionName: 'edit', data,
          headers: {"Content-Type": "multipart/form-data"},
          method: 'POST'
        });
        if (response) {
          let meals = cloneDeep(allMeals);
          if (individualMeals) {
            meals[mealIndex].deliveryStatus = status;
          } else {
            meals[mealIndex].mealPlans.plan.items.deliveryStatus = status;
          }
          setAllMeals(meals);
        }
      }
    } catch (e) {
      console.log('Error: update order status', e);
    }

  };

  if (loading) return <h2 style={styles.title}>Fetching Orders</h2>
  if (error) return <h2 style={styles.title}>{error}</h2>
  return (
    <div>
      <div style={styles.header}>
        <h2 style={styles.title}>
          Orders for {type}: {date.format('DD MMM YYYY')}
          <span style={styles.badge}>
            {allMeals.length}
          </span>
        </h2>
        <div style={{width: 300}}>
          <DatePicker
            value={date}
            onChange={date => setDate(moment(date))}
            shouldCloseOnSelect={true}
            propertyType="date"
          />
        </div>
      </div>

      <Box variant="white">
        {!allMeals.length ? <div>No Orders for: {date.format('DD MMM YYYY')}</div> :
          <div>
            {Object.keys(sort).length ? <span style={styles.badge} onClick={() => setSort({})}>Clear all</span> : null}
            {
              type === orderType.INDIVIDUAL_MEAL ?
                <IndividualMealsTable meals={allMeals} sort={sort} onSorting={handleSorting}
                                      handleDelivered={handleDelivered}/> :
                <MealPlansTable meals={allMeals} sort={sort} onSorting={handleSorting}
                                handleDelivered={handleDelivered}/>
            }
          </div>
        }
      </Box>
    </div>
  )
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3%'
  },
  title: {fontSize: 32, fontWeight: 300},
  badge: {
    borderRadius: 20,
    fontSize: 16,
    display: 'inline',
    marginLeft: 8,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: '#4268F6',
    color: '#ffffff'
  }
}
export default Orders;
