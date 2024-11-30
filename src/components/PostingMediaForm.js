import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';

const PostingMediaForm = ({ isEdit = false }) => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState({
        title: '',
        author: '',
        password: '',
        content: ''
    });

    const [errors, setErrors] = useState({
        title: '',
        author: ''
    });

    useEffect(() => {
        if (isEdit && id) {
            const fetchPosting = async () => {
                try {
                    const response = await api.get(`/posting-media/${id}`)
                    setPost(response.data);
                }catch (e) {
                    console.error('Error fetching posting for edit:', e);
                }
            }
            fetchPosting();
        }
    }, [isEdit, id]);

    const validateTitle = (title) => {
        const koreanCharRegex = /[\u3131-\uD79D]/ugi;
        const hasKorean = koreanCharRegex.test(title);

        if (hasKorean && title.length > 50) {
            return 'Title must be up to 50 characters for Korean.';
        } else if (!hasKorean && title.length > 100) {
            return 'Title must be up to 100 characters for English.';
        }
        return '';
    };

    const validateAuthor = (author) => {
        const koreanCharRegex = /[\u3131-\uD79D]/ugi;
        const hasKorean = koreanCharRegex.test(author);

        if (!hasKorean) {
            return 'Author name must contain Korean characters.';
        } else if (author.length > 10) {
            return 'Author name must be up to 10 characters.';
        }
        return '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const titleError = validateTitle(post.title);
        const authorError = validateAuthor(post.author);

        if (titleError || authorError) {
            setErrors({ title: titleError, author: authorError });
            return;
        }

        if (isEdit) {
            api.put(`/posting-media/${id}`, post, { params: { password: post.password } })
                .then(() => {
                    alert('Posting updated successfully!');
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Error updating post:', error);
                    alert('Failed to update posting. Check your password.');
                });
        } else {
            api.post('/posting-media', post)
                .then(() => {
                    alert('Posting created successfully!');
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Error creating post:', error);
                });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });

        if (name === 'title') {
            setErrors({ ...errors, title: validateTitle(value) });
        }
        if (name === 'author') {
            setErrors({ ...errors, author: validateAuthor(value) });
        }
    };

    return (
        <div className="container mt-4">
            <h1>{isEdit ? 'Edit Post' : 'Create Post'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        value={post.title}
                        onChange={handleChange}
                        required
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>
                <div className="mb-3">
                    <label>Author</label>
                    <input
                        type="text"
                        name="author"
                        className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                        value={post.author}
                        onChange={handleChange}
                        required
                    />
                    {errors.author && <div className="invalid-feedback">{errors.author}</div>}
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={post.password}
                        onChange={(e) => setPost({ ...post, password: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Content</label>
                    <textarea
                        name="content"
                        className="form-control"
                        rows="5"
                        value={post.content}
                        onChange={(e) => setPost({ ...post, content: e.target.value })}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
};

export default PostingMediaForm;
