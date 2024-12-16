
// import React, { useState, useRef, useMemo } from "react";

// import { useForm } from "react-hook-form";
// import axios from "axios";
// import JoditEditor from "jodit-react"; // Import JoditEditor
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import PostAddIcon from '@mui/icons-material/PostAdd';
// const BlogPosts = ({ placeholder }) => {
//     const { register, handleSubmit, reset, setValue } = useForm();
//     const [bannerImage, setBannerImage] = useState(null);
//     const [authorImg, setAuthorImg] = useState(null);
//     const [editorContent, setEditorContent] = useState("");
//     const editor = useRef(null);


//     const config = useMemo(
//         () => ({
//             readonly: false, // all options from https://xdsoft.net/jodit/docs/,
//             placeholder: placeholder || 'Add Contents...',
//             height: 400,
//         }),
//         [placeholder]
//     );


//     const handleTitleChange = (e) => {
//         const title = e.target.value;
//         setValue("title", title);
//         const url = generateUrl(title);
//         setValue("url", url);
//     };

//     const generateUrl = (title) => {
//         return title
//             .toLowerCase()
//             .replace(/[^a-z0-9]+/g, '-')
//             .replace(/^-|-$/g, '');
//     };

//     const onSubmit = async (data) => {

//         if (!data.title) {
//             toast.error("Title is required");
//             return;
//         }
//         if (!data.keywords) {
//             toast.error("Keywords are required");
//             return;
//         }
//         if (!data.description) {
//             toast.error("Description is required");
//             return;
//         }
//         if (!data.url) {
//             toast.error("URL is required");
//             return;
//         }
//         if (!bannerImage) {
//             toast.error("Banner image is required");
//             return;
//         }
//         if (!data.authorName) {
//             toast.error("Author name is required");
//             return;
//         }
//         if (!authorImg) {
//             toast.error("Author image is required");
//             return;
//         }
//         if (!editorContent) {
//             toast.error("Content is required");
//             return;
//         }
//         try {


//             try {
//                 const checkResponse = await axios.get(`https://kvch.in:859/api/post/check/${data.url}`);

//                 // If the response is successful and no conflict is detected
//                 if (checkResponse.status === 200) {
//                     // console.log("URL is available");
//                 }
//             } catch (error) {
//                 if (error.response && error.response.status === 409) {
//                     // Show an alert or toast if the URL already exists
//                     toast.error("Post with this URL already exists");
//                     return;
//                 } else {
//                     console.error("Error checking URL:", error);
//                     toast.error("An error occurred while checking the URL.");
//                     return;
//                 }
//             }


//             const validBannerImgTypes = ['image/webp'];
//             if (!validBannerImgTypes.includes(bannerImage.type)) {
//                 toast.warning("Please upload a valid Only Webp Image.");
//                 return;
//             }

//             const validateAuthorImg = ['image/webp'];
//             if (!validateAuthorImg.includes(authorImg.type)) {
//                 toast.warning("Please upload a valid Only Webp Image.");
//                 return;
//             }
        

//             const bannerFormData = new FormData();
//             bannerFormData.append("bannerImage", bannerImage);

//             const bannerResponse = await axios.post("https://kvch.in:859/api/upload", bannerFormData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             const authorFormData = new FormData();
//             authorFormData.append("authorImg", authorImg);

//             const authorResponse = await axios.post("https://kvch.in:859/api/upload/author", authorFormData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });

//             const postData = {
//                 ...data,
//                 content: editorContent,
//                 bannerImage: bannerResponse.data.imageUrl,
//                 authorImg: authorResponse.data.imageUrl,
//             };

//             await axios.post("https://kvch.in:859/api/posts", postData);
//             reset();
//             setEditorContent("");
//             // alert("Blog posted successfully");
//             toast.success("Blog posted successfully");
//         } catch (error) {
//             console.error("Error posting blog", error);
//         }
//     };

//     return (
//         <div className="container mt-3 mb-3">
//             <ToastContainer />

