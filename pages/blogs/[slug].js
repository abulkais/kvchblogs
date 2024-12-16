import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";
import HomeIcon from "@mui/icons-material/Home";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://kvch.in:859/api/post/${slug}`);
        setPost(response.data);
      } catch (err) {
        setError("Failed to fetch the blog post.");
      }
    };

    const fetchTrendingPosts = async () => {
      try {
        const response = await axios.get("https://kvch.in:859/api/posts");
        setTrendingPosts(response.data);
      } catch (err) {
        console.error("Failed to fetch trending posts.");
      }
    };

    if (slug) {
      fetchPost();
    }
    fetchTrendingPosts();
  }, [slug]);

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const filteredTrendingPosts = trendingPosts
    .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 50);

  if (error) {
    return <p>{error}</p>;
  }

  if (!post) {
    return (
      <div id="preloader">
        <div id="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
        <meta name="user-interest" content={post.keywords} />
        <link rel="icon" href="https://kvch.in/assets-new/img/favicon.webp" type="image/x-icon" />
        <link rel="canonical" href={`https://kvch.in/blogs/${post.url}`} />

        {/* OpenGraph Meta Tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:type" content="blogs" />
        <meta property="og:description" content={post.description} />
        <meta property="og:image" content={`https://kvch.in/blogs/blogBackend${post.banner_image}`} />
        <meta property="og:url" content={`https://kvch.in/blogs/${post.url}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="KVCH" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="blogs" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content={`https://kvch.in/blogs/blogBackend${post.banner_image}`} />
        <meta name="OWNER" type="email" value="training@kvch.in" />

        {/* Schema.org JSON-LD for Blog Post */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://kvch.in/blogs/${post.url}`,
            },
            "headline": post.title,
            "description": post.description,
            "image": `https://kvch.in/blogs/blogBackend${post.banner_image}`,
            "author": {
              "@type": "Person",
              "name": post.authorName,
            },
          })}
        </script>

        {/* Breadcrumb Schema JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://kvch.in/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blogs",
                "item": "https://kvch.in/blogs"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": post.title,
                "item": `https://kvch.in/blogs/${post.url}`
              }
            ]
          })}
        </script>
      </Head>


      <section className="blog_banner publicblogBanner">
        <div className="container">
          <h1>{post.title}</h1>
          <span className="breadcrumbs">
            <a href="https://kvch.in">
              <HomeIcon /> Home
            </a>
            /
            <a href="https://kvch.in/blogs/">Blogs</a> / <a href={`/blogs/${post.url}`}>{post.title}</a>
          </span>
        </div>
      </section>

      <div className="container publicBlog">
        <div className="row">
          <div className="col-lg-9">
            <img
              src={`https://kvch.in:859${post.banner_image}`}
              alt={`${post.title} banner`}
              style={{ borderRadius: "5px" }}
              loading="lazy"
            />
            <div dangerouslySetInnerHTML={{ __html: post.content }} className="mt-3"></div>

            <div className="author_box">
              <div className="author_box_flex">
                <h6>
                  <img src={`https://kvch.in:859${post.authorImg}`} loading="lazy" alt="kvch" /> {post.authorName}
                </h6>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
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
              </div>

              <h3>Related Posts</h3>
              <span className="footer_sep2"></span>

              <div className="filtered_posts">
                {filteredTrendingPosts.map((post) => (
                  <div className="trending_div" key={post.slug}>
                    <a href={`/blogs/${post.slug}`}>
                      <h4>{post.title}</h4>
                      <p>{stripHtmlTags(post.content)}</p>
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BlogPostPage;
