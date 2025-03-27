import React, { useEffect, useState } from 'react';
import { logout, useAppDispatch, useAppSelector } from '../Redux/Slice/authSlice';
import { deleteUser, fetchUsers, updateUser } from '../Redux/api/users.api';
import LogoutButon from '../components/LogoutButon';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error, page, total_pages } = useAppSelector((state) => state.users);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);

  // fetch user details...............
  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const handlePageChange = (newPage: number) => {
    // Ensure newPage is within valid range
    if (newPage >= 1 && newPage <= total_pages) {
      dispatch(fetchUsers(newPage));
    }
  };

  // handle Logout...............
  const handleLogout = () => {
    dispatch(logout());
  };
  // handle Delete...............
  const handleDelete = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setDeletingUserId(userId);
      dispatch(deleteUser(userId)).finally(() => {
        setDeletingUserId(null);
      });
    }
  };

  // handle Edit...............
  const handleEditClick = (user: any) => {
    setEditingUser({ ...user });
  };

  // handle edit the fields...
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingUser((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  // handle Update the Details........
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser(editingUser));
    setEditingUser(null);
  };

  if (loading && !deletingUserId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="h-28 w-28 flex items-center justify-center">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <LogoutButon handleLogout={handleLogout} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {users.map((user) => (
            <div
              key={user.id}
              className={`bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 ${deletingUserId === user.id ? 'opacity-50 pointer-events-none' : ''
                }`}
            >
              {/* Track the user while deleting (setDeletingUserId) and compare (deletingUserId) to check if it is the same user. */}
              {deletingUserId === user.id ? (
                <div className="flex justify-center items-center h-full">
                  <span>Loading...</span>
                </div>
              ) : editingUser && editingUser.id === user.id ? (
                <form onSubmit={handleEditSubmit} className="p-6">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={editingUser.first_name}
                      onChange={handleEditChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={editingUser.last_name}
                      onChange={handleEditChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editingUser.email}
                      onChange={handleEditChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingUser(null)}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{`${user.first_name} ${user.last_name}`}</h2>
                    <p className="text-gray-600 mb-4">{user.email}</p>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-4">
          {/* Note: Create an array of page numbers from 1 to total_pages and map over them to render pagination buttons. */}
          {Array.from({ length: total_pages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-4 py-2 rounded transition duration-300
                 ${pageNum === page
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
            >
              {/* exmaple:- 1,2,.... page numbers */}
              {pageNum}
            </button>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;