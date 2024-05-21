import { useState } from 'react';
import './ArticlePage.scss'
import { Link, useParams } from 'react-router-dom';
import ListLoader from '../../components/Loader/ListLoader';
import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../../config';
import { Helmet } from 'react-helmet';

export default function ArticlePage() {
    const { articleId } = useParams()
    const [article, setArticle] = useState(null)

    useEffect(() => {
        axios.get(`${BASE_URL}/articles/${articleId}`)
            .then(res => setArticle({ ...res.data, publicationDate: new Date(res.data.publicationDate) }))
            .catch(console.error)
    }, [articleId])

    if (article === null) return <ListLoader />
    console.log({ article });

    return <main className="article_page">
        <Helmet>
            <title>{article.title}</title>
            <meta name="description" content={article.abstract} />
            <meta name="keywords" content={article.keywords?.join(', ')} />
            <meta name="author" content={article.authors.join(', ')} />
            <meta name="date" content={article.publicationDate.toISOString()} />
            <meta property="og:title" content={article.title} />
            <meta property="og:description" content={article.abstract} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:site_name" content="BAUK JOURNAL OF SOCIOLOGY" />
            <meta property="og:locale" content="en_US" />
        </Helmet>
        <div className='article_page-label'>Volume {article.volumeNumber}, Issue {article.issueNumber} ({article.publicationDate.getFullYear()})</div>
        <h3 className='article_page-title'>{article.title}</h3>
        <section className="authors">
            <b>Authors:</b> {article.authors.join(', ')}
        </section>
        <section className="abstract">
            <header className='abstract-title'>Abstract</header>
            <p className='abstract-body'>{article.abstract}</p>
        </section>
        <section className="keywords">
            <div className='keywords-body'><b className='keywords-title'>Keywords:</b> {article.keywords.join(', ')}</div>
        </section>
        <div className="article_page-actions">
            <Link className="article_page-actions--link" target='_blank' to={`${article.fileUrl}`}>View PDF</Link>
            <Link className="article_page-actions--link" target='_blank' to={`${article.fileUrl}`} download>Download PDF</Link>
        </div>
    </main>
}