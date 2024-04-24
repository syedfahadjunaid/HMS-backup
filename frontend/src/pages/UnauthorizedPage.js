import React from "react";

import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const navigate = useNavigate();
  return (
    <div>
      <p>Unauthorized Access</p>
      <button className='buttonFilled' onClick={() => navigate("/")}>
        Login
      </button>
    </div>
  );
}
