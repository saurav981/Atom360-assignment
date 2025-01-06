import { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

import { Link } from "react-router-dom";
import { DeleteModal } from "../components/Modals/DeleteModal";
import { EllipsisVertical } from "lucide-react";
import { Loading } from "./Loading";

function formatDate(isoDate) {
  const date = new Date(isoDate); // Parse the ISO date string
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const tableHeader = ["Author", "Function", "Status", "Employed", ""];

export const AuthorPage = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activePopover, setActivePopover] = useState(null);
  const [id, setId] = useState("");

  const apiURL = `${import.meta.env.VITE_BACKEND_URL}/api/v1/authors`;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(apiURL);
        setAuthors(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, [apiURL]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-white shadow rounded-xl mt-2 pb-2 border-black">
      <DeleteModal open={open} onClose={() => setOpen(false)} id={id} />

      <div className="p-6 pb-0 flex items-center justify-between">
        <p className=" font-semibold text-[1.05rem]">Authors table</p>

        <Link to={"/authors/add"}>
          <button className="btn-normal">Create</button>
        </Link>
      </div>

      <table className="w-full overflow-x-auto">
        <thead>
          <tr>
            {tableHeader.map((item) => (
              <th
                key={item}
                className="text-left text-[.68rem] font-bold uppercase text-gray-400"
              >
                <div className="mt-5 mb-3 px-6">{item}</div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {authors?.map((item, i) => (
            <tr
              key={i}
              className="border-t border-gray-200 [&>td]:px-6 [&>td]:py-2"
            >
              <td>
                <div className="flex items-center gap-4 -ml-2">
                  <div className="size-9 rounded-xl overflow-auto">
                    <img src={item.image} alt="" className="" />
                  </div>

                  <div className="flex flex-col">
                    <p className="font-semibold text-black/80">{item.name}</p>
                    <p className="text-[.8rem] text-gray-500 -mt-0.5">
                      {item.email}
                    </p>
                  </div>
                </div>
              </td>

              <td>
                <div className="flex flex-col text-gray-500 [&>p]:text-[.8rem]">
                  <p className="font-semibold">{item.role}</p>
                  <p className="-mt-1">{item.category}</p>
                </div>
              </td>

              <td>
                {item.status ? (
                  <div className="status-btn from-[#98ec2d] bg-gradient-to-br to-[#22c55e]">
                    Online
                  </div>
                ) : (
                  <div className="status-btn from-[#e3e3e7] bg-gradient-to-br to-[#71717a]">
                    Offline
                  </div>
                )}
              </td>

              <td className="text-[.8rem] font-semibold text-gray-600/90">
                {formatDate(item.employed)}
              </td>

              <td
                className="text-[.8rem] cursor-pointer font-semibold text-gray-600/90 relative"
                onClick={() => setActivePopover(activePopover === i ? null : i)}
              >
                <EllipsisVertical size={18} />
                {activePopover === i && (
                  <div className="absolute right-[4.3rem] top-8 bg-white border-2 border-black/30 rounded z-10 shadow p-1">
                    <Link to={`/authors/edit/${item?._id}`}>
                      <p className="popover-style">Edit</p>
                    </Link>

                    <p
                      onClick={() => {
                        setOpen(true);
                        setId(item?._id);
                      }}
                      className="popover-style text-red-500"
                    >
                      Delete
                    </p>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
