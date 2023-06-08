import React, { useState, useEffect } from 'react';
import api from '../../api/api';

const Profile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    age: '',
    contactNo: '',
  });
  const [followdisplay, setFollowDisplay] = useState("none");

  useEffect(() => {
    api.get('/api/user/')
      .then(res => {
        console.log(res.data)
        setUser(res.data)
      })
      .catch(err => console.error(err));
  }, [editMode]);

  useEffect(() => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userName: user.userName,
      age: user.age,
      contactNo: user.contactNo,
    });
  }, [user]);

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = e => {
    e.preventDefault();
    api.post('/api/user/edit', formData)
      .then(res => {
        setEditMode(false);
        setUser(res.data);
      })
      .catch(err => {
        console.error(err);
        setEditMode(false);
      });
  };

  const renderProfile = () => (
    <div>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Username: {user.userName}</p>
      <p>Age: {user.age}</p>
      <p>Contact Number: {user.contactNo}</p>
      <button onClick={() => setEditMode(true)}>Edit Profile</button>
    </div>
  );

  const renderEditForm = () => (
    <form onSubmit={handleEditSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
      </label>
      <label>
        Age:
        <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
      </label>
      <label>
        Contact Number:
        <input type="tel" name="contactNo" value={formData.contactNo} onChange={handleInputChange} />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
    </form>
  );

  const renderFollow = () => (
    <>
      <div>
        Followers:
        <button onClick={() => setFollowDisplay("followers")}>
          {user.followers ? user.followers.length : 0}
        </button>
      </div>
      <div>
        Following:
        <button onClick={() => setFollowDisplay("following")}>
          {user.following ? user.following.length : 0}
        </button>
      </div>
    </>
  )

  const removeFollower = async (follower) => {
    console.log("remove follower", follower);
    await api.post('/api/follow/removefollower/' + follower.userid)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const removeFollowing = async (following) => {
    console.log("remove following", following);
    await api.post('/api/follow/removefollowing/' + following.userid)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  const renderFollowDisplay = () => {
    if (followdisplay === "followers" && user.followers) {
      return (
        <div>
          <h2>Followers</h2>
          {user.followers.map(follower => (
            <div key={follower._id}>
              <p>{follower.userName}</p> <button onClick={() => removeFollower(follower)}>Remove</button>
            </div>
          ))}
        </div>
      )
    }
    else if (followdisplay === "following" && user.following) {
      return (
        <div>
          <h2>Following</h2>
          {user.following.map(following => (
            <div key={following._id}>
              <p>{following.userName} </p> <button onClick={() => removeFollowing(following)}>Remove</button>
            </div>
          ))}
        </div>
      )
    }
    else {
      return null;
    }
  }


  return (<>
    <div>
      {editMode ? renderEditForm() : renderProfile()}
      {renderFollow()}
      {renderFollowDisplay()}
    </div>
  </>);
};

export default Profile;