//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="form-group">
//                     <label>Title</label>
//                     <input className="form-control" placeholder="Enter Title" {...register("title")} onChange={handleTitleChange} />
//                 </div>
//                 <div className="form-group">
//                     <label>Keywords</label>
//                     <input className="form-control" placeholder="Enter Keywords" {...register("keywords")} />
//                 </div>
//                 <div className="form-group">
//                     <label>Description</label>
//                     <textarea className="form-control" placeholder="Enter Description" rows="2" {...register("description")} />
//                 </div>
//                 <div className="form-group">
//                     <label>Banner Image</label>
//                     <input className="form-control" type="file" onChange={(e) => setBannerImage(e.target.files[0])} />
//                 </div>
//                 <div className="form-group">
//                     <label>URL</label>
//                     <input className="form-control" placeholder="Enter URL" {...register("url")} />
//                 </div>
//                 <div className="form-group">
//                     <label>Author Name</label>
//                     <input className="form-control" placeholder="Enter Author Name" {...register("authorName")} />
//                 </div>
//                 <div className="form-group">
//                     <label>Author Image</label>
//                     <input className="form-control" type="file" onChange={(e) => setAuthorImg(e.target.files[0])} />
//                 </div>
//                 <div className="form-group">
//                     <label>Content</label>
//                     <JoditEditor
//                         ref={editor}
//                         tabIndex={3}
//                         value={editorContent}
//                         config={config}
//                         onBlur={(newContent) => setEditorContent(newContent)}
//                         onChange={newContent => { }}
//                     />
//                 </div>
//                 <button className="btn btn-success" type="submit"> <PostAddIcon/> Add Post</button>
//             </form>
//         </div>
//     );
// };

// export default BlogPosts;


import React, { useState, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import dynamic from 'next/dynamic'; // Dynamically import JoditEditor

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false }); // ssr: false to prevent server-side rendering

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostAddIcon from '@mui/icons-material/PostAdd';

const BlogPosts = ({ placeholder }) => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [bannerImage, setBannerImage] = useState(null);
    const [authorImg, setAuthorImg] = useState(null);
    const [editorContent, setEditorContent] = useState("");
    const editor = useRef(null);

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: placeholder || 'Add Contents...',
            height: 400,
        }),
        [placeholder]
    );

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setValue("title", title);
        const url = generateUrl(title);
        setValue("url", url);
    };

    const generateUrl = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const onSubmit = async (data) => {
        if (!data.title || !data.keywords || !data.description || !data.url || !bannerImage || !data.authorName || !authorImg || !editorContent) {
            toast.error("All fields are required.");
            return;
        }

        try {
            const checkResponse = await axios.get(`https://kvch.in:859/api/post/check/${data.url}`);

            if (checkResponse.status === 200) {
                const validBannerImgTypes = ['image/webp'];
                const validateAuthorImg = ['image/webp'];

                if (!validBannerImgTypes.includes(bannerImage.type) || !validateAuthorImg.includes(authorImg.type)) {
                    toast.warning("Please upload valid Only Webp Images.");
                    return;
                }

                const bannerFormData = new FormData();
                bannerFormData.append("bannerImage", bannerImage);

                const bannerResponse = await axios.post("https://kvch.in:859/api/upload", bannerFormData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                const authorFormData = new FormData();
                authorFormData.append("authorImg", authorImg);

                const authorResponse = await axios.post("https://kvch.in:859/api/upload/author", authorFormData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                const postData = {
                    ...data,
                    content: editorContent,
                    bannerImage: bannerResponse.data.imageUrl,
                    authorImg: authorResponse.data.imageUrl,
                };

                await axios.post("https://kvch.in:859/api/posts", postData);
                reset();
                setEditorContent("");
                toast.success("Blog posted successfully");
            }
        } catch (error) {
            console.error("Error posting blog", error);
            toast.error("An error occurred while posting the blog.");
        }
    };

    return (
        <div className="container mt-3 mb-3">
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" placeholder="Enter Title" {...register("title")} onChange={handleTitleChange} />
                </div>
                <div className="form-group">
                    <label>Keywords</label>
                    <input className="form-control" placeholder="Enter Keywords" {...register("keywords")} />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" placeholder="Enter Description" rows="2" {...register("description")} />
                </div>
                <div className="form-group">
                    <label>Banner Image</label>
                    <input className="form-control" type="file" onChange={(e) => setBannerImage(e.target.files[0])} />
                </div>
                <div className="form-group">
                    <label>URL</label>
                    <input className="form-control" placeholder="Enter URL" {...register("url")} />
                </div>
                <div className="form-group">
                    <label>Author Name</label>
                    <input className="form-control" placeholder="Enter Author Name" {...register("authorName")} />
                </div>
                <div className="form-group">
                    <label>Author Image</label>
                    <input className="form-control" type="file" onChange={(e) => setAuthorImg(e.target.files[0])} />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <JoditEditor
                        ref={editor}
                        tabIndex={3}
                        value={editorContent}
                        config={config}
                        onBlur={(newContent) => setEditorContent(newContent)}
                    />
                </div>
                <button className="btn btn-success" type="submit">
                    <PostAddIcon /> Add Post
                </button>
            </form>
        </div>
    );
};

export default BlogPosts;
