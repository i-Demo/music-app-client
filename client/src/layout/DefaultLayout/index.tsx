import { useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import PlayingBar from "./PlayingBar";

function DefaultLayout({ children }: any) {
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        scrollRef.current?.scrollTo(0, 0);
    });
    return (
        <div className="w-screen h-screen max-h-screen overflow-hidden flex flex-col">
            <div className="flex flex-row flex-1 overflow-hidden">
                <Sidebar />
                <div className="flex-1 relative">
                    <div
                        className="dashboard bg-bgDashboard h-[calc(100vh-90px)] overflow-y-auto scroll-smooth overflow-x-hidden w-full scrollbar "
                        ref={scrollRef}
                    >
                        {children}
                        <div className="pt-20 pb-32 px-8 w-full">
                            <hr className="border-secondary" />
                        </div>
                    </div>
                </div>
            </div>
            <PlayingBar />
        </div>
    );
}

export default DefaultLayout;
