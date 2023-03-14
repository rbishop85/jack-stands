import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import Modal from "../components/Modal";
import NewUpdate from "../components/NewUpdate";
import UpdateCard from "../components/UpdateCard";

function Profile() {
  const nav = useNavigate();
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(user);
  console.log(user.updates[0].createdAt);
  const navTo = (location) => {
    console.log(location);
    nav(`${location}`);
  };

  return (
    <div id="profile">
      {Auth.loggedIn() ? (
        <>
          <div>
            Viewing {user.username}'s profile.
          </div>
          <div>
            Email: {user.email}
          </div>
          <div>
            <Modal label={"Add Update"} Content={NewUpdate} data={user.vehicles} />
          </div>
          <div>
            <br></br>
            <div>Recent Updates:</div>
            {user.updates.map(
              ({ _id, title, vehicle, postedDate }) => (
                <UpdateCard
                  key={_id}
                  _id={_id}
                  title={title}
                  vehicle={vehicle}
                  postedDate={postedDate}
                />
              )
            )}
          </div>

        </>
      ) : (
          <Navigate to="/" />
      )}
    </div>
  );
  
};

export default Profile;
