import './JournalPage.scss';
import journalImg from '../../assets/images/cover.jpg';

function Publicher({ publisher }) {
    return <div className='publisher'>
        <div className="publisher__title">{publisher.title}</div>
        <div className="publisher__items">
            {publisher.participants.map((p, i) => (
                <div className='publisher__participant'>{p}</div>
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
            title: "Assistance Chief Editor",
            participants: [
                "Dr. Anthony Abah Ebonyi"
            ]
        },
        {
            title: "Managing Editor",
            participants: [
                "Dr. Bojande Tavershima", "Dr. Bojande Tavershima"
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
                <div className='journal__name'>Journal Name Here</div>
                <div className='journal__detail-list'>
                    <div className='journal__detail'>
                        <span className='journal__detail-name'>Published by:</span>
                        <span className='journal__detail-value'>Author name here</span>
                    </div>
                    <div className='journal__detail'>
                        <span className='journal__detail-name'>ISSN(Print):</span>
                        <span className='journal__detail-value'>1595-5680</span>
                    </div>
                    <div className='journal__detail'>
                        <span className='journal__detail-name'>ISSN(Online):</span>
                        <span className='journal__detail-value'>1597-8966</span>
                    </div>
                    <div className='journal__detail'>
                        <span className='journal__detail-name'>Other Info:</span>
                        <span className='journal__detail-value'>Value</span>
                    </div>
                </div>
            </div>
        </div>
        <div className='journal-page__section'>
            <p className='journal__description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam consequuntur mollitia ratione voluptates porro aperiam aspernatur. Illo aliquam odio, esse voluptates veritatis quis optio fugit fuga repellat, dolores officiis provident.</p>
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