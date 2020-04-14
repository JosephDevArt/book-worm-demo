import React, { useState } from "react";
import { useDispatch, useSelector, batch } from "react-redux";

import defaultUserImg from "./default-user-icon.jpg";

import { setIsAuthorized } from "./../../../actions/userActions";
import { loadReadLaterBooks } from "./../../../actions/readLaterActions";
import { setFollowingUsers } from "./../../../actions/homeActions";

const UserInfo = () => {
  const dispatch = useDispatch();

  const isAuthorized = useSelector((state) => state.user.isAuthorized);

  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const logIn = () => {
    //waiting for facebook response
    setIsAuthorizing(true);
    setTimeout(() => {
      dispatch(setIsAuthorized(true));
      setIsAuthorizing(false);
    }, 1000);
  };

  const logOut = () => {
    // remove all books from ReadLater,
    // remove all users from following
    batch(() => {
      dispatch(setIsAuthorized(false));
      dispatch(loadReadLaterBooks([]));
      dispatch(setFollowingUsers([]));
    });
  };

  let info;

  if (isAuthorized) {
    info = (
      <>
        <p className="user-name">Jordan Peterson</p>
        <img src={defaultUserImg} alt="user" />
        <button className="logout-button" onClick={logOut}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Log out</span>
        </button>
      </>
    );
  } else {
    info = (
      <>
        <p className="user-name">Welcome to Book worm</p>
        <img
          src={defaultUserImg}
          className={isAuthorizing ? "animate-spin" : null}
          alt="user"
        />
        <button className="login-button" onClick={logIn}>
          <i className="fas fa-sign-in-alt"></i>
          <span>Log in</span>
        </button>
      </>
    );
  }
  return <div className="user-account">{info}</div>;
};

export default UserInfo;
