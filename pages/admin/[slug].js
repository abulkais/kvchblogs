// import BlogUpdate from "./BlogUpdate";
// import { useRouter } from "next/router";

// const UpdatePage = () => {
//     const router = useRouter();
//     const { slug } = router.query; // Extract 'slug' from the URL

//     if (!slug) {
//         return <p>Loading...</p>; // Wait until slug is available
//     }

//     return <BlogUpdate slug={slug} />; // Pass slug to BlogUpdate
// };

// export default UpdatePage;

import React, { useEffect, useState } from 'react';

import BlogUpdate from "./BlogUpdate";
import { useRouter } from "next/router";

const UpdatePage = () => {
    const router = useRouter();
    const { slug } = router.query; // Extract 'slug' from the URL

    // Check if the user is logged in
    useEffect(() => {
        const checkLoginStatus = () => {
            const loggedInStatus = localStorage.getItem('isLoggedIn');
            if (!loggedInStatus) {
                router.push('/admin/login'); // Redirect to login if not logged in
            }
        };
        checkLoginStatus();
    }, []);

    if (!slug) {
        return <p>Loading...</p>; // Wait until slug is available
    }

    return <BlogUpdate slug={slug} />;
};

export default UpdatePage;
