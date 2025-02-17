
"use client";
import UserHeader from "../components/userHeader";
import withAuth from "../hoc/withAuth";

import React from 'react'

function page() {
  return (
    <>
    <UserHeader/>
      <p>my cart</p>
    </>
  )
}
export default withAuth(page, "user");
