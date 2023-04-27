import { NavLink } from "react-router-dom";

interface NavItemType {
    to: string;
    icon: JSX.Element;
    title: string;
}
function NavItem({ to, icon, title }: NavItemType) {
    return (
        <NavLink
            to={to}
            className={({ isActive }: any) =>
                isActive ? "navLink text-white bg-bg border-l-4 border-s-brown" : "navLink"
            }
        >
            {icon} <span className="text-sm font-bold">{title}</span>
        </NavLink>
    );
}

export default NavItem;
