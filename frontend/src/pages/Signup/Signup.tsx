import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (count === 0) {
      navigate("/auth/login")
      return;
    }
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [count, navigate]);
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2>
        Signup Form - NA
      </h2>
      <p className="text-xl text-red-400">Redirecting to login page in {count}...</p>
    </div>
  )
}

export default Signup