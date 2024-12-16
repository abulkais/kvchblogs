// import React, { useEffect, useState, useMemo, useRef } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import dynamic from 'next/dynamic'; // Dynamically import JoditEditor
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const JoditEditor = dynamic(() => import("jodit-react"), {
//     ssr: false, // Disable SSR for JoditEditor
// });

// const BlogUpdate = ({ placeholder }) => {
//     const { slug } = useParams();
//     const [title, setTitle] = useState("");
//     const [url, setUrl] = useState("");
//     const [keywords, setKeywords] = useState("");
//     const [description, setDescription] = useState("");
//     const [content, setContent] = useState("");
//     const [bannerImage, setBannerImage] = useState(null);
//     const [existingBannerImage, setExistingBannerImage] = useState("");
//     const editor = useRef(null);

//     const config = useMemo(
//         () => ({
//             readonly: false,
//             placeholder: placeholder || 'Start typing...',
//             height: 400,
//         }),
//         [placeholder]
//     );

//     useEffect(() => {
//         const fetchPost = async () => {
//             try {
//                 const response = await axios.get(`https://kvch.in:859/api/post/${slug}`);
//                 setTitle(response.data.title);
//                 setKeywords(response.data.keywords);
//                 setDescription(response.data.description);
//                 setContent(response.data.content);
//                 setUrl(response.data.url);
//                 setExistingBannerImage(response.data.banner_image);
//             } catch (error) {
//                 console.error("Error fetching post", error);
//             }
//         };
//         fetchPost();
//     }, [slug]);

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             let imageUrl = existingBannerImage;

//             if (bannerImage) {
//                 const formData = new FormData();
//                 formData.append("bannerImage", bannerImage);

//                 const imageResponse = await axios.post("https://kvch.in:859/api/upload", formData, {
//                     headers: { "Content-Type": "multipart/form-data" },
//                 });

//                 imageUrl = imageResponse.data.imageUrl;
//             }

//             const postData = {
//                 url,
//                 title,
//                 keywords,
//                 description,
//                 content,
//                 bannerImage: imageUrl,
//             };

//             await axios.put(`https://kvch.in:859/api/posts/${slug}`, postData);
//             toast.success("Post updated successfully");
//         } catch (error) {
//             console.error("Error updating post", error);
//             toast.error("Failed to update post");
//         }
//     };

//     return (
//         <>
//             <ToastContainer />
//             <div className="container">
//                 <form onSubmit={handleUpdate}>
//                     <div className="form-group">
//                         <label>Title</label>
//                         <input
//                             className="form-control"
//                             type="text"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Keywords</label>
//                         <input
//                             className="form-control"
//                             type="text"
//                             value={keywords}
//                             onChange={(e) => setKeywords(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Description</label>
//                         <textarea
//                             className="form-control"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Slug</label>
//                         <input
//                             readOnly
//                             style={{ cursor: "not-allowed" }}
//                             className="form-control"
//                             type="text"
//                             value={url}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label>Banner Image</label>
//                         <input
//                             className="form-control"
//                             type="file"
//                             onChange={(e) => setBannerImage(e.target.files[0])}
//                         />
//                         {existingBannerImage && (
//                             <p>Existing Image: <img src={`https://kvch.in:859${existingBannerImage}`} alt="Current Banner" style={{ width: '100px', height: 'auto', marginTop: '1rem' }} /></p>
//                         )}
//                     </div>
//                     <div className="form-group">
//                         <label>Content</label>
//                         <JoditEditor
//                             ref={editor}
//                             tabIndex={1}
//                             value={content}
//                             config={config}
//                             onChange={(newContent) => setContent(newContent)}
//                         />
//                     </div>
//                     <button className="btn btn-success" type="submit">Update Post</button>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default BlogUpdate;


import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import dynamic from "next/dynamic"; // Dynamically import JoditEditor
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false, // Disable SSR for JoditEditor
});

const BlogUpdate = ({ slug }) => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [keywords, setKeywords] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [bannerImage, setBannerImage] = useState(null);
    const [existingBannerImage, setExistingBannerImage] = useState("");
    const editor = useRef(null);

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: "Start typing...",
            height: 400,
        }),
        []
    );

    // Fetch blog data using the slug
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`https://kvch.in:859/api/post/${slug}`);
                const { title, keywords, description, content, url, banner_image } = response.data;

                setTitle(title);
                setKeywords(keywords);
                setDescription(description);
                setContent(content);
                setUrl(url);
                setExistingBannerImage(banner_image);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchPost();
    }, [slug]); // Run when slug changes

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = existingBannerImage;

            if (bannerImage) {
                const formData = new FormData();
                formData.append("bannerImage", bannerImage);

                const imageResponse = await axios.post("https://kvch.in:859/api/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                imageUrl = imageResponse.data.imageUrl;
            }

            const postData = {
                url,
                title,
                keywords,
                description,
                content,
                bannerImage: imageUrl,
            };

            await axios.put(`https://kvch.in:859/api/posts/${slug}`, postData);
            toast.success("Post updated successfully");
        } catch (error) {
            console.error("Error updating post:", error);
            toast.error("Failed to update post");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="container">
                <form onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            className="form-control"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Keywords</label>
                        <input
                            className="form-control"
                            type="text"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Slug</label>
                        <input
                            readOnly
                            style={{ cursor: "not-allowed" }}
                            className="form-control"
                            type="text"
                            value={url}
                        />
                    </div>
                    <div className="form-group">
                        <label>Banner Image</label>
                        <input
                            className="form-control"
                            type="file"
                            onChange={(e) => setBannerImage(e.target.files[0])}
                        />
                        {existingBannerImage && (
                            <p>
                                Existing Image:{" "}
                                <img
                                    src={`https://kvch.in:859${existingBannerImage}`}
                                    alt="Current Banner"
                                    style={{ width: "100px", height: "auto", marginTop: "1rem" }}
                                />
                            </p>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Content</label>
                        <JoditEditor
                            ref={editor}
                            tabIndex={1}
                            value={content}
                            config={config}
                            onChange={(newContent) => setContent(newContent)}
                        />
                    </div>
                    <button className="btn btn-success" type="submit">
                        Update Post
                    </button>
                </form>
            </div>
        </>
    );
};

export default BlogUpdate;
