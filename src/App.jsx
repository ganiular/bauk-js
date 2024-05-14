import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
// import HomePage from './pages/HomePage/HomePage';
import Footer from './components/Footer/Footer';
import JournalPage from './pages/JournalPage/JournalPage';
import LoginPage from './pages/LoginPage/LoginPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<JournalPage />} />
          <Route path="/index" element={<JournalPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
