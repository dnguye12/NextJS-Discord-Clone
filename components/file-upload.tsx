import { UploadDropzone } from "@/lib/uploadthing";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "serverImage" | "messageFile"
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
    const [uploadName, setUploadName] = useState("")
    const [fileType, setFileType] = useState("")

    useEffect(() => {
        setFileType(uploadName?.split(".").pop() || "")
    }, [uploadName])

    if (value && fileType !== "pdf") {
        return (
            <div className="relative h-20 w-20">
                <Image
                    fill
                    src={value}
                    alt="Upload"
                    className="rounded-full"
                />
                <button
                    onClick={() => onChange("")}
                    className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }

    if (value && fileType === "pdf") {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                <a
                    href={value}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                    {uploadName}
                </a>

                <button
                    onClick={() => {
                        onChange("")
                        setUploadName("")
                    }}
                    className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        );
    }

    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
                setUploadName(res?.[0]?.name);
            }}
            onUploadError={(error: Error) => {
                console.log(error)
            }}
        />
    );
}

export default FileUpload;