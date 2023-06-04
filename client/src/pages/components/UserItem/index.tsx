import { Link } from "react-router-dom";
import defaultAvatar from "@assets/images/defaultAvatar.png";

function UserItem({ user }: any) {
    return (
        <Link to={`/user/${user._id}`} className="group col-span-1 p-4 bg-[#202020] hover:bg-bgTooltip rounded-md">
            <div className="flex justify-center items-center">
                <img src={user.avatar || defaultAvatar} alt="Image" className="rounded-full object-cover aspect-square" />
            </div>
            <p className="text-base font-bold py-4 truncate">{user.name}</p>
            <span className="text-textGray text-xs md:text-sm opacity-80">Hồ sơ</span>
        </Link>
    );
}

export default UserItem;
