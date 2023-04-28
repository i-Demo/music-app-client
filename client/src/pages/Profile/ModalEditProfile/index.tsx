import { useState, useEffect, useContext } from "react";
import { MdOutlineEdit } from "react-icons/md";
import defaultAvatar from "@assets/images/defaultAvatar.png";
import { AuthContext } from "../../../contexts/authContext";
import AlertMessage, { TypeAlert } from "../../../components/AlertMessage";
import Loading from "../../../components/Loading";

function ModalEditProfile({ showUpdateModal, onClick }: any) {
    const {
        updateProfile,
        authState: { user },
    } = useContext(AuthContext);

    const [profileData, setProfileData] = useState({
        avatar: user.avatar || "",
        name: user.name,
        gender: user.gender || "",
        birthday: user.birthday || "",
    });
    const [base64, setBase64] = useState<any>("");
    const [alert, setAlert] = useState<TypeAlert | null>(null);
    const { avatar, name, gender, birthday } = profileData;
    const [isUpdating, setIsUpdating] = useState(false);

    const onChangeProfileData = (e: { target: { name: string; value: string } }) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value,
        });
    };

    // Ngan noi bot khi click modal
    const handlePropagation = (e: any) => {
        e.stopPropagation();
    };

    // Convert Image to Base64
    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    // Xu ly khi click chon anh moi
    const handlePreviewAvatar = (e: any) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        convertBase64(file).then((data) => {
            setBase64(data);
            setProfileData({
                ...profileData,
                avatar: file.preview,
            });
        });
    };

    // Xu ly khi nhan update profile
    const handleUpdateProfile = async (e: any) => {
        e.preventDefault();
        setIsUpdating(true);
        base64 ? (profileData.avatar = base64) : delete profileData.avatar;
        try {
            const dataUpdated = await updateProfile(profileData);
            setIsUpdating(false);
            profileData.avatar = user.avatar;
            if (dataUpdated.success) {
                showUpdateModal(false);
            } else {
                setAlert({ type: "danger", message: dataUpdated.message });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar);
        };
    }, [avatar]);
    return (
        <div className="profileModal fixed top-0 left-0 right-0 bottom-0 bg-bgModal z-[9999]" onClick={onClick}>
            <div
                className="profileModalContainer absolute top-0 bottom-0 left-0 right-0 w-[524px] h-fit m-auto bg-bg rounded-xl p-6"
                onClick={handlePropagation}
            >
                <h5 className="font-bold mb-4">Chi tiết hồ sơ</h5>
                <form className="flex gap-4" onSubmit={handleUpdateProfile}>
                    <div className="relative w-[180px] h-[180px] rounded-full overflow-hidden text-white font-semibold">
                        <img src={avatar || defaultAvatar} alt="Avatar" className="w-[180px] h-[180px]" />
                        <div className="absolute top-0 right-0 bottom-0 left-0 m-auto flex flex-col justify-center items-center gap-4 bg-bgModal opacity-100 hover:opacity-100">
                            {isUpdating ? (
                                <Loading />
                            ) : (
                                <>
                                    <div>
                                        <label htmlFor="avatarForm" className="hover:underline">
                                            Chọn ảnh
                                        </label>
                                        <input
                                            type="file"
                                            name="avatar"
                                            id="avatarForm"
                                            className="hidden"
                                            onChange={handlePreviewAvatar}
                                        />
                                    </div>
                                    <MdOutlineEdit className="text-5xl" />
                                    <button
                                        type="button"
                                        className="cursor-auto hover:underline"
                                        onClick={() => {
                                            setProfileData({ ...profileData, avatar: "" });
                                            setBase64("");
                                        }}
                                    >
                                        Xoá ảnh
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
                        <div className="relative group">
                            <label htmlFor="nameForm" className="labelModal group-focus-within:opacity-100">
                                Tên
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="nameForm"
                                className="inputModal"
                                value={name}
                                onChange={onChangeProfileData}
                            />
                        </div>
                        <div className="relative group">
                            <label htmlFor="genderForm" className="labelModal group-focus-within:opacity-100">
                                Giới tính
                            </label>
                            <select
                                id="genderForm"
                                className="inputModal"
                                name="gender"
                                value={gender}
                                onChange={onChangeProfileData}
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </select>
                        </div>
                        <div className="relative group">
                            <label htmlFor="dateForm" className="labelModal group-focus-within:opacity-100">
                                Ngày sinh
                            </label>
                            <input
                                type="date"
                                name="birthday"
                                id="dateForm"
                                className="inputModal"
                                value={birthday}
                                onChange={onChangeProfileData}
                            />
                        </div>
                        <div className="h-4">
                            <AlertMessage info={alert} />
                        </div>
                        <button type="submit" className="btn shadow-md shadow-brown bg-white hover:scale-105 mt-8">
                            Lưu hồ sơ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEditProfile;
