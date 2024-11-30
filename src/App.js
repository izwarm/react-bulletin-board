import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PostiMediaList from './components/PostMediaList';
import PostingMediaDetail from './components/PostingMediaDetail';
import PostingMediaForm from './components/PostingMediaForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PostiMediaList/>}/>
                <Route path="/post/:id" element={<PostingMediaDetail/>}/>
                <Route path="/new" element={<PostingMediaForm/>}/>
                <Route path="/edit/:id" element={<PostingMediaForm isEdit/>}/>
            </Routes>
        </Router>
    );
}

export default App;