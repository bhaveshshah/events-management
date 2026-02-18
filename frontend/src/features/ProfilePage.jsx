import { useContext, useState, useEffect } from "react";

// context
import { UserContext } from "../context/UserContext";

// api
import { fetchUsers } from "../services/UserService";

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      if (!user) {
        return;
      }
      try {
        const fetchedUsers = await fetchUsers();
        console.log("Fetched users:", fetchedUsers);
        setUsers(fetchedUsers || []);
      } catch (err) {
        console.error("Error loading users:", err);
        setError(err.message);
      }
    };

    loadUsers();
  }, []);

  return (
    <div>
      <h1>Profile page</h1>

      {!user && <p>❤️ Please login</p>}

      {user && (
        <div>
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <h4 className="pt-10">All Users ({users.length}):</h4>
      {user &&
        users.map((u) => (
          <div key={u.id}>
            <p>{u.name || u.email || "No name"}</p>
          </div>
        ))}
    </div>
  );
};

export default ProfilePage;
