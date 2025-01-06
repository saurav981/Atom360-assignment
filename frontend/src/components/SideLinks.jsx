import { Link } from "react-router-dom";

function makeSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export const SideLinks = ({ items, selected, setSelected }) => {
  const handleClick = (title) => {
    const newPath = `/${makeSlug(title)}`;
    setSelected(newPath);
  };

  return (
    <ul className=" mt-4">
      {items.map((item, i) => {
        const itemPath = `/${makeSlug(item.title)}`;

        return (
          <Link to={makeSlug(item.title)} key={i}>
            <li
              className={`flex items-center gap-3 p-2 cursor-pointer ${
                selected === itemPath && "bg-white shadow rounded-xl"
              } `}
              onClick={() => handleClick(item.title)}
            >
              <div
                className={`shadow-md rounded-lg size-[2.1rem] flex items-center justify-center ${
                  selected === itemPath ? "bg-orange-500" : "bg-white"
                }`}
              >
                <item.icon
                  size={14}
                  className={`${selected === itemPath && "text-white"}`}
                />
              </div>
              <span
                className={`text-[0.8rem] ${
                  selected === itemPath && "font-semibold"
                }`}
              >
                {item.title}
              </span>
            </li>
          </Link>
        );
      })}
    </ul>
  );
};
