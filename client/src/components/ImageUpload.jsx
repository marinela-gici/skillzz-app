import React, { useState } from "react";
import { Modal, Tooltip, Upload } from "antd";
import {toast} from "react-toastify";

// import { DeleteOutlined, EditOutlined, EyeOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
// import useNotification from "../hooks/NotificationHook.jsx";

const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];

const handleCustomRequest = ({ onSuccess, onError, file }) => {
    setTimeout(() => {
        onSuccess("Ok");
    });
};

const ImageUpload = ({
                         label,
                         imgUrl,
                         title,
                         loading,
                         customRequest = handleCustomRequest,
                         handleChange,
                         onImageRemove,
                     }) => {

    const [previewOpen, setPreviewOpen] = useState(false);

    const beforeUpload = (file) => {
        console.log(file);
        const allowedSize = file.size / 1024 / 1024 < 0.5;
        const isAllowedFileType = allowedImageTypes.includes(file.type);
        if (!isAllowedFileType) {
            toast.error('Invalid format. You can only upload pdf files.', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: "colored",
            });
        } else if (!allowedSize) {
            toast.error('Image must be smaller than 500 Kb!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                theme: "colored",
            });
        }

        return isAllowedFileType && allowedSize;
    };

    const handlePreview = () => {
        if (imgUrl !== null) {
            setPreviewOpen(true);
        }
    };

    const uploadButton = (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <span className="mb-2">{loading ? <LoadingOutlined /> : <PlusOutlined />}</span>
            <span className="mt-2">{label || 'Upload'}</span>
        </div>
    );

    return (
        <>
            {!imgUrl ? (
                <Upload
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    showUploadList={false}
                    customRequest={customRequest}
                    accept={allowedImageTypes.join(", ")}
                >
                    <div
                        className="relative cursor-pointer rounded border-dashed border-neutral-200 bg-neutral-100"
                        style={{
                            width: 100,
                            height: 100,
                        }}
                    >
                        {uploadButton}
                    </div>
                </Upload>
            ) : (
                <div
                    style={{
                        width: 100,
                        height: 100,
                    }}
                    className="relative flex items-center justify-center rounded border-dashed border-neutral-200 bg-neutral-100"
                >
                    <img
                        src={imgUrl}
                        alt="logo"
                        className="rounded object-contain"
                        style={{
                            width: 95,
                            height: 95,
                        }}
                    />
                    <div
                        className="absolute flex h-full w-full items-center justify-center rounded text-white opacity-0 duration-150 ease-in hover:opacity-70"
                        style={{
                            background: "#000000",
                        }}
                    >
                        <Tooltip title={t("common.preview")}>
                            <EyeOutlined onClick={handlePreview} />
                        </Tooltip>
                        <Tooltip title={t("common.edit")}>
                            <Upload
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                                showUploadList={false}
                                customRequest={customRequest}
                                className="cursor-pointer text-white"
                                accept={allowedImageTypes.join(", ")}
                            >
                                <EditOutlined className="mx-3" />
                            </Upload>
                        </Tooltip>
                        <Tooltip title={t("common.remove")}>
                            <DeleteOutlined onClick={onImageRemove} />
                        </Tooltip>
                    </div>
                </div>
            )}
            <Modal
                footer={null}
                title={title}
                open={previewOpen}
                onCancel={() => setPreviewOpen(false)}
                bodyStyle={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 20,
                }}
            >
                <img src={imgUrl} alt="logo preview" className="w-3/4 rounded" />
            </Modal>
        </>
    );
};

export default ImageUpload;
