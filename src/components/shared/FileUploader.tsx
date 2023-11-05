import React, { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'
import { type } from 'os';

type FileUploaderProps = {
    filedChange: (FILES: File[]) => void;
    mediaUrl: string;
}

function FileUploader({ filedChange, mediaUrl }: FileUploaderProps) {

    const [file, setFile] = useState<File[]>([]);
    const [fileURL, setFileURL] = useState('')

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles);
        filedChange(acceptedFiles);
        setFileURL(URL.createObjectURL(acceptedFiles[0]))

    }, [file])


    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg']
        }
    })


    return (
        <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer ' >
            <input {...getInputProps()} className='cursor-pointer ' />
            {
                fileURL ? (
                    <>
                        <div className="flex flex-1 justify-center w-full p-5 lg:p-10 ">
                            <img src={fileURL} alt="image" className='file_uploader-img ' />
                        </div>
                        <p className='file_uploader-label' >Click or drag phot to replace.</p>
                    </>
                ) : (
                    <div className="file-box file_uploader-box">
                        <img src="/assets/icons/file-upload.svg" alt="upload file"
                            height={77}
                            width={96}
                        />
                        <h3 className='base-medium text-light-2 mb-2 mt-6' >Drag photo here</h3>
                        <p className='text-light-4 small-regular mb-6'> SVG, PNG, JPEG </p>

                        <Button className='shad-button_dark_4' >
                            Select From computer
                        </Button>

                    </div>
                )

            }
        </div >
    )
}
export default FileUploader