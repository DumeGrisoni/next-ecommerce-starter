import { getUsers } from '@/actions/UsersCRUD';
import React from 'react';

const AdminListUsers = async () => {
  const usersDatas = await getUsers();
  const users = usersDatas.users;

  return (
    <div>
      <div className="flex flex-col gap-6 py-2 px-4 items-center justify-between">
        {users.map((user) => {
          return (
            <div key={user.$id} className="flex gap-6 items-center">
              <p>{user.email}</p>
              <p>{user.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminListUsers;
