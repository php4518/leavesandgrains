import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './news-letter.scss';
import NewsLetterForm from "./news-letter-form";

const NewsLetter = () => {
  return (
		<div className="newsLetter--wrapper">
			<Row className="text-white">
				<Col md={6}>
					<h3 className="section--title text-shadow">We're here for you.</h3>
					<p className="text-shadow">
						Enter your work email to get supply updates and important medical news.
					</p>
				</Col>
				<Col md={6} className="d-flex align-items-center">
					<div className="flex-grow-1">
            <NewsLetterForm />
					</div>
				</Col>
			</Row>
		</div>
  )
};

export default NewsLetter;
