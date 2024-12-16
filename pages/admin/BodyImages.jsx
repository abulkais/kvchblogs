
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const BodyImages = () => {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);  // State to store image data
    const [copied, setCopied] = useState(null); // State to track the copied image path
    const [latestImg, setLatestImg] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6); // Number of posts to display initially
    const [displayedImages, setDisplayedImages] = useState([]); // Posts to display

    const handleFileChange = (e) => {
        // setFile(e.target.files[0]);
        const selectedFile = e.target.files[0];
        const maxSize = 100 * 1024; // 100 KB in bytes

        // Validate file size
        if (selectedFile && selectedFile.size > maxSize) {
            toast.warning("File size should be less than 100 KB.");
            setFile(null);
            return;
        }
        setFile(selectedFile);


        // Check image resolution (800x400)
        const img = new Image();
        img.onload = () => {
            if (img.width !== 800 || img.height !== 400) {
                toast.warning("Image resolution should be 800x400 pixels. Under 100 kb");
                setFile(null);
            } else {
                setFile(selectedFile);
            }
        };
        img.onerror = () => {
            toast.warning("Invalid image file.");
            setFile(null);
        };
        img.src = URL.createObjectURL(selectedFile);  // Load the image to check resolution

    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.warning("Please select an image first.");
            return;
        }

        const validImageTypes = ['image/webp'];
        if (!validImageTypes.includes(file.type)) {
            toast.warning("Please upload a Only Webp Image  .");
            return;
        }


        const formData = new FormData();
        formData.append('bodyImages', file);

        try {
            const response = await axios.post('https://kvch.in:859/api/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Image uploaded successfully');
            setFile(null);
            document.getElementById("file-input").value = null;

            setTimeout(() => {  // Reload the page after upload
                window.location.reload();
            }, 1000)

        } catch (error) {
            console.error('Error uploading image:', error.response || error.message);

            // Handle specific backend error
            if (error.response && error.response.status === 400) {
                toast.warning(error.response.data); // Display backend error message
            } else {
                toast.error('Failed to upload image');
            }

        }
    };




    const fetchImages = async () => {
        try {
            const response = await axios.get('https://kvch.in:859/api/body_images');
            setImages(response.data);  // Set the images state with the response data
            const sortedImages = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setLatestImg(sortedImages);
            setDisplayedImages(sortedImages.slice(0, visibleCount)); // Initially display the first set of posts
        } catch (error) {
            console.error('Error fetching images:', error.response || error.message);
        }
    };

    // Copy the image URL to the clipboard
    const copyToClipboard = (imagePath) => {
        navigator.clipboard.writeText(`https://kvch.in/blogs/blogBackend${imagePath}`)
            .then(() => {
                setCopied(imagePath);  // Set the copied image path

                setTimeout(() => setCopied(null), 5000);  // Reset the copied state after 5 seconds
            })
            .catch((err) => {
                console.error("Failed to copy image path:", err);
            });
    };

    // Fetch images on component mount
    useEffect(() => {
        fetchImages();
    }, []);

    const loadMoreImages = () => {
        setVisibleCount(prevCount => prevCount + 6); // Increase the count of visible posts by 6
        setDisplayedImages(images.slice(0, visibleCount + 6)); // Update displayed posts
    };

    return (
        <div className="container mt-3">
            <ToastContainer />
            <h3>Add Images</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        id="file-input"
                        type="file"
                        name="bodyImages"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        <CloudUploadIcon /> Upload Image
                    </button>
                </div>
            </form>

            <div className="row mt-5">
                {displayedImages.length > 0 ? (
                    displayedImages.map((image, index) => (
                        <div className="col-lg-2" key={index}>
                            <div className="add_img">
                                <img key={image.id}
                                    src={`https://kvch.in/blogs/blogBackend${image.image_path}`}  // Use the dynamic URL
                                    alt={`Uploaded ${index}`}
                                    onClick={() => copyToClipboard(image.image_path)}  // Copy on image click
                                    loading="lazy"
                                />
                                <div
                                    className={`copy-icon ${copied === image.image_path ? 'copied' : ''}`}
                                    style={{
                                        position: 'absolute',
                                        top: '4px',
                                        right: '15px',
                                        cursor: 'pointer',
                                        backgroundColor: '#fff',
                                        borderRadius: '50%',
                                        padding: '5px',
                                        color: 'white',
                                    }}
                                    onClick={() => copyToClipboard(image.image_path)}
                                >
                                    {copied === image.image_path ? (
                                        <CheckIcon style={{ color: '#000' }} />
                                    ) : (
                                        <ContentCopyIcon style={{ color: '#000' }} />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No images found.</p>
                )}
            </div>

            {displayedImages.length < images.length && (
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <button onClick={loadMoreImages} className="btn btn-primary">
                        Load More Images
                    </button>
                </div>
            )}
        </div>
    );
};

export default BodyImages;


