import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { average } from "color.js";
import { AuthContext } from "../../../contexts/authContext";
import defaultPlaylist from "@assets/images/defaultPlaylist.png";
import defaultAvatar from "@assets/images/defaultAvatar.png";

interface PageHeader {
    id?: string;
    image: string;
    title: string;
    name: string;
    desc: string;
    avatar: string;
    userID: string;
    userName: string;
    songs: any;
    setIsShowModal?: any;
}
function PageHeader({ id, image, title, name, desc, avatar, userID, userName, songs, setIsShowModal }: PageHeader) {
    const { authState } = useContext(AuthContext);

    // Get duration of All Songs
    const getDurationSongs = (songs: Array<object>) => {
        const totalDuration = songs.reduce((total, song: any) => {
            return total + song.duration;
        }, 0);
        const hours = Math.floor(totalDuration / 3600);
        const minutes = Math.floor((totalDuration - hours * 3600) / 60);
        const stringTime = `khoảng ${hours > 0 ? hours + " giờ " : ""}${minutes} phút`;
        return stringTime;
    };
    // Change font-size according text length
    const getFontSize = (textLength: any) => {
        let fontSize = "md:text-[3rem] md:leading-[3rem] lg:text-[4rem] lg:leading-[4rem]";
        if (textLength >= 20) {
            fontSize = "md:text-[2rem] md:leading-[2rem] lg:text-[3rem] lg:leading-[3rem]";
        }
        return fontSize;
    };
    useEffect(() => {
        const listSongsHeader = document.querySelector(".listSongsHeader") as HTMLElement;
        // Get dominant to render background color
        average(`${image || defaultPlaylist}`, { format: "hex" }).then((color) => {
            if (listSongsHeader) {
                listSongsHeader.style.backgroundColor = `${color}`;
                listSongsHeader.style.boxShadow = `0 50px 200px ${color}`;
            }
        });
    }, [image]);

    return (
        <div>
            <div className="listSongsHeader h-[340px] px-4 pt-[124px] lg:px-8 lg:pt-[84px] pb-6 flex gap-8 text-xs md:text-sm">
                <div
                    className={`lg:min-w-[232px] lg:h-[232px] w-48 h-48 min-w-[192px] overflow-hidden shadow-[0_20px_50px_rgba(0,_0,_0,_0.7)] ${
                        authState.user.myPlaylists.some((playlist: any) => playlist._id === id)
                            ? "hover:cursor-pointer"
                            : ""
                    }`}
                    onClick={() =>
                        authState.user.myPlaylists.some((playlist: any) => playlist._id === id)
                            ? setIsShowModal(true)
                            : {}
                    }
                >
                    <img
                        src={image || defaultPlaylist}
                        alt="Image"
                        className=" object-cover lg:w-[232px] lg:h-[232px] w-48 h-48 rounded"
                    />
                </div>
                <div className="flex flex-col justify-end gap-2">
                    <span className="font-bold">{title}</span>
                    <p
                        className={`text-[2rem] leading-8 font-bold mb-2 ${
                            authState.user.myPlaylists.some((playlist: any) => playlist._id === id)
                                ? "hover:cursor-pointer"
                                : "cursor-default"
                        } ${getFontSize(name.length)}`}
                        onClick={() =>
                            authState.user.myPlaylists.some((playlist: any) => playlist._id === id)
                                ? setIsShowModal(true)
                                : {}
                        }
                    >
                        {name}
                    </p>
                    <span className="opacity-70 font-semibold">{desc}</span>
                    <p className="flex gap-1 items-center">
                        <img src={avatar || defaultAvatar} alt="Avatar" className="w-6 h-6 rounded-full object-cover" />
                        <Link to={`/user/${userID}`} className="font-semibold hover:underline">
                            {userName}
                        </Link>
                        {songs.length > 0 && (
                            <span className="font-medium whitespace-nowrap">{` • ${
                                songs.length
                            } bài hát • ${getDurationSongs(songs)}`}</span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PageHeader;
