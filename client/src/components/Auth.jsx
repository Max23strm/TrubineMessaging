import {useState} from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import signInImage from '../assets/signup.jpg'

const cookies= new Cookies();

const initialState={
    fullName:'',
    usernam:'',
    password:'',
    confirmPassword:'',
    phoneNumber:'',
    avatarURL:''
}
const Auth = () => {
    const [form, setForm]=useState(initialState)
    const [isSignUp, setIsSignUp]= useState(false)

    const handleChange=(e)=>{
        setForm({...form, [e.target.name]:e.target.value})
    }
    const switchMode=()=>{
        setIsSignUp((prevIsSignup)=>!prevIsSignup)
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
        
        const {fullName, username,password,phoneNumber,avatarURL}=form;

        const URL='http://localhost:5000/auth';

        const {data: {token, userId, hashedPassword}}= await axios.post(`${URL}/${isSignUp ? 'signup' : 'login'}`,{
            username, password, fullName, phoneNumber, avatarURL
        })

        cookies.set('token',token)
        cookies.set('username',username)
        cookies.set('fullName',fullName)
        cookies.set('userId',userId)

        if(isSignUp){
            cookies.set('phoneNumber',phoneNumber)
            cookies.set('avatarURL',avatarURL)
            cookies.set('hashedPassword',hashedPassword)
        }

        window.location.reload();
    }
    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields'>
                <div className='auth__form-container_fields-content'>
                    <p>{isSignUp?'Sign Up':'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignUp&&(
                            <div className='auth__form-container_fields-content_input'> 
                                <label htmlFor="fullname">Full Name</label>
                                <input type="text"
                                    placeholder='Full Name'
                                    onChange={handleChange}
                                    name='fullname'
                                    required/>
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'> 
                            <label htmlFor="username">Username</label>
                            <input type="text"
                                placeholder='Username'
                                onChange={handleChange}
                                name='username'
                                required/>
                        </div>
                        {isSignUp&&(
                            <div className='auth__form-container_fields-content_input'> 
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input type="text"
                                    placeholder='Phone Number'
                                    onChange={handleChange}
                                    name='phoneNumber'
                                    required/>
                            </div>
                        )}
                        {isSignUp&&(
                            <div className='auth__form-container_fields-content_input'> 
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input type="text"
                                    placeholder='Avatar URL'
                                    onChange={handleChange}
                                    name='avatarURL'
                                    required/>
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_input'> 
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                placeholder='Password'
                                onChange={handleChange}
                                name='password'
                                required/>
                        </div>
                        {isSignUp&&(
                            <div className='auth__form-container_fields-content_input'> 
                                <label htmlFor="confirmPassword">Confirm password</label>
                                <input type="password"
                                    placeholder='Confirm password'
                                    onChange={handleChange}
                                    name="confirmPassword"
                                    required/>
                            </div>
                        )}
                        <div className='auth__form-container_fields-content_button'>
                            <button>{isSignUp? 'Sign Up': 'Sign In'}</button>
                        </div>
                    </form>
                    <div className='auth__form-container_fields-account'>
                        <p>
                            {isSignUp
                            ? "Already have an account?"
                            : "Don't have an account?"
                            }
                            <span onClick={switchMode}>
                                {isSignUp?'Sign In' : 'Sign Up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className='auth__form-container_image'>
                <img src={signInImage} alt='sign in'/>
            </div>
        </div>
    )
}

export default Auth