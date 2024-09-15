import {useContext, useEffect, useState} from "react";
import {User, UserContext, UserContextType} from "../UserContext.jsx";
import { Navigate, useParams} from "react-router-dom";
import axios from "axios";

import AccountNav from "./AccountNav";
import PlacesPage from "./PlacesPage.js";

export default function ProfilePage() {
  const [redirect,setRedirect] = useState("");
  const {ready,user,setUser} = useContext(UserContext) as UserContextType;

  let {subpage} = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function fetchUserData() {
    try {
      const response = await axios.get<{ user: User }>('/user/profile');
      setUser(response.data.user); // Extract and set the user object
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    if (ready && user) {
      fetchUserData(); // Fetch user data when the component is mounted or user is ready
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function logout() {
    await axios.post('/user/logout');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user?.name} ({user?.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage/>
      )}
    </div>
  );
}