import React from "react";
import { useSelector } from "react-redux";

function Notifications() {
  const {
    user,
    connection,
    transactions,
    connectError,
    userError,
    transactionsError,
  } = useSelector((state) => state.notifications);

  return (
    <div className="m-5">
      {user && (
        <div
          className="d-flex justify-content-center w-50 alert alert-info fs-4"
          role="alert"
        >
          <strong>Creating user ...</strong>
        </div>
      )}
      {connection && (
        <div
          className="d-flex justify-content-center w-50 alert alert-info fs-4"
          role="alert"
        >
          <strong>Connecting ...</strong>
        </div>
      )}
      {transactions && (
        <div
          className="d-flex justify-content-center w-50 alert alert-info fs-4"
          role="alert"
        >
          <strong>Fetching transactions ...</strong>
        </div>
      )}
      {connectError && (
        <div className="center w-50 alert alert-danger fs-5" role="alert">
          <strong>
            Connection can't be established! Please check the user credentials
            and try again.
          </strong>
        </div>
      )}
      {userError && (
        <div className="center w-50 alert alert-danger fs-4" role="alert">
          <strong>The user can't be created!</strong>
        </div>
      )}
      {transactionsError && (
        <div className="center w-50 alert alert-danger fs-4" role="alert">
          <strong>Error fetching transactions!</strong>
        </div>
      )}
    </div>
  );
}

export default Notifications;
