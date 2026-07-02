import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Profile from '../components/Profile';

function FarmerAccount() {
  const { user } = useAuth();

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="mb-1">Farmer Account</h2>
          <div className="text-muted">Signed in as {user?.username}</div>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <Link className="btn btn-outline-success" to="/purchase">
            My Purchase Requests
          </Link>
          <Link className="btn btn-outline-success" to="/transactions">
            My Transactions
          </Link>
          <Link className="btn btn-success" to="/farmer">
            Dashboard
          </Link>
        </div>
      </div>

      <Profile />
    </div>
  );
}

export default FarmerAccount;

