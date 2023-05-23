import { useEffect } from "react";
import { average } from "color.js";
import defaultAvatar from "@assets/images/defaultAvatar.png";

interface UserHeaderType {
    user: any;
}
function UserHeader({ user }: UserHeaderType) {
    // Change font-size according text length
    const getFontSize = (textLength: any) => {
        let fontSize = "md:text-[4rem] md:leading-[4rem] lg:text-[5rem] lg:leading-[5rem]";
        if (textLength >= 20) {
            fontSize = "lg:text-[4rem] lg:leading-[4rem]";
        }
        return fontSize;
    };

    useEffect(() => {
        // Handle set color Page Header
        const profileHeader = document.querySelector(".profileHeader") as HTMLElement;
        average(`${user.avatar || defaultAvatar}`, { format: "hex" }).then((color) => {
            if (profileHeader) {
                profileHeader.style.backgroundColor = `${color}`;
                profileHeader.style.boxShadow = `0 50px 200px ${color}`;
            }
        });
    }, []);
    return (
        <div className="profileHeader h-[340px] px-4 pt-[124px] lg:px-8 lg:pt-[84px] pb-6 flex gap-8 text-xs md:text-sm">
            <div className="lg:min-w-[232px] lg:h-[232px] w-48 h-48 min-w-[192px] overflow-hidden shadow-[0_20px_50px_rgba(0,_0,_0,_0.7)] rounded-full">
                <img
                    src={user.avatar || defaultAvatar}
                    alt="Avatar"
                    className="object-cover lg:w-[232px] lg:h-[232px] w-48 h-48"
                />
            </div>
            <div className="flex flex-col justify-end gap-2">
                <span className="text-sm font-bold">Hồ sơ</span>
                <p className={`font-bold my-2 cursor-default text-5xl ${getFontSize(user.name.length)}`}>{user.name}</p>
                <span className="font-medium whitespace-nowrap">{`• ${user.publicPlaylists.length} danh sách phát công khai`}</span>
            </div>
        </div>
    );
}

export default UserHeader;
