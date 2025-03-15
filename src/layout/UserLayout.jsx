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
import { saveUser } from "../redux/features/userSlice";

function UserLayout() {
  const { isUserAuth } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Fetch user authentication status from the backend
    axiosInstance
      .get("/api/user/check")
      .then((res) => {
        dispatch(saveUser(res.data)); // Update Redux state with authenticated user
      })
      .catch(() => {
        console.log("User is not authenticated");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  console.log("User Authentication =====", isUserAuth);

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
