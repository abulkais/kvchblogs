// pages/blogs/index.js

import { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar'; // Adjust this path based on your component folder
import Footer from '../../components/Footer'; // Adjust this path based on your component folder
import HomeIcon from '@mui/icons-material/Home';
import { format } from 'date-fns';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [displayedPosts, setDisplayedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleCount, setVisibleCount] = useState(4);
    const [searchTerm, setSearchTerm] = useState("");

    const stripHtmlTags = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.innerText || div.textContent || "";
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return format(date, 'd MMM yyyy');
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("https://kvch.in:859/api/posts"); // Adjust the endpoint
                const enabledPosts = response.data.filter(post => post.status === 'enabled');
                const sortedPosts = enabledPosts.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
                setPosts(sortedPosts);
                setDisplayedPosts(sortedPosts.slice(0, visibleCount));
            } catch (err) {
                setError("Error fetching posts");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [visibleCount]);

    const loadMorePosts = () => {
        setVisibleCount(prevCount => prevCount + 2);
        setDisplayedPosts(posts.slice(0, visibleCount + 4));
    };

    const filteredTrendingPosts = posts
        .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(0, 50);

    if (loading) {
        return (
            <div id="preloader">
                <div id="loader"></div>
            </div>
        );
    }

    if (error) return <div>{error}</div>;

    return (
        <>
            <Head>
                <title>KVCH Blogs for Trends and Career Insights</title>
                <meta name="description" content="Explore KVCH Blogs for the latest trends and career insights that skyrocket your skills and opportunities. Stay ahead in your career today!" />
                <link rel="icon" href='https://kvch.in/assets-new/img/favicon.webp' type="image/x-icon" />
                <link rel="canonical" href="https://kvch.in/blogs" />
                <meta name="author" content="KVCH" />
                <meta name="og:title" content="KVCH Blogs for Trends and Career Insights" />
                <meta name='og:type' content="blogs" />
                <meta name="og:description" content="Explore KVCH Blogs for the latest trends and career insights that skyrocket your skills and opportunities. Stay ahead in your career today!" />
                <meta name="og:url" content="https://kvch.in/blogs" />
                <meta property="og:image" content="https://kvch.in/blogs/blog_og_image.webp" />
                <meta name="og:site_name" content="KVCH" />
                <meta name="distribution" content="global" />
                <meta name='subject' content="Blogs" />
                <meta name="rating" content="General" />
                <meta name="OWNER" type="email" value="training@kvch.in" />
                <meta content="all" name="googlebot-Image" />
                <meta name="rating" content="5" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": `https://kvch.in/blogs`,
                        },
                        "headline": "KVCH Blogs for Trends and Career Insights",
                        "description": "Explore KVCH Blogs for the latest trends and career insights that skyrocket your skills and opportunities. Stay ahead in your career today!",
                        "image": "https://kvch.in/blogs/blog_og_image.webp",
                        "author": {
                            "@type": "Person",
                            "name": "KVCH",
                        },
                    })}
                </script>
            </Head>

            <Navbar />

            <section className="blog_banner">
                <div className="container">
                    <h1>Blogs</h1>
                    <span className="breadcrumbs">
                        <Link href="/"><HomeIcon /> Home</Link> / <Link href="/blogs">Blogs</Link>
                    </span>
                </div>
            </section>

            <section className="blogList">
                <div className="container mt-4">
                    {posts.length === 0 ? (
                        <p>No posts available</p>
                    ) : (
                        <div className="row">
                            <div className="col-lg-8">
                                {displayedPosts.map(post => (
                                    <Link key={post.slug} href={`/blogs/${post.slug}`} passHref>
                                        <div className="row blogListBox">
                                            <div className="col-lg-6">
                                                <div className="blogListImg">
                                                    <img src={`https://kvch.in:859${post.banner_image}`} loading="lazy" alt={post.title} />
                                                </div>
                                                <div className="blog_author">
                                                    <div className="blog_author_i_n flex-fill d-inline-flex align-items-center">
                                                        <img src={`https://kvch.in:859${post.authorImg}`} loading="lazy" alt={post.title} />
                                                        <span>{post.authorName}</span>
                                                    </div>
                                                    <div className="blog_date">
                                                        {formatDate(post.createdDate)} | <span>Read more</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <h2>{post.title}</h2>
                                                <p>{stripHtmlTags(post.content)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                                {displayedPosts.length < posts.length && (
                                    <div style={{ textAlign: 'center', margin: '20px 0' }}>
                                        <button onClick={loadMorePosts} className="btn btn-primary">Load More</button>
                                    </div>
                                )}
                            </div>

                            <div className="col-lg-4">
                                <section className="trending_sec">
                                    <div className="form-group position-relative trending_search">
                                        <input
                                            type="search"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="form-control rounded-pill"
                                            placeholder="Search By Keyword"
                                            required
                                        />
                                        <button type="submit" className="search-btn border-0 bg-transparent" aria-label="Search">
                                            {/* SVG or Icon here */}
                                        </button>
                                    </div>

                                    <h3>Recent Posts</h3>
                                    <span className="footer_sep2"></span>
                                    <div className="filtered_posts">
                                        {filteredTrendingPosts.map(post => (
                                            <div className="trending_div" key={post.slug}>
                                                <Link href={`/blogs/${post.slug}`} passHref>
                                                    <h4>{post.title}</h4>
                                                    <p>{stripHtmlTags(post.content)}</p>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
};

export default BlogList;
