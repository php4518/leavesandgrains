import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import OrderList from "./list";
import { GetList } from "../../services/order";

class Orders extends Component {
	constructor(props) {
		super(props);

		this.state = {
			orders: [],
			total: 0,
			loading: false,

			message: {
				text: '',
				type: null,
			},

			modal: {
				data: null,
				type: '',
			}
		};
	}

	async componentDidMount() {
		this.loadOrders();
	}

	loadOrders = async () => {
		this.setState({
			loading: true,
			orders: [],
		});

		const data = await GetList();

		if (data.status === 'error') {
			this.setState({
				loading: false,
				message: {
					text: data.message,
					type: 'error',
				},
			});
		}
		else {
			this.setState({
				loading: false,
				orders: data.value.orders,
				total: data.value.total,
				message: {
					text: '',
					type: ''
				}
			});
		}
	}

	showOrder = (orderId) => {
		const {
			orders
		} = this.state;

		const selectedOrder = orders.find(({ _id }) => _id === orderId);

		if (selectedOrder) {
			this.setState({
				modal: {
					data: {
						...selectedOrder,
					},
					type: 'details',
				},
			});
		}
	}

	render() {
		return (
			<div className="order-list p-4">
				<Container className="list-container">
					<Row>
						<Col>
							<OrderList
								{...this.state}
								showOrder={this.showOrder}
							/>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default Orders;
