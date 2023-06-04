import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../contexts/variables";

function Types() {
    const [types, setTypes] = useState<any>([]);

    // CALL API get all Type
    const getTypes = async () => {
        try {
            const response = await axios.get(`${apiUrl}/types`);
            setTypes(response.data.types);
        } catch (error: any) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    useEffect(() => {
        getTypes();
    }, []);

    return (
        <>
            <h2 className="text-2xl font-bold mb-10">Duyệt tìm tất cả</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-4">
                {types.map((type: any, index: number) => (
                    <Link
                        to={`/type/${type.type}`}
                        key={index}
                        className="group col-span-1 relative rounded-md overflow-hidden"
                    >
                        <img
                            src={type.image}
                            alt=""
                            className="opacity-70 group-hover:scale-110 w-full h-full transition-all duration-700"
                        />
                        <p className="uppercase text-lg font-bold whitespace-nowrap absolute bottom-4 left-1/2 translate-x-[-50%] z-[1]">
                            {type.name}
                        </p>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Types;
