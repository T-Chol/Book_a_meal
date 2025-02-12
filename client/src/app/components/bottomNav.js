import React from "react";

export default function BottomNav() {
return (
<>

<div className="  flex-wrap justify-between m-auto rounded-md grid grid-cols-3 w-screen px-16 ">
    <div className="col-start-1  mb-4">
    <h4>Our Location</h4>
    <p>p</p>
    <p>
        1234 Tea Avenue, Suite 100<br />
        Downtown City, State 12345<br />
        Country
    </p>
    </div>

    <div className=" mb-4 col-start-2 ">
    <h4>Contact Us</h4>
    <p>
        <strong>Email:</strong> contact@ourcompany.com<br />
        <strong>Phone:</strong> (555) 123-4567<br />
        <strong>Fax:</strong> (555) 765-4321
    </p>
    </div>

    <div className="col-start-3 mb-4">
    <h4 className="mb-4">Follow Us</h4>
    <p>
    <link
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
rel="stylesheet"
/>

        <a
            
        href="https://www.instagram.com/ourcompany" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="btn btn-outline-primary hover:text-white hover:bg-blue-600 bg-white p-2 rounded-lg text-blue-600 mr-5 border border-blue-600 "
        >
        <i className="fab fa-instagram" ></i> Instagram
        </a>
        <a 
        href="https://www.facebook.com/ourcompany" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="btn btn-outline-primary hover:text-white hover:bg-blue-600 bg-white p-2 rounded-lg text-blue-600 mr-5 border border-blue-600 "
        >
        <i className="fab fa-facebook"></i> Facebook
        </a>
    </p>
    </div>
</div>
</>
);
}
