import './JournalPage.scss';
import journalImg from '../../assets/images/cover.jpg';

function Publicher({ publisher }) {
    return <div className='publisher'>
        <div className="publisher__title">{publisher.title}</div>
        <div className="publisher__items">
            {publisher.participants.map((p, i) => (
                <div key={i} className='publisher__participant'>{p}</div>
            ))}
        </div>
    </div>
}

function JournalPage() {
    const publishers = [
        {
            title: "Chief Editor",
            participants: [
                "Prof. Sani Lawal Malunfashi"
            ]
        },
        {
            title: "Associate Chief Editor",
            participants: [
                "Dr. Bashir Bello"
            ]
        },
        {
            title: "Assistant Chief Editor",
            participants: [
                "Dr. Anthony Abah Ebonyi"
            ]
        },
        {
            title: "Managing Editor",
            participants: [
                "Dr. Bojande Tavershima"
            ]
        },
        {
            title: "Business Editor",
            participants: [
                "Saheed Baba Salaudeen"
            ]
        },
    ]

    const journal = {
        contact: {
            email: "journal.sociology@babaahmeduniversity.edu.ng"
        },
        publishers
    }
    return <main className='journal-page'>
        <div className='journal-page__section journal'>
            <img className='journal__image' src={journalImg} alt="Journal" />
            <div className='journal__context'>
                <div className='journal__name'>BAUK JOURNAL OF SOCIOLOGY</div>
                <div className='journal__detail-list'>
                    <div className='journal__detail'>
                        <span className='journal__detail-name'>Published by:</span>
                        <span className='journal__detail-value'>Department of Sociology, Baba-Ahmed University, Kano</span>
                    </div>
                    <div className='journal__detail'>
                        <span className='journal__detail-name'>ISSN(Print):</span>
                        <span className='journal__detail-value'>1595-5680</span>
                    </div>
                    <div className='journal__detail'>
                        <span className='journal__detail-name'>ISSN(Online):</span>
                        <span className='journal__detail-value'>1597-8966</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='journal-page__section'>
            <p className='journal__description'>The Baba-Ahmed University, Kano (BAUK) Journal of Sociology welcomes multidisciplinary contributions that speak to sociological audience drawing from an array of qualitative
                and quantitative methods. The Journal is a peer review journal that is publishes Bi-Annual by the Department of Sociology, Baba-Ahmed University, Kano.
                The Journal publish both theoretical and empirical research works that contribute to knowledge.</p>
        </div>
        <div className='journal-page__section journal-page__section--split'>
            <div className='publishers'>
                <h2 className='publishers__title'>Publishers</h2>
                <div className='publishers-table'>
                    {journal.publishers.map((p, i) => <Publicher publisher={p} key={i} />)}
                </div>
            </div>
            <div className='contacts'>
                <h2 className='contacts__title'>Contact</h2>
                <div>
                    <div className='contact__title'>Email:</div>
                    <div className="contact__items"><a href={`mailto:${journal.contact.email}`}>{journal.contact.email}</a></div>
                </div>
            </div>
        </div>
    </main>
}

export default JournalPage;