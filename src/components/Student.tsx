import { useSearchParams } from "react-router-dom";

const Student = () => {
  const [searchParams] = useSearchParams();
  const studentName = searchParams.get("name") || "Unknown";

  return (
    <div>
      <h2>Student Page</h2>
      <p>Student Name: {studentName}</p>
    </div>
  );
};

export default Student;
