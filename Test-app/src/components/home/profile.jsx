import React, { useState } from 'react';

const Profile = (props) => {
    const user = props.location.state;
    return (
        <div className="container">
            <h1>Profile</h1>
            <label>Name: {user.name}</label>
            <label>Email: {user.email}</label>
            <label>Role: {user.role}</label>
        </div>
    );
    
}

export default Profile;