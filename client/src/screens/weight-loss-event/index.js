import React, { useState } from "react";
import { Button, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, } from "reactstrap";
import MenuHeader from "../../components/header/menuHeader";
import AppAlert from "../../components/alert";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { contactSupport } from "../../redux/actions/user";

const WeightLossEvent = () => {

    const { state: { order } = {} } = useLocation();
    const dispatch = useDispatch();
    const { userStatus, currentUser = {} } = useSelector(({ user }) => {
        const { userStatus, currentUser } = user;
        return { userStatus, currentUser };
    });
    const { _id: customer, email = '', name = '' } = currentUser;

    const [contactFields, setContactFields] = useState({
        customer,
        order,
        email,
        name,
        subject: '',
        description: '',
    });

    const handleInputChange = (e) => setContactFields({ ...contactFields, [e.target.name]: e.target.value });

    const handleSupportQuery = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(contactSupport(contactFields));
    };

    return (
        <>
            <MenuHeader />
            <div className="main">
                <div className="section landing-section">
                    
                </div>
            </div>
        </>
    )
}

export default WeightLossEvent;
