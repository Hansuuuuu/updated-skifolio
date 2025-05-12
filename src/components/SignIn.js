import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import PageTemplate, { 
  AnimatedHeading, 
  AnimatedParagraph, 
  AnimatedButton, 
  AnimatedContainer ,
  AnimatedAnchor,
  AnimatedMap,
  AnimatedImage,
  AnimatedList,
  AnimatedListItem,
  AnimatedGroup
} from './PageTemplate';
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check both applicants and employers collections
            const applicantDoc = await getDoc(doc(db, 'applicants', user.uid));
            const employerDoc = await getDoc(doc(db, 'employers', user.uid));
            const userDocToBeApproved = await getDoc(doc(db, 'userAccountsToBeApproved', user.uid));

            // Check if account is pending approval
            if (userDocToBeApproved.exists()) {
                setError('Your account is pending approval. Please wait for admin approval.');
                await signOut(auth);
                return;
            }

            // Check if account is disabled for applicants
            if (applicantDoc.exists()) {
                if (applicantDoc.data().disabled) {
                    setError('Your account has been disabled. Please contact support for assistance.');
                    await signOut(auth);
                    return;
                }
                navigate('/applicant/profile');
            } 
            // Check if account is disabled for employers
            else if (employerDoc.exists()) {
                if (employerDoc.data().disabled) {
                    setError('Your account has been disabled. Please contact support for assistance.');
                    await signOut(auth);
                    return;
                }
                navigate('/employer/profile');
            } 
            else {
                setError('User type not found in database.');
                await signOut(auth);
            }
        } catch (error) {
            console.error('Error signing in:', error);
            setError('Failed to sign in. Please check your email and password.');
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError('Please enter your email to reset your password.');
            return;
        }

        const confirmation = window.confirm(`Send password reset email to ${email}?`);
        if (!confirmation) return;

        try {
            await sendPasswordResetEmail(auth, email);
            setError('');
            alert(`A password reset link has been sent to ${email}. Please check your inbox.`);
        } catch (error) {
            console.error('Error sending password reset email:', error);
            if (error.code === 'auth/user-not-found') {
                setError('No account found with this email. Please check and try again.');
            } else if (error.code === 'auth/invalid-email') {
                setError('Invalid email format. Please enter a valid email.');
            } else {
                setError('Failed to send password reset email. Please try again later.');
            }
        }
    };

    return (
        <AnimatedGroup 
                className="my-12 space-y-6 bg-gray-50 p-6 rounded-lg shadow-md"
                baseDelay={0.2}  // Start delay (seconds)
                delayIncrement={0.15}  // Each child adds this much delay
              >
        <div className='hero' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div className='choicecontainer' style={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}>
                <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
                    <h2 style={{ fontFamily: "Times New Roman" }}>Log In</h2>
                    
                    {error && (
                        <div style={{ 
                            color: 'red', 
                            backgroundColor: '#ffeeee', 
                            padding: '10px', 
                            borderRadius: '5px', 
                            marginBottom: '15px',
                            width: '100%',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}
                    
                    <input
                        id='email'
                        className='inputs'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ marginBottom: '10px', width: '100%' }}
                    />

                    
                    <div style={{ position: 'relative', width: '100%', marginBottom: '10px' }}>
                        <input
                            className='inputs'
                            id='password'
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                marginLeft: '-2px'
                            }}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '15px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: 'gray',
                                userSelect: 'none',
                                marginLeft: '-2px'
                            }}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </span>
                    </div>

                    <button className="input-submit" type="submit">Log In</button>
                    <p onClick={handleForgotPassword} style={{ marginTop: '10px', cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>Forgot Password?</p>
                </form>
            </div>
        </div>
        </AnimatedGroup>
    );
};

export default SignIn;