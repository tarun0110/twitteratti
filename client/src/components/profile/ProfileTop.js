import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({profile: {
    age, 
    gender,
    phone_number,
    bio,
    user: {name, avatar}
}}) => {
    return (
      // <div className="container">
        <div class="profile-top bg-primary p-2">
        <img 
          class="round-img my-1"
          src={avatar}
          alt=""
        />
        <h1 class="large">{name}</h1>
        <p class="lead">{age}, {gender}</p>
        <p>{bio}</p>
      </div>
      // </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop
