import React from 'react';
import {Alert, Spinner} from "reactstrap";
import {STATUS} from "../../helpers/constants";

const AppAlert = ({ alert }) => {
  if(!alert) return null;

  if (alert.status === STATUS.LOADING) {
    return (
      <div className="app-loader mt-3">
        <Spinner color="danger" />
      </div>
    )
  }

  if(!alert.message) return null;
  return (
    <Alert
      className="alert-with-icon mt-3"
      color={(alert.status === STATUS.ERROR) ? "danger" : "success"}
      isOpen={true}
    >
      <div className="alert-wrapper">
        <div className="d-flex justify-content-center">
          <i className={`${alert.status === STATUS.ERROR ? 'fa fa-exclamation-circle' : 'nc-icon nc-bell-55'}`} />
          <span className="ml-2">{alert.message}</span>
        </div>
      </div>
    </Alert>
  )
};

export default AppAlert;
