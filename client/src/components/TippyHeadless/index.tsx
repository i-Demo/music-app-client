import Tippy from "@tippyjs/react/headless";
import { useContext, useState } from "react";
import { AiFillFolderAdd, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { AuthContext } from "../../contexts/authContext";
import { SongContext } from "../../contexts/songContext";

function TippyHeadless({ children, idSong }: { children: JSX.Element; idSong: string }) {
    const { authState, authDispatch } = useContext(AuthContext);
    const { likeSong } = useContext(SongContext);
    const [visible, setVisible] = useState(false);

    const handleClickLikeSong = async (idSong: string) => {
        try {
            const responseData = await likeSong(idSong);
            authDispatch(responseData.user);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Tippy
            interactive
            visible={visible}
            onClickOutside={() => setVisible(false)}
            offset={[0, 12]}
            delay={[0, 0]}
            placement="bottom-start"
            render={(attrs) => (
                <div
                    className="tooltip flex flex-col p-1 min-w-[196px] min-h-max"
                    tabIndex={-1}
                    {...attrs}
                    onClick={() => setVisible(false)}
                >
                    <button className="menu justify-start cursor-pointer" onClick={() => handleClickLikeSong(idSong)}>
                        {authState.user.likedSongs.findIndex((song: { id: string }) => song.id === idSong) !== -1 ? (
                            <>
                                <AiFillHeart className="text-xl text-btn" />
                                <span>Xoá khỏi Yêu Thích</span>
                            </>
                        ) : (
                            <>
                                <AiOutlineHeart className="text-xl" />
                                <span>Lưu vào Yêu Thích</span>
                            </>
                        )}
                    </button>
                    <button className="menu justify-start cursor-pointer">
                        <AiFillFolderAdd className="text-xl" />
                        <span>Thêm vào</span>
                    </button>
                </div>
            )}
            // onHide={}
        >
            <div onClick={() => setVisible(true)}>{children}</div>
        </Tippy>
    );
}

export default TippyHeadless;
