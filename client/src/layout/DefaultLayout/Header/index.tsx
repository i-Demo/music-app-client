import Tippy from "@tippyjs/react";
import { useEffect, useContext } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { BiCaretDown } from "react-icons/bi";
import { AuthContext } from "../../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import defaultAvatar from "@assets/images/defaultAvatar.webp";

function Header() {
    const {
        authState: { user },
    } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        const dashboard = document.querySelector(".dashboard") as HTMLElement;
        const header = document.querySelector(".header") as HTMLElement;

        dashboard.addEventListener("scroll", () => {
            if (dashboard.scrollTop > 0) {
                header.style.backgroundColor = "#121212";
                header.style.opacity = `${dashboard.scrollTop / 64}`;
            } else {
                header.style.backgroundColor = "transparent";
            }
        });
    }, []);
    return (
        <header className="h-16 absolute top-0 right-0 left-0 z-[3] flex justify-between items-center px-10">
            <div className="header absolute top-0 right-0 left-0 bottom-0 z-[-9999]"></div>
            <div className="text-xl flex gap-4">
                <Tippy delay={[200, 0]} content="Quay lại" placement="bottom" className="tooltip">
                    <button className="btnRounded bg-primary" onClick={() => navigate(-1)}>
                        <MdArrowBackIos className="ml-2" />
                    </button>
                </Tippy>
                <Tippy delay={[200, 0]} content="Tiếp theo" placement="bottom" className="tooltip">
                    <button className="btnRounded bg-primary" onClick={() => navigate(1)}>
                        <MdArrowForwardIos className="ml-1" />
                    </button>
                </Tippy>
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
                            <BiCaretDown />
                        </button>
                    </Tippy>
                </Menu>
            </div>
        </header>
    );
}

export default Header;
