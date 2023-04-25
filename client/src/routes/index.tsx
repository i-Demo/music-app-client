import Auth from "../pages/Auth";
import CreateSong from "../pages/CreateSong";
import DashBoard from "../pages/DashBoard";
import Preferences from "../pages/Preferences";
import Profile from "../pages/Profile";

// Public Routes
const publicRoutes = [
    { path: "/", element: <Auth authRoute="welcome" /> },
    { path: "/login", element: <Auth authRoute="login" /> },
    { path: "/register", element: <Auth authRoute="register" /> },
];

// Private Routes
const privateRoutes = [
    { path: "/dashboard", element: <DashBoard /> },
    { path: "/createSong", element: <CreateSong /> },
    { path: "/preferences", element: <Preferences /> },
    { path: "/profile", element: <Profile /> },
    { path: "/search", element: <DashBoard /> },
    { path: "/newPublish", element: <DashBoard /> },
    { path: "/top100", element: <DashBoard /> },
    { path: "/mv", element: <DashBoard /> },
    { path: "/library/favorite", element: <DashBoard /> },
    { path: "/library/playlist", element: <DashBoard /> },
];

export { publicRoutes, privateRoutes };
