import React, { useState, useEffect } from 'react'
import axios from 'axios';
export const Dashboard = () => {
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [totalAuthors, setTotalAuthors] = useState(0)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("https://kvch.in:859/api/posts");
                const blogs = response.data;
                setTotalBlogs(blogs.length);
                const uniqueAuthors = new Set(blogs.map(blog => blog.authorName)); // Assuming each blog has an `author` field
                setTotalAuthors(uniqueAuthors.size); // Set total unique authors
            } catch (err) {
                console.error("Error fetching posts", err);
            }
        };

        fetchPosts();
    }, []);
    return (
        <>
            <div className="container">
                <div className="row mt-3">
                    <div className="col-lg-3">
                        <div className='dashborad_box'>
                            <h3>Total Number of Blogs</h3>
                            <p>{totalBlogs}</p>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className='dashborad_box'>
                            <h3>Total Number of Authors</h3>

                            <p>{totalAuthors}</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Dashboard;
