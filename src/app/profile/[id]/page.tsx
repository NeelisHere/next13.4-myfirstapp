export default function UserProfile({ params }: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen border-solid border-2 border-indigo-600 p-4">
            <h1 className="text-2xl font-bold p-2">PROFILE</h1>
            <hr />
            <div className="flex flex-col border-solid border-2 border-indigo-600 p-4">
                <p>Profile page - {params.id}</p>
            </div>
            
        </div>
    )
}