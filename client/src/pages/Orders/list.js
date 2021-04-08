import React, { Component } from 'react';
import moment from "moment";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class OrderList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			showOrder,
			loading,
			orders,
		} = this.props;

		if (loading) {
			return (
				<div className="text-center pt-5 my-5">
					<h3>Loading...</h3>
				</div>
			)
		}

		return (
			<BootstrapTable data={orders}>
				<TableHeaderColumn
					dataField='createdAt'
					dataFormat={(value) => moment(value).format('DD/MM/YYYY HH:mm A')}
				>
					Placed on
				</TableHeaderColumn>
				<TableHeaderColumn dataField='_id' hidden isKey>Order ID</TableHeaderColumn>
				<TableHeaderColumn dataField='business'>Business</TableHeaderColumn>
				<TableHeaderColumn dataField='name'>Ordered By</TableHeaderColumn>
				<TableHeaderColumn dataField='status'>Status</TableHeaderColumn>
				<TableHeaderColumn dataField='amount'>Amount</TableHeaderColumn>
				<TableHeaderColumn
					dataField='acton'
					dataFormat={(col, row) => {
						return (
							<Button size="sm" variant="info" onClick={() => showOrder(row._id)}>
								Details
							</Button>
						)
					}}
				>
					Actions
				</TableHeaderColumn>
			</BootstrapTable>
		);
	}
}

export default OrderList;
