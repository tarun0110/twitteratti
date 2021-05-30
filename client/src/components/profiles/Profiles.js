import React , {Fragment, useEffect}from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Spinner from '../layout/spinner';
import { getProfiles } from '../../actions/profile';
import profile from '../../reducers/profile';
import  ProfileItem from './ProfileItem';
const Profiles = ({getProfiles, profile: {profiles, loading}}) => {
    
    useEffect(()=>{
        getProfiles();
    }, [getProfiles]);

    return <Fragment>
            {loading ? <Spinner /> : <Fragment> 
                <h1 className = "large text-primary" > Profiles</h1>
                <p className = "lead">
                    <i className= 'fab fa-connectdevelop'></i> Browse and connect with other users
                </p>    
                <div className = "profiles">
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <Fragment>
                            <ProfileItem key = {profile._id} profile = { profile} />
                            </Fragment>
                        ))
                    )
                    : <h4> No profiles found.</h4>}
                    
                </div>
            </Fragment>}
        </Fragment>;
};

Profiles.propTypes = {

}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps,{getProfiles})(Profiles)
