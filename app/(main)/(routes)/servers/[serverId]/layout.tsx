import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

interface ServerIdLayoutProps {
    children: React.ReactNode;
    params: Promise<{ serverId: string }>
}

const ServerIdLayout = async ({ children, params }: ServerIdLayoutProps) => {
    const profile = await currentProfile()
    const { redirectToSignIn } = await auth()
    const { serverId } = await params

    if (!profile) {
        return redirectToSignIn()
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (!server) {
        return redirect("/")
    }

    return (
        <div className="h-full">
            <div className="hidden md:flex fixed h-full w-60 z-20 flex-col inset-y-0">
                <ServerSidebar
                    serverId={serverId}
                />
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
        </div>
    )
}

export default ServerIdLayout