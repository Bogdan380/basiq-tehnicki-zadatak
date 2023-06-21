import React from "react";

function SingleTransaction({ transaction }) {
  return (
    <div className="w-75 shadow-sm p-2 rounded mb-3">
      <table className="table table-borderless">
        <tbody>
          <tr>
            <th className="w-25" scope="row">
              Title:
            </th>
            <td>{transaction[0]}</td>
          </tr>
          <tr>
            <th scope="row">Description:</th>
            <td>{transaction[1]}</td>
          </tr>
          <tr>
            <th scope="row">Amount:</th>
            <td>{transaction[2]}</td>
          </tr>
          <tr>
            <th scope="row">Code:</th>
            <td>{transaction[3]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SingleTransaction;
