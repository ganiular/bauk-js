import { useEffect, useState } from 'react';
import './ArticleList.scss';
import axios from 'axios';
import { BASE_URL } from '../../config';
import ListLoader from '../../components/Loader/ListLoader';
import coverImg from '../../assets/images/article.png';
import { Link } from 'react-router-dom';

function ArticleItem({ article }) {
    return <div className="article_item">
        <img className="article_item-cover_image" src={coverImg} alt="Cover" />
        <div className="article_item-context">
            <Link to={`/issue/view/${article._id}`} className="article_item-title">{article.title}</Link>
            <div>{new Date(article.publicationDate).toLocaleDateString('en', { month: 'long', year: 'numeric' })}</div>
        </div>
    </div>
}

export default function ArticleList() {
    const [articles, setArticles] = useState(null);

    useEffect(() => {
        axios.get(`${BASE_URL}/articles`)
            .then(res => {
                setArticles(res.data);
            })
            .catch(console.error)
    }, [])

    if (articles === null) return <ListLoader />

    return <div className="article_list">
        {articles.map(article => <ArticleItem article={article} key={article._id} />)}
    </div>
}