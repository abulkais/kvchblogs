import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { format } from "date-fns";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import PublicIcon from "@mui/icons-material/Public";
import PublicOffIcon from "@mui/icons-material/PublicOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogManagement = () => {
  const [posts, setPosts] = useState([]); // All posts
  const [displayPosts, setDisplayPosts] = useState([]); // Filtered posts to display
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [paginationCount, setPaginationCount] = useState(20); // Pagination count
  const [isReverse, setIsReverse] = useState(false); // Toggle order of posts
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter(); // Next.js router

  // Fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://kvch.in:859/api/posts");
        const sortedPosts = response.data.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        ); // Sort by createdDate descending
        setPosts(sortedPosts);
        setDisplayPosts(sortedPosts.slice(0, paginationCount)); // Initially display limited posts
      } catch (error) {
        console.error("Error fetching posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [paginationCount]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="dotted-loader"></div>
      </div>
    );
  }

  // Handle post deletion
  const handleDelete = async (slug) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`https://kvch.in:859/api/posts/${slug}`);
        const updatedPosts = posts.filter((post) => post.slug !== slug);
        setPosts(updatedPosts);
        setDisplayPosts(updatedPosts.slice(0, paginationCount));
        toast.success("Post deleted successfully");
      } catch (error) {
        console.error("Error deleting post", error);
        alert("Failed to delete post");
      }
    }
  };

  // Navigate to update page
  const handleUpdate = (slug) => {
    router.push(`/admin/${slug}`); // Redirect using Next.js router
  };

  // Pagination input handler
  const handlePaginationChange = (e) => {
    const count = parseInt(e.target.value, 10) || 1; // Default to 1
    setPaginationCount(count);
    setDisplayPosts(posts.slice(0, count));
  };

  // Search input handler
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    setDisplayPosts(filteredPosts.slice(0, paginationCount));
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "d MMM yyyy / h:mm a"); // Format date
  };

  // Toggle display order
  const toggleDisplayOrder = () => {
    setIsReverse(!isReverse);
  };

  // Toggle post status
  const handleToggleStatus = async (slug) => {
    try {
      const response = await axios.put(
        `https://kvch.in:859/api/posts/${slug}/toggle-status`
      );
      const updatedPosts = posts.map((post) =>
        post.slug === slug
          ? { ...post, status: post.status === "enabled" ? "disabled" : "enabled" }
          : post
      );
      setPosts(updatedPosts);
      setDisplayPosts(updatedPosts.slice(0, paginationCount));

      const toggledPost = updatedPosts.find((post) => post.slug === slug);
      if (toggledPost.status === "enabled") {
        toast.success("Post has been enabled");
      } else {
        toast.warning("Post has been disabled");
      }
    } catch (error) {
      console.error("Error toggling blog status:", error);
      alert("Failed to toggle blog status");
    }
  };

  // Sorted posts
  const sortedPosts = isReverse ? [...displayPosts].reverse() : displayPosts;

  // Serial number starting index
  const startingIndex = isReverse
    ? posts.length - displayPosts.length
    : 0;

  return (
    <>
      <ToastContainer />
      <div className="container-fluid">
        <div className="d-flex mt-4" style={{ justifyContent: "space-between" }}>
          <div className="form-group">
            <select
              className="form-control"
              value={paginationCount}
              onChange={handlePaginationChange}
            >
              <option value={10}>Show 10 Entries</option>
              <option value={100}>Show 100 Entries</option>
              <option value={200}>Show 200 Entries</option>
              <option value={Number.MAX_SAFE_INTEGER}>Show Infinite Entries</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="search"
              placeholder="Search Blog"
              className="form-control"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead
              style={{
                position: "sticky",
                top: "1px",
                backgroundColor: "#000",
                color: "#fff",
              }}
            >
              <tr>
                <th onClick={toggleDisplayOrder} style={{ cursor: "pointer" }}>
                  {isReverse ? (
                    <KeyboardDoubleArrowUpIcon />
                  ) : (
                    <KeyboardDoubleArrowDownIcon />
                  )}
                </th>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedPosts.map((post, index) => (
                <tr key={post.slug}>
                  <td>
                    {isReverse
                      ? startingIndex + (sortedPosts.length - index)
                      : startingIndex + index + 1}
                  </td>
                  <td style={{ width: "50%" }}>{post.title}</td>
                  <td>
                    <div className="d-flex" style={{justifyContent:'space-between', alignItems:'center'}}>
                      <span>{post.authorName}</span>
                      <img
                        src={`https://kvch.in/blogs/blogBackend${post.authorImg}`}
                        alt={`${post.authorName}'s image`}
                        loading="lazy"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          marginLeft: "5px",
                        }}
                      />
                    </div>
                  </td>
                  <td>{formatDate(post.createdDate)}</td>
                  <td>
                    <button
                      className={`btn btn-${post.status === "disabled" ? "danger" : "success"
                        } btn-sm mr-2`}
                      onClick={() => handleToggleStatus(post.slug)}
                    >
                      {post.status === "disabled" ? (
                        <PublicOffIcon />
                      ) : (
                        <PublicIcon />
                      )}
                    </button>
                    <button
                      className="btn btn-info mr-3 btn-sm"
                      onClick={() => handleUpdate(post.slug)}
                    >
                      <EditIcon />
                    </button>
                    <a
                      href={`/blogs/${post.slug}`}
                      className="btn btn-success btn-sm mr-3"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <RemoveRedEyeOutlinedIcon />
                    </a>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(post.slug)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BlogManagement;
