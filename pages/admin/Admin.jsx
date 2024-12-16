


// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import AddIcon from '@mui/icons-material/Add';
// import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
// import GridViewIcon from '@mui/icons-material/GridView';
// import ImageIcon from '@mui/icons-material/Image';
// import LogoutIcon from '@mui/icons-material/Logout';
// import BlogManagement from './BlogManagement';
// import Dashboard from './Dashboard';
// import BlogPosts from './BlogPosts';
// import BodyImages from './BodyImages';

// const Admin = () => {
//   const router = useRouter();
//   const [activeSection, setActiveSection] = useState('dashboard'); // Default section
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkLoginStatus = () => {
//       const loggedInStatus = localStorage.getItem('isLoggedIn');
//       if (!loggedInStatus) {
//         router.push('/admin/login');
//       } else {
//         setIsLoggedIn(true);
//       }
//     };
//     checkLoginStatus();
//   }, []);

//   const changeSection = (sectionName) => {
//     setActiveSection(sectionName);
//     router.push(`/admin/Admin?section=${sectionName}`, undefined, { shallow: true });
//   };

//   // const handleLogout = () => {
//   //   const confirmLogout = window.confirm('Are you sure you want to log out?');
//   //   if (confirmLogout) {
//   //     localStorage.removeItem('isLoggedIn');
//   //     setIsLoggedIn(false); // Clear login status
//   //     router.push('/admin/login');
//   //   }
//   // };

//   const handleLogout = () => {
//   const confirmLogout = window.confirm('Are you sure you want to log out?');
//   if (confirmLogout) {
//     localStorage.removeItem('isLoggedIn'); // Clear login status
//     router.push('/admin/login'); // Redirect to login page
//   }
// };


//   const renderContent = () => {
//     switch (activeSection) {
//       case 'dashboard':
//         return <Dashboard />;
//       case 'blogManagement':
//         return <BlogManagement />;
//       case 'addBlog':
//         return <BlogPosts />;
//       case 'bodyImages':
//         return <BodyImages />;
//       default:
//         return <div>Page Not Found</div>;
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="col-xxl-2 col-xl-2 col-lg-3 col-md-3 col-sm-4 pr-0 pl-0">
//           <aside>
//             <div className="aside_inner_section">
//               <img
//                 src="https://kvch.in/assets-new/img/footer-logo.webp"
//                 style={{ width: 'auto', height: '40px', marginBottom: '2rem' }}
//                 alt="Logo"
//               />
//               <a onClick={() => changeSection('dashboard')} style={{ cursor: 'pointer' }}>
//                 <GridViewIcon /> Dashboard
//               </a>
//               <a onClick={() => changeSection('blogManagement')} style={{ cursor: 'pointer' }}>
//                 <FormatListBulletedIcon /> Blog Management
//               </a>
//               <a onClick={() => changeSection('addBlog')} style={{ cursor: 'pointer' }}>
//                 <AddIcon /> Add Blog
//               </a>
//               <a href='' onClick={() => changeSection('bodyImages')} style={{ cursor: 'pointer' }} target='_blank'>
//                 <ImageIcon /> Body Images
//               </a>
//               <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
//                 <LogoutIcon /> Log Out
//               </a>
//             </div>
//           </aside>
//         </div>

//         <div className="col-xxl-10 col-xl-10 col-lg-9 col-md-9 col-sm-8 pr-0 pl-0">
//           <main>
//             {renderContent()}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;


import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewIcon from '@mui/icons-material/GridView';
import ImageIcon from '@mui/icons-material/Image';
import LogoutIcon from '@mui/icons-material/Logout';
import BlogManagement from './BlogManagement';
import Dashboard from './Dashboard';
import BlogPosts from './BlogPosts';
import BodyImages from './BodyImages';
import BlogUpdate from './BlogUpdate';

const Admin = () => {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState('dashboard');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = () => {
            const loggedInStatus = localStorage.getItem('isLoggedIn');
            if (!loggedInStatus) {
                router.push('/admin/login'); // Redirect to login if not logged in
            } else {
                setIsLoggedIn(true);
            }
        };
        checkLoginStatus();
    }, []);

    // const changeSection = (sectionName) => {
    //     setActiveSection(sectionName);
    //     router.push(`/admin/Admin?section=${sectionName}`, undefined, { shallow: true });
    // };

    const changeSection = (sectionName) => {
        setActiveSection(sectionName);
        router.push(`/admin/Admin?section=${sectionName}`, undefined, { shallow: true });
    };


    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
            localStorage.removeItem('isLoggedIn'); // Clear session
            setIsLoggedIn(false);
            router.push('/admin/login'); // Redirect to login page
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return <Dashboard />;
            case 'blogManagement':
                return <BlogManagement />;
            case 'addBlog':
                return <BlogPosts />;
            case 'bodyImages':
                return <BodyImages />;
            case 'BlogUpdate':
                return <BlogUpdate />;
            default:
                return <div>Page Not Found</div>;
        }
    };

    if (!isLoggedIn) return null; // Wait for login check before rendering

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xxl-2 col-xl-2 col-lg-3 col-md-3 col-sm-4 pr-0 pl-0">
                    <aside>
                        <div className="aside_inner_section">
                            <img
                                src="https://kvch.in/assets-new/img/footer-logo.webp"
                                style={{ width: 'auto', height: '40px', marginBottom: '2rem' }}
                                alt="Logo"
                            />
                            <a onClick={() => changeSection('dashboard')} style={{ cursor: 'pointer' }}>
                                <GridViewIcon /> Dashboard
                            </a>
                            <a onClick={() => changeSection('blogManagement')} style={{ cursor: 'pointer' }}>
                                <FormatListBulletedIcon /> Blog Management
                            </a>
                            <a onClick={() => changeSection('addBlog')} style={{ cursor: 'pointer' }}>
                                <AddIcon /> Add Blog
                            </a>
                            <a href='' onClick={() => changeSection('bodyImages')} target='_blank' style={{ cursor: 'pointer' }}>
                                <ImageIcon /> Body Images
                            </a>
                            <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                <LogoutIcon /> Log Out
                            </a>
                        </div>
                    </aside>
                </div>

                <div className="col-xxl-10 col-xl-10 col-lg-9 col-md-9 col-sm-8 pr-0 pl-0">
                    <main>{renderContent()}</main>
                </div>
            </div>
        </div>
    );
};

export default Admin;

