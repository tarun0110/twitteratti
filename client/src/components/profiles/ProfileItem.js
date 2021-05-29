import React from 'react'
import {Link} from  'react-router-dom';
import PropTypes from 'prop-types'

const ProfileItem = ({profile: { 
    user: {_id, name,avatar},
    age,
    gender,
    bio
    }}) => {
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img"/>
            <div>
                <h2>{name}</h2>
                <p>{age} {gender}</p>
                <p className="my-1">{bio}</p>
                <Link to = {`/profile/${_id}`} className="btn btn-primary">
                    View Profile
                </Link>
            </div>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem
