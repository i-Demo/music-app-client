import { useContext, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { AuthContext } from "../../../contexts/authContext";
import DeletePlaylistModal from "./DeletePlaylistModal";

interface PlaylistOptionsType {
    children: JSX.Element;
    playlist: any;
    setIsShowModalUpdate: any;
    handleTogglePlaylist: () => Promise<any>;
    setToast: React.Dispatch<JSX.Element>;
}
function PlaylistOptions({
    children,
    playlist,
    setIsShowModalUpdate,
    handleTogglePlaylist,
    setToast,
}: PlaylistOptionsType) {
    const { authState, togglePublic } = useContext(AuthContext);
    const [visible, setVisible] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);

    const handleTogglePublic = async (e: any) => {
        e.preventDefault();
        const response = await togglePublic(playlist._id);
        if (response.success) {
            authState.user.publicPlaylists.includes(playlist._id)
                ? setToast(
                      <span className="text-sm font-semibold">Danh sách phát này hiện đã xoá khỏi hồ sơ của bạn.</span>
                  )
                : setToast(
                      <span className="text-sm font-semibold">Danh sách phát này hiện đã thêm vào hồ sơ của bạn.</span>
                  );
        }
    };

    return (
        <>
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
                        {authState.user._id === playlist.user && (
                            <>
                                <button className="menu justify-start cursor-pointer" onClick={handleTogglePublic}>
                                    <span>
                                        {authState.user.publicPlaylists.includes(playlist._id)
                                            ? "Xoá khỏi hồ sơ"
                                            : "Thêm vào hồ sơ"}
                                    </span>
                                </button>
                                <button className="menu justify-start cursor-pointer" onClick={setIsShowModalUpdate}>
                                    <span>Sửa thông tin chi tiết</span>
                                </button>
                                <button
                                    className="menu justify-start cursor-pointer"
                                    onClick={() => setIsShowModal(true)}
                                >
                                    <span>Xoá</span>
                                </button>
                            </>
                        )}
                        {authState.user._id !== playlist.user && (
                            <>
                                {authState.user.playlists.includes(playlist._id) && (
                                    <button className="menu justify-start cursor-pointer" onClick={handleTogglePublic}>
                                        <span>
                                            {authState.user.publicPlaylists.includes(playlist._id)
                                                ? "Xoá khỏi hồ sơ"
                                                : "Thêm vào hồ sơ"}
                                        </span>
                                    </button>
                                )}
                                <button className="menu justify-start cursor-pointer" onClick={handleTogglePlaylist}>
                                    {authState.user.playlists.includes(playlist._id)
                                        ? "Xoá khỏi Thư viện"
                                        : "Thêm vào Thư viện"}
                                </button>
                            </>
                        )}
                    </div>
                )}
            >
                <div onClick={() => setVisible(!visible)}>{children}</div>
            </Tippy>
            {isShowModal && (
                <DeletePlaylistModal
                    onClick={() => setIsShowModal(false)}
                    name={playlist.name}
                    idPlaylist={playlist._id}
                />
            )}
        </>
    );
}

export default PlaylistOptions;
