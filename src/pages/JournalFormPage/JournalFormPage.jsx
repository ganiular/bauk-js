import './JournalFormPage.scss';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../../providers/MessageProvider/MessageProvider';

export default function JournalFormPage() {
    const token = sessionStorage.getItem('token')
    const navigate = useNavigate()
    const { sendMessage } = useMessage()

    if (!token) {
        navigate('/login')
    }

    function handleSubmit(e) {
        e.preventDefault();

        // const formData = {
        //     title: e.target.title.value.trim(),
        //     abstract: e.target.abstrct.value.trim(),
        //     authors: e.target.authors.value.trim().split(','),
        //     keywords: e.target.keyword.value.trim().split(','),
        //     doi: e.target.doi.value.trim(),
        // }
        const formData = new FormData(e.target);

        axios.post(`${BASE_URL}/articles`, formData, { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                e.target.reset();
                console.log(res);
                sendMessage("Article created successfully")
            })
            .catch(error => {
                if (error.response?.status === 401) {
                    sendMessage("Authentication error", false)
                    return navigate('/login')
                }
                if (error.response?.status === 403) {
                    return sendMessage("Access denied", false)
                }
                if (error.response?.status === 400) {
                    const errors = error.response.data.errors;
                    for (const input of e.target) {
                        const field = errors[input.name];
                        if (field) {
                            input.classList.add('error')
                            input.setCustomValidity(field.message)
                            input.reportValidity();
                        }
                    }
                }
                console.error(error);
            })
    }

    function removeError(e) {
        e.target.classList.remove('error')
        e.target.setCustomValidity('')
    }

    const currentDate = new Date().toISOString().slice(0, 10);

    return <main className="form_page">
        <div className="form_page-content">
            <h1 className='form_page-title'>Add Journal Article</h1>
            <form action="" className='form' onSubmit={handleSubmit}>
                <div className="form-field">
                    <label className='form-label' htmlFor="title">Title <span className='form-required'>(required)</span></label>
                    <input className='form-input' type="text" name='title' placeholder='' required onChange={removeError} />
                </div>
                <div className="form-field">
                    <label className='form-label' htmlFor="abstract">Abstract <span className='form-required'>(required)</span></label>
                    <textarea name="abstract" id="" cols="30" rows="4" className="form-input" required onChange={removeError}></textarea>
                </div>
                <div className="form-field">
                    <label className='form-label' htmlFor="authors">Authors <span className='form-required'>(required)</span></label>
                    <input className='form-input' type="text" name='authors' required placeholder="Enter authors separated by comma" onChange={removeError} />
                </div>
                <div className="form-field">
                    <label className='form-label' htmlFor="doi">Digital Object Identifier <span className='form-optional'>(optional)</span></label>
                    <input className='form-input' type="text" name='doi' placeholder='' onChange={removeError} />
                </div>
                <div className="form-field">
                    <label className='form-label' htmlFor="keywords">Keywords <span className='form-optional'>(optional)</span></label>
                    <input className='form-input' type="text" name='keywords' placeholder="Enter keywords separated by comma" onChange={removeError} />
                </div>
                <div className="form-field">
                    <label className='form-label' htmlFor="dop">Date of Publication <span className='form-optional'>(today as default)</span></label>
                    <input className='form-input' type="date" name='dop' defaultValue={currentDate} onChange={removeError} />
                </div>
                <div className="form-field">
                    <label className='form-label' htmlFor="file">Article file <span className='form-required'>(required)</span></label>
                    <input className='form-input' type="file" name='file' required onChange={removeError} accept='application/pdf' />
                </div>
                <button className='form-submit'>Submit</button>
            </form>
        </div>
    </main>
}