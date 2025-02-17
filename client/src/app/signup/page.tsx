// client/src/app/signUp/page.tsx
"use client";
import './signUp.css';
import BottomNav from '../components/bottomNav.js';
import Header from '../components/header';
import SignUpForm from '../components/signUpForm.js';
import { UserProvider } from '../context/user';

const SignUp = () => {


return (
    <>
<UserProvider>
    <Header />
<div className="signup-container m-8">
    <h2>Sign Up</h2>
    <SignUpForm />
</div>
<BottomNav/>
</UserProvider>
</>
);
};

export default SignUp;

