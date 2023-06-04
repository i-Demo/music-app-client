import Auth from "../pages/Auth";
import CreatePlaylist from "../pages/CreatePlaylist";
import CreateSong from "../pages/CreateSong";
import DashBoard from "../pages/DashBoard";
import Error from "../pages/Error";
import Favorite from "../pages/Favorite";
import Library from "../pages/Library";
import NewPublish from "../pages/NewPublish";
import Preferences from "../pages/Preferences";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import Top100 from "../pages/Top100";
import Playlist from "../pages/Playlist";
import User from "../pages/User";
import AllPublicPlaylists from "../pages/AllPublicPlaylists";
import Type from "../pages/Type";

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
    { path: "/user/:id", element: <User /> },
    { path: "/user/:id/public-playlists", element: <AllPublicPlaylists /> },
    { path: "/search", element: <Search /> },
    { path: "/type/:type", element: <Type /> },
    { path: "/newPublish", element: <NewPublish /> },
    { path: "/top100", element: <Top100 /> },
    { path: "/library", element: <Library /> },
    { path: "/collection/favorite", element: <Favorite /> },
    { path: "/playlist/:id", element: <Playlist /> },
    { path: "/error", element: <Error /> },
    // { path: "/mv", element: <DashBoard /> },
];

export { publicRoutes, privateRoutes };
