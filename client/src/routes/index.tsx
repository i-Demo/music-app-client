import Auth from "../pages/Auth";
import CreatePlaylist from "../pages/CreatePlaylist";
import CreateSong from "../pages/CreateSong";
import DashBoard from "../pages/DashBoard";
import Error from "../pages/Error";
import Favorite from "../pages/Favorite";
import NewPublish from "../pages/NewPublish";
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
    { path: "/createPlaylist", element: <CreatePlaylist /> },
    { path: "/preferences", element: <Preferences /> },
    { path: "/profile", element: <Profile /> },
    { path: "/search", element: <DashBoard /> },
    { path: "/newPublish", element: <NewPublish /> },
    { path: "/top100", element: <DashBoard /> },
    { path: "/mv", element: <DashBoard /> },
    { path: "/error", element: <Error /> },
    { path: "/library/favorite", element: <Favorite /> },
    { path: "/library/playlist", element: <DashBoard /> },
];

export { publicRoutes, privateRoutes };
