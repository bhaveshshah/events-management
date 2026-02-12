import { useContext } from "react";

// context
import { UserContext } from "../context/UserContext";

const ProfilePage = () => {
    const { user, setUser } = useContext(UserContext);
  
    return (
      <div>
        <h1>Profile page</h1>
  
        {!user && <p>❤️ Please login</p>}
  
        {user &&
          <div>
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        }
  
      </div>
    )
  }

  export default ProfilePage;