import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import api from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostMediaList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.get('/posting-media').then((response) => {
            setPosts(response.data);
        }).catch((error) => {
            console.error('Error fetching posts:', error);
        });
    }, []);
    return (
        <div className="container mt-4">
            <h1>Bulletin Board</h1>
            <Link to="/new" className="btn btn-primary mb-3">Create New Post</Link>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Views</th>
                    <th>Created At</th>
                </tr>
                </thead>
                <tbody>
                {posts.map(object => (
                    <tr key={object.id}>
                        <td>{object.id}</td>
                        <td>
                            <Link to={`/post/${object.id}`}>{object.title}</Link>
                        </td>
                        <td>{object.author}</td>
                        <td>{object.views}</td>
                        <td>{new Date(object.createdAt).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostMediaList;
