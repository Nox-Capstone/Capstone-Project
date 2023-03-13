import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

const Profile = (props) => {
    const { user } = props;
    console.log(user)
    return (
        <div>
            <h2>{user.username}'s Profile</h2>
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
    )
}

export default Profile;