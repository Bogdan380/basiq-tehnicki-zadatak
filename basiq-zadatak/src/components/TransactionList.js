import React from "react";
import SingleTransaction from "./SingleTransaction";

function TransactionList({ transactions }) {
  return (
    <div>
      {transactions.map((item, index) => (
        <SingleTransaction key={index} transaction={item} />
      ))}
    </div>
  );
}

export default TransactionList;
