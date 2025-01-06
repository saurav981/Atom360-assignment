import { X } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export const DeleteModal = ({ open, onClose, id }) => {
  const apiURL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/authors/${id}`;

  const handleDelete = async () => {
    try {
      await axios.delete(apiURL);
      toast.success("Author deleted!");
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div className="bg-slate-100 px-10 py-6 border-2 relative flex flex-col justify-center items-center gap-2 rounded-lg shadow-xl">
        <div className="absolute top-1 right-1 size-9 hover:bg-slate-200 rounded-full flex flex-col items-center justify-center">
          <X onClick={onClose} size={21} className="text-neutral-800" />
        </div>

        <h3 className="mt-1 font-bold text-neutral-900 text-2xl">
          Confirm Delete
        </h3>

        <p className="text-neutral-600 text-center">
          Are you sure you want to delete this author?
        </p>

        <div className="mt-3 flex gap-5 [&>button]:font-bold">
          <button
            onClick={handleDelete}
            className="btn-normal bg-red-600 hover:bg-red-500"
          >
            Delete
          </button>
          <button onClick={onClose} className="text-neutral-800 px-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
