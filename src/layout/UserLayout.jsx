// import React, { useEffect, useState } from 'react'
// import Header from '../components/User/Header'
// import Footer from '../components/User/Footer'
// import { Outlet, useLocation } from 'react-router-dom'
// import BaseHeader from '../components/User/BaseHeader'
// import { axiosInstance } from '../config/axiosInstance'
// import { useSelector, useDispatch } from 'react-redux'
// import { saveUser } from '../redux/features/userSlice'

// function UserLayout() {

//   const { isUserAuth, userData } = useSelector((state) => state.user)
//   const [isLoading,setIsLoading] = useState(true)
//   const dispatch = useDispatch()
//   const location = useLocation()

//   const checkUser = () => {
//     axiosInstance.get("/api/user/check")
//       .then(res => {
//         dispatch(saveUser(res.data))
//         setIsLoading(false)

//       })
//       .catch(error => {
//         console.log(error)
//         setIsLoading(false)
//       })
//   }
//   console.log("User Authentication =====",isUserAuth)

//   useEffect(() => {
//     checkUser()
//   }, [location.pathname])

//   return isLoading ? null : (
//     <>
    
//       {/* Header */}
//       {
//         isUserAuth ? <Header /> : <BaseHeader />
//       }


//       {/* Page Details */}
//       <div className='min-h-96 pt-10'>
//         <Outlet />
//       </div>

//       {/* Footer */}
//       <Footer />
//     </>
//   )
// }

// export default UserLayout

// import React, { useEffect, useState } from "react";
// import Header from "../components/User/Header";
// import Footer from "../components/User/Footer";
// import { Outlet, useLocation } from "react-router-dom";
// import BaseHeader from "../components/User/BaseHeader";
// import { axiosInstance } from "../config/axiosInstance";
// import { useSelector, useDispatch } from "react-redux";
// import { saveUser } from "../redux/features/userSlice";

// function UserLayout() {
//   const { isUserAuth, userData } = useSelector((state) => state.user);
//   const [isLoading, setIsLoading] = useState(true);
//   const dispatch = useDispatch();
//   const location = useLocation();

//   useEffect(() => {
//     if (!isUserAuth) {
//       // Only check user if not already authenticated
//       axiosInstance
//         .get("/api/user/check")
//         .then((res) => {
//           dispatch(saveUser(res.data));
//         })
//         .catch((error) => {
//           console.log(error);
//         })
//         .finally(() => {
//           setIsLoading(false);
//         });
//     } else {
//       setIsLoading(false);
//     }
//   }, []);

//   console.log("User Authentication =====", isUserAuth);

//   return isLoading ? null : (
//     <>
//       {/* Header */}
//       {isUserAuth ? <Header /> : <BaseHeader />}

//       {/* Page Details */}
//       <div className="min-h-96 pt-10">
//         <Outlet />
//       </div>

//       {/* Footer */}
//       <Footer />
//     </>
//   );
// }

// export default UserLayout;


import React, { useEffect, useState } from "react";
import Header from "../components/User/Header";
import Footer from "../components/User/Footer";
import { Outlet, useLocation } from "react-router-dom";
import BaseHeader from "../components/User/BaseHeader";
import { axiosInstance } from "../config/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { saveUser, logout } from "../redux/features/userSlice";

function UserLayout() {
  const { isUserAuth } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [justLoggedOut, setJustLoggedOut] = useState(false); // Prevents re-fetching after logout
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (justLoggedOut) {
      setJustLoggedOut(false); // Reset flag after handling logout
      setIsLoading(false);
      return;
    }

    axiosInstance
      .get("/api/user/check")
      .then((res) => {
        dispatch(saveUser(res.data)); // Update Redux state if user is authenticated
      })
      .catch(() => {
        console.log("User is not authenticated");
        dispatch(logout()); // Ensure user state is false
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [location.pathname]);

  return isLoading ? null : (
    <>
      {/* Header */}
      {isUserAuth ? <Header /> : <BaseHeader />}

      {/* Page Details */}
      <div className="min-h-96 pt-10">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default UserLayout;

