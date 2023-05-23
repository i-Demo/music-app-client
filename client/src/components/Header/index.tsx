import Tippy from "@tippyjs/react";
import { useEffect, useContext } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { BiCaretDown } from "react-icons/bi";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import defaultAvatar from "@assets/images/defaultAvatar.png";

function Header({ children, offsetBg, offsetContent }: any) {
    const {
        authState: { user },
    } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        const dashboard = document.querySelector(".dashboard") as HTMLElement;
        const bgHeader = document.querySelector(".bgHeader") as HTMLElement;
        const contentHeader = document.querySelector(".contentHeader") as HTMLElement;

        if (offsetContent === 0) {
            contentHeader.style.display = "block";
            bgHeader.style.opacity = "1";
        } 

        const handleScroll = () => {
            if (dashboard.scrollTop > offsetBg) {
                bgHeader.style.backgroundColor = "#121212";
                bgHeader.style.opacity = `${(dashboard.scrollTop - offsetBg) / 64}`;
            } else {
                bgHeader.style.backgroundColor = "transparent";
                bgHeader.style.opacity = "1";
            }

            if (dashboard.scrollTop >= offsetContent) {
                contentHeader.style.display = "block";
            } else {
                contentHeader.style.display = "none";
            }
        };

        dashboard.addEventListener("scroll", handleScroll);

        () => {
            dashboard.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <header className="h-16 absolute top-0 right-0 left-0 z-[3] flex justify-between items-center px-10">
            <div className="bgHeader absolute top-0 right-0 bottom-0 left-0 z-[-9999]"></div>
            <div className="text-xl flex items-center gap-4">
                <Tippy delay={[200, 0]} content="Quay lại" placement="bottom" className="tooltip">
                    <button className="btnRounded bg-primary opacity-100" onClick={() => navigate(-1)}>
                        <MdArrowBackIos className="ml-2" />
                    </button>
                </Tippy>
                <Tippy delay={[200, 0]} content="Tiếp theo" placement="bottom" className="tooltip">
                    <button className="btnRounded bg-primary" onClick={() => navigate(1)}>
                        <MdArrowForwardIos className="ml-1" />
                    </button>
                </Tippy>
                <div className="contentHeader hidden">{children}</div>
            </div>

            <div>
                <Menu>
                    <Tippy delay={[200, 0]} content={user.name} placement="bottom" className="tooltip">
                        <button className="flex justify-center items-center gap-2 h-8 rounded-3xl bg-primary p-[2px] hover:bg-bgTooltip">
                            <div className="w-7 h-7 object-fit">
                                <img
                                    src={user.avatar || defaultAvatar}
                                    alt="Avatar"
                                    className="rounded-full border-none w-full h-full object-fit"
                                />
                            </div>
                            <span className="hidden md:block text-sm font-semibold whitespace-nowrap">{user.name}</span>
                            <span className="hidden md:block">
                                <BiCaretDown />
                            </span>
                        </button>
                    </Tippy>
                </Menu>
            </div>
        </header>
    );
}

export default Header;
