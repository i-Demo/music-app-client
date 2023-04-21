import { useContext, useState } from "react";
import Tippy from "@tippyjs/react/headless";
import { useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import { AuthContext } from "../../../../contexts/authContext";

function Menu({ children }: { children: JSX.Element }) {
    const { logoutUser } = useContext(AuthContext);

    const USER_MENU: any = [
        { title: "Hồ sơ", to: "/profile" },
        {
            title: "Cài đặt",
            to: "preferences",
        },
        {
            title: "Ngôn ngữ",
            children: {
                title: "Ngôn ngữ",
                data: [
                    {
                        title: "English",
                        type: "language",
                        code: "en",
                    },
                    {
                        title: "Tiếng việt",
                        type: "language",
                        code: "vi",
                    },
                    {
                        title: "English",
                        type: "language",
                        code: "en",
                    },
                    {
                        title: "Tiếng việt",
                        type: "language",
                        code: "vi",
                    },
                ],
            },
        },
        { title: "Đăng xuất", func: logoutUser, hr: true },
    ];

    const [history, setHistory] = useState([{ data: USER_MENU, title: "" }]);
    const current = history[history.length - 1];
    const navigate = useNavigate();

    const renderItems = () => {
        return current.data.map((item: any, index: any) => {
            const isParent = !!item.children;

            return (
                <button
                    className={`menu ${item.hr ? "border-t border-t-slate-500" : ""} `}
                    key={index}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else if (item.func) {
                            item.func();
                        } else if (item.to) {
                            navigate(`${item.to}`);
                        }
                    }}
                >
                    {item.title}
                </button>
            );
        });
    };

    return (
        <Tippy
            interactive
            hideOnClick
            trigger="click"
            offset={[0, 12]}
            delay={[0, 0]}
            placement="bottom-end"
            render={(attrs) => (
                <div className="tooltip flex flex-col p-1 min-w-[196px] min-h-max" {...attrs}>
                    {history.length > 1 && (
                        <div className="flex items-center px-4 gap-4 my-1">
                            <button
                                className="w-8 h-8"
                                onClick={() => setHistory((prev) => prev.slice(0, prev.length - 1))}
                            >
                                <MdArrowBackIos className="text-xl" />
                            </button>
                            <div className="text-base font-semibold">{current.title}</div>
                        </div>
                    )}
                    {renderItems()}
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
