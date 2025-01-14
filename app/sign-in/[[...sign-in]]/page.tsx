import { SignIn } from "@clerk/nextjs";

function Page() {
    return (
        <div className="w-full h-full flex justify-center items-center"><SignIn /></div>
    )
}

export default Page