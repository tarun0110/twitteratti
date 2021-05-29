// racfp
import React, {useState, Fragment} from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { createProfile } from '../../actions/profile'

const CreateProfile = ({createProfile, history}) => {
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        phone_number: '',
        bio: ''
    });
    const {age,
        gender,
        phone_number,
        bio,
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
    const onSubmit = e =>{
        e.preventDefault();
        createProfile(formData, history);
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        
        <div className="form-group">
          <input type="text" placeholder="Age" name="age" value={age} onChange={e=>onChange(e)}/>
        </div>
        <div class="form-group">
          <select name="gender" value={gender} onChange={e=>onChange(e)}>
            <option value="0">gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
        </div>
        {/* <div className="form-group">
          <input type="text" placeholder="Gender" name="gender" value={gender} onChange={e=>onChange(e)}/>
          <small className="form-text"
            >male, female, other</small
          > */}
        {/* </div> */}
        <div className="form-group">
          <input type="text" placeholder="Phone_Number" name="phone_number" value={phone_number} onChange={e=>onChange(e)}/>
        </div>
        
        
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e=>onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

      

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
        </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
}


export default connect(null, {createProfile})( withRouter(CreateProfile));
