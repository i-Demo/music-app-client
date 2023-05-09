import { useEffect } from "react";
import { average } from "color.js";
import { Link } from "react-router-dom";

interface PageHeader {
    image: string;
    title: string;
    name: string;
    desc: string;
    avatar: string;
    user: string;
    numberSongs: number;
}
function PageHeader({ image, title, name, desc, avatar, user, numberSongs }: PageHeader) {
    useEffect(() => {
        const profileHeader = document.querySelector(".profileHeader") as HTMLElement;
        average(`${image}`, { format: "hex" }).then((color) => {
            if (profileHeader) {
                profileHeader.style.backgroundColor = `${color}`;
                profileHeader.style.boxShadow = `0 50px 200px ${color}`;
            }
        });
    }, []);
    return (
        <div>
            <div className="profileHeader h-[340px] px-4 pt-[124px] lg:px-8 lg:pt-[84px] pb-6 flex gap-8 text-xs md:text-sm">
                <div className="lg:w-[232px] lg:h-[232px] w-48 h-48 min-w-[192px] overflow-hidden shadow-[0_20px_50px_rgba(0,_0,_0,_0.7)]">
                    <img src={image} alt="Image" className=" object-cover lg:w-[232px] lg:h-[232px] w-48 h-48" />
                </div>
                <div className="flex flex-col flex-wrap justify-end gap-4 lg:gap-4">
                    <span className="font-bold">{title}</span>
                    <p className="text-[2rem] md:text-[3rem] lg:text-7xl font-bold min-w-max">{name}</p>
                    <span className="font-bold">{desc}</span>
                    <p className="flex gap-1">
                        <img src={avatar} alt="Avatar" className="w-6 h-6 rounded-full object-cover" />
                        <Link to="/profile" className="font-semibold hover:underline">
                            {user}
                        </Link>
                        {` • ${numberSongs} bài hát`}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PageHeader;
