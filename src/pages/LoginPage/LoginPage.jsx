import axios from 'axios';
import './LoginPage.scss';
import { BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault();

        const formData = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        if (!formData.email || !e.target.email.checkValidity()) {
            e.target.email.classList.add('error')
            e.target.email.setCustomValidity("Invalid email address")
            return e.target.email.reportValidity();
        }
        if (formData.password.length < 6) {
            e.target.password.classList.add('error')
            e.target.password.setCustomValidity("Password too short")
            return e.target.password.reportValidity();
        }

        axios.post(`http://localhost:8000/auth/login`, formData)
            .then(res => {
                sessionStorage.setItem("token", res.data.token);
                navigate("/add-journal")
            })
            .catch(error => {
                if (error.response?.status === 404) {
                    e.target.email.classList.add('error')
                    e.target.email.setCustomValidity("User not found")
                    return e.target.email.reportValidity();
                }
            })
    }

    function removeError(e) {
        e.target.classList.remove('error')
        e.target.setCustomValidity('')
    }

    return <main className="login_page">
        <div className="login_page-content">
            <h1 className='login_page-title'>Login</h1>
            <form action="" className='form' onSubmit={handleSubmit} noValidate>
                <div className="form-field">
                    <label className='form-label' htmlFor="email">Email</label>
                    <input className='form-input' type="email" name='email' placeholder='Your email' onChange={removeError} />
                </div>
                <div className="form-field">
                    <label className='form-label' htmlFor="password">Password</label>
                    <input className='form-input' type="password" name='password' onChange={removeError} />
                </div>
                <button className='form-submit'>Login</button>
            </form>
        </div>
    </main>
}