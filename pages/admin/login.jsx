

// import React, { useState } from 'react';
// import { useRouter } from 'next/router';

// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = ({ onLogin }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const router = useRouter(); // Use Next.js useRouter instead of useNavigate

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         setLoading(true);
//         setError('');
//         try {
//             if (!email) {
//                 toast.error('User is required');
//                 setLoading(false);
//                 return;
//             }

//             if (!password) {
//                 toast.error('Password is required');
//                 setLoading(false);
//                 return;
//             }

//             const response = await axios.post('https://kvch.in:859/api/login', { email, password });
//             console.log(response.data);

//             if (response.data === 'Login successful') {
//                 localStorage.setItem('isLoggedIn', 'true'); // Save login status
//                 onLogin(); // Update parent state
//                 router.push('/admin/Admin'); // Use router.push for navigation
//                 console.log(email, password);
//                 console.log(response);

//             } else {
//                 setError('Invalid email or password');
//                 toast.error('Invalid email or password');
//                 console.log(email, password);
//                 console.log(response);

//             }
            
//         } catch (error) {
//             setError('An error occurred during login');
//             toast.error('An error occurred during login');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container">
//             <ToastContainer />
//             <div className="login_container">
//                 <div className="login_box">
//                     <h1>Login</h1>
//                     <p>Please sign in to access the admin panel</p>
//                     {error && <p className="error-message">{error}</p>}
//                     <form onSubmit={handleLogin}>
//                         <div className="form-group">
//                             <input
//                                 type="text"
//                                 placeholder="User"
//                                 className="form-control"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <input
//                                 type="password"
//                                 placeholder="Password"
//                                 className="form-control"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                         </div>
//                         <button type="submit" disabled={loading}>
//                             {loading ? 'Logging in...' : 'Login'}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!email || !password) {
                toast.error('Email and password are required');
                setLoading(false);
                return;
            }

            const response = await axios.post('https://kvch.in:859/api/login', { email, password });
            console.log('Response:', response.data);

            if (response.data === 'Login successful') {
                localStorage.setItem('isLoggedIn', 'true'); // Save session
                toast.success('Login successful!');
                router.push('/admin/Admin'); // Redirect to Admin page
            } else {
                toast.error('Invalid email or password');
            }
        } catch (error) {
            console.error('Login Error:', error.response?.data || error.message);
            toast.error('An error occurred during login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <ToastContainer />
            <div className="login_container">
                <div className="login_box">
                    <h1>Login</h1>
                    <p>Please sign in to access the admin panel</p>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
