import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const fieldsData = [
  "Name",
  "Email",
  "Role",
  "Category",
  "Status", // Boolean
  "Employed", // Date
];

// Show IST based time
const getCurrentISTDate = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 330);
  return now.toISOString().split("T")[0];
};

export const AddAuthor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employed: getCurrentISTDate(),
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "status" ? e.target.checked : e.target.value,
    }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const apiURL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/authors`;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.role) newErrors.role = "Role is required";
    return newErrors;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post(apiURL, formData);
      toast.success("Author created!");
      setTimeout(() => {
        navigate("/authors");
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pb-20">
      <div className="flex w-[23rem] items-center justify-between ">
        <div></div>
        <h1 className="text-2xl mb-2">Add new author</h1>

        <Link
          className="size-8 rounded-full bg-gray-200 transition hover:bg-gray-300 flex items-center justify-center"
          to={"/authors"}
        >
          <X size={20} />
        </Link>
      </div>

      <form onSubmit={submitForm} className="w-[23rem] -mt-3.5">
        {fieldsData.map((item) => {
          const field = item.toLowerCase();
          return (
            <div
              key={item}
              className={`space-y-1 relative ${
                field === "status" && "flex justify-between items-center"
              }`}
            >
              <p className="mt-3.5 text-sm font-semibold text-black/80">
                {item}
              </p>
              <input
                type={
                  field === "status"
                    ? "checkbox"
                    : field === "employed"
                    ? "date"
                    : "text"
                }
                placeholder={`${item}...`}
                className={`w-full text-sm py-1.5 px-2 rounded placeholder-gray-500 outline-none ${
                  field === "status" && "w-fit absolute left-24 top-[0.84rem]"
                } ${errors[field] && "border border-red-500"}`}
                value={formData[field]}
                onChange={handleChange(field)}
              />

              {errors[field] && (
                <p className="text-xs text-red-600">{errors[field]}</p>
              )}
            </div>
          );
        })}

        <button className="btn-normal mt-5">Submit</button>
      </form>
    </div>
  );
};
