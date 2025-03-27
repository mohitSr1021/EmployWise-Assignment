
interface LogoutButtonProps {
    handleLogout: () => void;
}

const LogoutButon = ({ handleLogout }: LogoutButtonProps) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
                Logout
            </button>
        </div>
    )
}

export default LogoutButon