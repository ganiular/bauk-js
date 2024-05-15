import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
// import HomePage from './pages/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import JournalPage from './pages/JournalPage/JournalPage';
import LoginPage from './pages/LoginPage/LoginPage';
import JournalFormPage from './pages/JournalFormPage/JournalFormPage';
import MessageProvider from './providers/MessageProvider/MessageProvider';
import ArticleList from './pages/ArticleList/ArticleList';


function App() {
  return (
    <div className="App">
      <MessageProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<JournalPage />} />
            <Route path="/index" element={<JournalPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/add-article' element={<JournalFormPage />} />
            <Route path='/issue/archive' element={<ArticleList />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </MessageProvider>
    </div>
  );
}

export default App;
