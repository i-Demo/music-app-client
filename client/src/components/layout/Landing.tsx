import { Navigate } from "react-router-dom";

export interface IHomePageProps {}

const Landing = () => {
    return <Navigate to="/welcome" />;
};

export default Landing;
