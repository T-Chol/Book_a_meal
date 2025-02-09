// src/components/Header.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Header.css'; // Import the Header CSS

// function Header({ handleLogout, isLoggedIn }) {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light header">
//       <div className="container-fluid">
//         {/* Add hotel log
// 
// 
// o */}
//         <Link className="navbar-brand d-flex align-items-center" href="/">
//           <img
//             src="/assets/logo.jpeg" // Replace with your logo's path
//             alt="Logo"
//             className="hotel-logo"
//           />
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav mx-auto">
//             <li className="nav-item">
//               <Link className="nav-link" href="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" href="/menu">Menu</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" href="/about">About Us</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" href="/team">Team</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" href="/specials">Today's Specials</Link>
//             </li>
//           </ul>
//           <ul className="navbar-nav ms-auto">
//             {!isLoggedIn ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link btn btn-primary mx-2" href="/signup">
//                     Sign Up
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link btn btn-secondary mx-2" href="/login">
//                     Log In
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <li className="nav-item">
//                 <button className="btn btn-danger mx-2" onClick={handleLogout}>
//                   Log Out
//                 </button>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Header;


import React from 'react';
// import { Link } from 'react-router-dom';
import './Header.css'; // Import the Header CSS
import Link from 'next/link';

function Header({ handleLogout, isLoggedIn, user }) {
  return (
  
      <div className="  shadow-lg h-20 flex justify-between  items-center">
        {/* Add hotel logo */}
        <Link className=" align-items-center  " href="/landingPage">
          <img
            src="./logo.jpeg" // Replace with your logo's path
            alt="Logo"
            className="hotel-logo "
          />
        </Link>
        <ul className=" navbar-nav flex ml-auto">
        <li className="nav-item">
              <Link className="nav-link " href="/landingPage">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/menu">Menu</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/team">Team</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/specials">Today's Specials</Link>
            </li>
            
        </ul>


        <ul className="ms-auto flex">
<li className="nav-item">
        <span className=" ">
  {user ? (user?.role === 'chef' ? <link href='/chef-dashboard' className=' border-green-600 text-amber-500' >`Hi Chef ${user?.name}` </link>: `Hi ${user?.name}`) : <Link className=' nav-link btn btn-secondary mx-2 bg-gray-500 p-2 rounded-md' href={"/login"}  >Log In</Link>}
</span>


</li>

<li className="nav-item">
<div >
  {user ?<Link className=' mx-2  bg-slate-10 ring-red-600 ring-1 text-xl  text-red-600 p-2 rounded-md' href={"/"} >Log Out</Link> : <Link className='  nav-link btn btn-secondary mx-2 bg-gray-500 p-2 rounded-md ' href={"/signup"}>Sign Up</Link>  }
</div>
</li>

</ul>

      </div>
    
  );
}

export default Header;
