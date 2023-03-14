import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

import Modal from "../components/Modal";
import NewUpdate from "../components/NewUpdate";
import UpdateCard from "../components/UpdateCard";

function Profile() {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(user);

  return (
    <div id="profile">
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
    </div>
  );
  
};

export default Profile;
