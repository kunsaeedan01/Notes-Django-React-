import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage'


function App() {
  // Wrap multiple elements into a single variable
  const appElements = (
    <div>
      
      <NotesListPage />
    </div>
  );

  // You can pass the wrapped elements to a single path
  // Or pass an element directly
  return (
    <Router>
      <div className="container dark">
        <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={appElements} />
        <Route path="/note/:id" element={<NotePage />} />
          </Routes>
          </div>
        </div>
    </Router>
  );
}

export default App;