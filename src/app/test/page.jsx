"use client";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../redux/slice/authSlice";

export default function TestPage() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleTest = () => {
    dispatch(
      setCredentials({
        user: { id: 1, name: "Test User", role: "student" },
        accessToken: "sampletoken123",
      })
    );
  };

  return (
    <div className="p-6">
      <button
        onClick={handleTest}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Set Fake Auth
      </button>

      <pre className="mt-4 bg-gray-100 p-3 rounded">
        {JSON.stringify(auth, null, 2)}
      </pre>
    </div>
  );
}
