import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/spinner';
import {Link} from 'react-router-dom'
const Dashboard = ({getCurrentProfile,deleteAccount , auth, profile:{profile, loading}}) => {

    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile])

    return loading && profile === null ? (<Fragment><div className="container"><Spinner /></div></Fragment>) : 
    (<Fragment>
        <div className="container"><i class="fas fa-user"></i>Welcome {auth.user && auth.user.name}
        
        {profile!==null ? <Fragment>
            
          <p>  <Link to='/create-profile' className ="btn btn=primary my-1" >Edit Profile</Link> </p>
            
            </Fragment> : <Fragment>
                
                <p> </p>
                <p>You have not 
            yet setup a profile. Please add some info.</p>
            <Link to='/create-profile' className ="btn btn=primary my-1">Create Profile</Link>
            </Fragment> }
            <div className = "my-2">
                <button className = "btn btn-danger" onClick={() => deleteAccount() }>Delete My Account</button>
            </div>
        </div>
        
    </Fragment>);
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
