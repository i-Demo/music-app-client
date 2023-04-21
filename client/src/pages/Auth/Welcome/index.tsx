import { Link } from "react-router-dom";

function Welcome() {
    return (
        <>
            <h3 className="text-white text-center font-bold mb-8">
                Milions of songs.
                <br /> Free on Music App
            </h3>

            <Link to="/login" className="w-full">
                <button className="btn bg-btn mb-8">Log in</button>
            </Link>
            <Link to="/register" className="mb-12 text-sm text-tGray">
                Don't have an account? <span className="underline uppercase text-white font-semibold">signup</span>
            </Link>
        </>
    );
}

export default Welcome;
