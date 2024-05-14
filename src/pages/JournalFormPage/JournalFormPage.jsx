import './JournalFormPage.scss';
import axios from 'axios';
import { BASE_URL } from '../../config';

export default function JournalFormPage() {
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

        axios.post(`${BASE_URL}/auth/login`, formData)
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                if (error.response?.status === 404) {
                    e.target.email.classList.add('error')
                    e.target.email.setCustomValidity(error.response.data.error)
                    return e.target.email.reportValidity();
                }
                if (error.response?.status === 401) {
                    e.target.password.classList.add('error')
                    e.target.password.setCustomValidity(error.response.data.error)
                    return e.target.password.reportValidity();
                }
                console.error(error);
            })
    }

    function removeError(e) {
        e.target.classList.remove('error')
        e.target.setCustomValidity('')
    }
    return <main className="form_page">
        <div className="form_page-content">
            <h1 className='form_page-title'>Add Journal Article</h1>
            <form action="" className='form' onSubmit={handleSubmit} noValidate>
                <div className="form-field">
                    <label className='form-label' htmlFor="title">Title</label>
                    <input className='form-input' type="text" name='title' placeholder='' onChange={removeError} />
                </div>
                <div className="form-field">
                    <label className='form-label' htmlFor="abstract">Abstract</label>
                    <textarea name="abstract" id="" cols="30" rows="10" className="form-input"></textarea>
                </div>
                <div className="form-field">
                    <label className='form-label' htmlFor="email">Keywords</label>
                    <input className='form-input' type="text" name='keywords' placeholder='' onChange={removeError} />
                </div>
                <div className="form-field">
                    <label className='form-label' htmlFor="dop">Date of Publication</label>
                    <input className='form-input' type="date" name='dop' onChange={removeError} />
                </div>
                <div className="form-field">
                    <label className='form-label' htmlFor="file">Article file</label>
                    <input className='form-input' type="file" name='file' onChange={removeError} />
                </div>
                <button className='form-submit'>Submit</button>
            </form>
        </div>
    </main>
}