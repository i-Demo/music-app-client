import { NavLink } from "react-router-dom";

interface NavItemType {
    to: string;
    icon: JSX.Element;
    title: string;
    content?: JSX.Element;
}
function NavItem({ to, icon, title, content }: NavItemType) {
    return (
        <NavLink
            to={to}
            className={({ isActive }: any) =>
                isActive
                    ? "flex justify-between text-white bg-bg border-l-4 border-s-brown min-w-[192px]"
                    : "flex justify-between text-textGray min-w-[192px]"
            }
        >
            <div className="flex items-center gap-4 h-10 px-6 hover:text-white">
                <span>{icon}</span>
                <span className="text-xs md:text-sm font-bold">{title}</span>
            </div>
            {content && <span className="flex items-center mr-4">{content}</span>}
        </NavLink>
    );
}

export default NavItem;
