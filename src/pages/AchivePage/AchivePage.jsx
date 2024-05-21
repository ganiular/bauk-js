import { Link } from 'react-router-dom';
import './AchivePage.scss';

export default function AchivePage() {
    return <main className="achive_page">
        <h1 className="achive_page-title">Archives</h1>
        <ul className="achive_page-main_list">
            <li className="achive_page-main_item">Volume 1 (2024)</li>
            <ul className="achive_page-sub_list">
                <li className="achive_page-sub_item"><Link to='/issue/view/volume_1_issue_1'>Issue 1</Link></li>
            </ul>
        </ul>

    </main>
}