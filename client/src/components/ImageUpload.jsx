import React, {useState} from "react";
import {Modal, Tooltip, Upload} from "antd";
import {toast} from "react-toastify";
import loadingSpinner from '../assets/loading-spinner.svg';
import plusIcon from '../assets/plus-icon.svg';
import preview from '../assets/preview.svg';
import close from '../assets/close.svg';

const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];

const handleCustomRequest = ({onSuccess}) => {
    setTimeout(() => {
        onSuccess("Ok");
    });
};

const ImageUpload = ({
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
            toast.error('Invalid format. You can only upload jpg and png files.', {
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
            <span className="mb-2"><img src={loading ? loadingSpinner : plusIcon} alt="" /></span>
            <span className="mt-2">Upload</span>
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
                        <Tooltip title='Preview'>
                            <img className='cursor-pointer mx-2 w-[25px] h-[25px]' src={preview} alt="" onClick={handlePreview} />
                        </Tooltip>
                        <Tooltip title='Remove'>
                            <img className='cursor-pointer mx-2 w-[25px] h-[25px]' src={close} alt="" onClick={onImageRemove} />
                        </Tooltip>
                    </div>
                </div>
            )}
            <Modal
                footer={null}
                title={title}
                open={previewOpen}
                onCancel={() => setPreviewOpen(false)}>
                <img src={imgUrl} alt="logo preview" className="w-3/4 rounded" />
            </Modal>
        </>
    );
};

export default ImageUpload;
