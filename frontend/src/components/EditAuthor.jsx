import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { Loading } from "../pages/Loading";

const fieldsData = [
  "Name",
  "Email",
  "Role",
  "Category",
  "Status", // Boolean
  "Employed", // Date
];

export const EditAuthor = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [author, setAuthor] = useState({});
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (author) {
      setFormData({
        name: author?.name || "",
        email: author?.email || "",
        role: author?.role || "",
        category: author?.category || "",
        status: author?.status,
        employed: formatDate(author?.employed) || "",
      });
    }
  }, [author]);

  const apiURL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/authors/${id}`;
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(apiURL);
        setAuthor(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, [apiURL]);

  const handleChange = (field) => (e) => {
    const value = field === "status" ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

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
      await axios.patch(apiURL, formData);
      toast.success("Updated!");
      setTimeout(() => {
        navigate("/authors");
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error("Update failed!");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center border-black">
      <div className="flex w-[23rem] items-center justify-between ">
        <div></div>
        <h1 className="text-2xl mb-2">Edit author</h1>

        <Link
          to={"/authors"}
          className="size-8 rounded-full bg-gray-200 transition hover:bg-gray-300 flex items-center justify-center"
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
                // value={formData[field]}
                checked={field === "status" && formData[field]}
                value={field !== "status" && formData[field]}
                onChange={handleChange(field)}
              />

              {errors[field] && (
                <p className="text-xs text-red-600">{errors[field]}</p>
              )}
            </div>
          );
        })}

        <button className="btn-normal mt-5">Save</button>
      </form>
    </div>
  );
};
