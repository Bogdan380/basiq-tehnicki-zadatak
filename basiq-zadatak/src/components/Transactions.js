import React, { useState, useEffect } from "react";
import TransactionList from "./TransactionList";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "./Notifications";
import { fetchedData, transactionsError } from "../redux/notifications";
import { fetchTransactions, fetchedUser } from "../redux/params";
import Average from "./Average";
import { useNavigate } from "react-router-dom";

function Transactions({ token }) {
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  let { userId, transactions } = useSelector((state) => state.params);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async ({ from, to }) => {
    try {
      const transactionsResponse = await fetch(
        `https://au-api.basiq.io/users/${userId}/transactions`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!transactionsResponse.ok) {
        throw new Error("Error fetching transactions!");
      }
      const transactionsObject = await transactionsResponse.json();
      setData(transactionsObject.data);
      const transactions = transactionsObject.data.slice(from, to);
      dispatch(fetchTransactions(transactions));
      setPagination({ ...pagination, count: transactionsObject.data.length });
      dispatch(fetchedData());
    } catch (e) {
      dispatch(transactionsError());
      console.error(e);
    }
  };

  useEffect(() => {
    dispatch(fetchedUser(JSON.parse(localStorage.getItem("userId"))));
    fetchData({ from: pagination.from, to: pagination.to });
  }, [pagination.from, pagination.to]);

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  return (
    <div className="mx-5 pt-2">
      <div className="row">
        <div className="col-8">
          <Notifications />
          <div className="d-flex w-75">
            <h2 className="my-5">Transactions</h2>
            <button
              type="button"
              className="btn btn-danger px-4 height"
              onClick={() => {
                navigate("/");
                window.location.reload();
              }}
            >
              Back
            </button>
          </div>
          <TransactionList
            transactions={transactions.map((item) => {
              try {
                if (!transactions) {
                  throw new Error("Error!");
                }
                return [
                  item.subClass.title,
                  item.description,
                  item.amount,
                  item.subClass.code,
                ];
              } catch (e) {
                return [];
              }
            })}
          />
          <div className="my-4 container">
            <Pagination
              size="large"
              onChange={handlePageChange}
              count={Math.ceil(pagination.count / pageSize)}
            />
          </div>
        </div>
        <div className="col-4">
          <Average
            transactions={data.map((item) => {
              try {
                if (!data) {
                  throw new Error("Error!");
                }
                return [
                  item.subClass.title,
                  item.description,
                  item.amount,
                  item.subClass.code,
                ];
              } catch (e) {
                return [];
              }
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default Transactions;
