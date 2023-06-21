import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  connecting,
  connectionError,
  creatingUser,
  fetchingTransactions,
  userError,
} from "../redux/notifications";
import Notifications from "./Notifications";
import { fetchedUser } from "../redux/params";

function Connect({ token }) {
  const [loginId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.params);

  const connectUser = {
    loginId,
    password,
    institution: {
      id: "AU00000",
    },
  };

  const initialRender = useRef(true);

  useEffect(() => {
    const createConnection = async () => {
      try {
        await fetch(`https://au-api.basiq.io/users/${userId}/connections`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(connectUser),
        });
        const connections = await fetch(
          `https://au-api.basiq.io/users/${userId}/connections`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const connectionsObject = await connections.json();
        if (connectionsObject.data[0].status === "invalid") {
          throw new Error(
            "Connection can't be established! Please check the user credentials and try again."
          );
        }
        dispatch(fetchingTransactions());
        navigate("/transactions");
      } catch (e) {
        dispatch(connectionError());
        console.error(e);
      }
    };

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      createConnection();
    }
  }, [userId]);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      email: "gavin@hooli.com",
      mobile: "+61410888666",
      firstName: "Gavin",
      lastName: "Belson",
    };

    dispatch(creatingUser());
    try {
      const userResponse = await fetch("https://au-api.basiq.io/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!userResponse.ok) {
        throw new Error("The user can't be created!");
      }
      const userObject = await userResponse.json();
      dispatch(fetchedUser(userObject.id));
      const storageId = JSON.stringify(userObject.id);
      localStorage.setItem("userId", storageId);
      dispatch(connecting());
    } catch (e) {
      dispatch(userError());
      console.error(e);
    }
  };

  return (
    <div className="container m-5">
      <Notifications />
      <div className="row">
        <div className="col-4">
          <h2 className="mb-4">Welcome</h2>
          <form onSubmit={handleSubmit}>
            <div className="d-flex input-group mb-3 mt-1">
              <label htmlFor="userId" className="form-label mt-1" id="mr-small">
                User ID:
              </label>
              <input
                className="form-control"
                type="text"
                id="userId"
                value={loginId}
                onChange={handleUserIdChange}
              />
            </div>
            <div className="d-flex input-group mb-3">
              <label htmlFor="password" className="form-label mt-1">
                Password:
              </label>
              <input
                className="form-control"
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button className="btn btn-primary mt-2 px-4" type="submit">
              Connect
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Connect;
