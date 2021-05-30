import React, { Fragment } from 'react'
import {Link} from  'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { follow, unfollow } from '../../actions/profile';
const ProfileItem = ({auth,follow,unfollow, profile: { 
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
                {!auth.loading && auth.user._id!==_id ? <Fragment>{!auth.loading && auth.user._id!==_id && auth.user.following.filter(following=>following.user.toString()===_id).length === 0 ? <button className="btn btn-primary follow123" onClick={e=> {
                    return follow(_id);}}>follow</button>: <button className="btn btn-primary follow123" onClick={e=> {
                        return unfollow(_id);}}>unfollow</button> } </Fragment>  : <Fragment></Fragment>}
                               
            </div>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    follow: PropTypes.func.isRequired,
    unfollow :PropTypes.func.isRequired
}
const mapStateToProps = state=> ({
    auth: state.auth
});
export default connect(mapStateToProps,{follow, unfollow})(ProfileItem);