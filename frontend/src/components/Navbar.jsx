export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between pl-4 pr-10">
      <div>
        <div className="flex flex-wrap gap-2 items-center text-[.95rem]">
          <span className="text-gray-400">Pages</span>
          <span className="text-black/80">/ Tables</span>
        </div>
        <span className="font-bold text-[1.06rem] text-black/80">Tables</span>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Type here..."
          className="text-[.9rem] w-56 outline-none px-5 p-2 rounded-lg border-[1.5px] focus:border-gray-400 placeholder-gray-500"
        />

        <button className="text-xs font-bold text-orange-500 p-2 border px-8 border-orange-500 rounded-lg">
          Online Builder
        </button>

        <button className="text-[.75rem] font-bold text-gray-500/90">
          Sign In
        </button>
      </div>
    </nav>
  );
};
