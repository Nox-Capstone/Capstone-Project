import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

const Profile = (props) => {
    const { user } = props;
    console.log(user)
    return (
        <div className="profile">
            <div className="userInfo">
            <img src={user.image ? user.image:"https://s.yimg.com/wm/mbr/images/default-profile_192_v0.0.1.png"}/>
            <h2>{user.username}'s Profile</h2>
            <button>change picture</button>
            </div>
            <div className="editSection">
            <button>
                Change Username
            </button>
            <button>
                Change Password
            </button>
            <button>
                Delete Account
            </button>
            </div>
        </div>
    )
}

export default Profile;