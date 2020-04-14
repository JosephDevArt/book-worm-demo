import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { followUser, unfollowUser } from "../../../../actions/homeActions";

import User from "./User/User";

function Users({ users }) {
  const dispatch = useDispatch();

  const { followingUsers, isAuthorized } = useSelector(
    (state) => ({
      followingUsers: state.home.followingUsers,
      isAuthorized: state.user.isAuthorized,
    }),
    shallowEqual
  );

  const followBtnClick = (id) => {
    dispatch(followUser(id));
  };

  const unfollowBtnClick = (id) => {
    dispatch(unfollowUser(id));
  };

  return (
    <div className="users">
      <h1>Users(10)</h1>
      {users.map((item) => (
        <User
          key={item.id}
          id={item.id}
          name={item.name}
          username={item.username}
          isAuthorized={isAuthorized}
          followingUsers={followingUsers}
          catchPhrase={item.company.catchPhrase}
          followBtnClick={(id) => followBtnClick(id)}
          unfollowBtnClick={(id) => unfollowBtnClick(id)}
        />
      ))}
    </div>
  );
}

export default Users;
