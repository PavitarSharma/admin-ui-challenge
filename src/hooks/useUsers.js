import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/api";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchedUsers = async () => {
      try {
        const response = await axios.get(BASE_URL);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users: ", error);
        setError(error.message);
        return [];
      } finally {
        setIsLoading(false);
      }
    };

    fetchedUsers();
  }, []);

  return {
    users,
    isLoading,
    error,
  };
};

export default useUsers;
