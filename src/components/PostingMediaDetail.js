import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import api from '../services/api';


const PostingMediaDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [postMedia, setPost] = useState(null);
    const [password, setPassword] = useState('');
    const [viewsData, setViewsData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/posting-media/${id}`);
                setPost(response.data);
            } catch (e) {
                console.error('Error fetching posting details:', e);
            }
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await api.get(`/posting-media/views/${id}`);
                console.log(response.data);
                setViewsData(response.data);
            }catch (e) {
                console.error(e);
            }
        }
    fetchApi();
    }, [id]);

    const handleDelete = () => {
        if (!password) return alert('Please enter your password to delete the post.');
        api.delete(`/posting-media/${id}`, {params: {password}})
            .then(() => {
                alert('Post deleted successfully!');
                navigate('/');
            })
            .catch((error) => {
                console.error('Error deleting post:', error);
                alert('Failed to delete post. Check your password.');
            });
    };

    return (
        <div className="container mt-4">
            {postMedia ? (
                <>
                    <h1>{postMedia.title}</h1>
                    <p><strong>Author:</strong> {postMedia.author}</p>
                    <p><strong>Views:</strong> {viewsData.views}</p>
                    <p><strong>Created At:</strong> {new Date(postMedia.createdAt).toLocaleString()}</p>
                    {postMedia.updatedAt && (
                        <p><strong>Updated At:</strong> {new Date(postMedia.updatedAt).toLocaleString()}</p>
                    )}
                    <p>{postMedia.content}</p>
                    <div className="mt-4">
                        <input
                            type="password"
                            placeholder="Enter password"
                            className="form-control mb-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="btn btn-danger me-2"
                            onClick={handleDelete}
                        >
                            Delete Post
                        </button>
                        <button
                            className="btn btn-warning"
                            onClick={() => navigate(`/edit/${id}`)}
                        >
                            Edit Post
                        </button>
                        <button
                            className="btn btn-secondary ms-2"
                            onClick={() => navigate('/')}
                        >
                            Back to List
                        </button>
                    </div>
                </>
            ) : (
                <p>Loading post details...</p>
            )}
        </div>
    );
};

export default PostingMediaDetail;
