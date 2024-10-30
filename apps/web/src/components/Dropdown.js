const DESTINATIONS = ['Flexible', 'Europa', 'Argentina', 'Estados Unidos', 'Brasil', 'America Central']

export const Dropdown = ({ isOpen, toggleIsOpen, destination, setDestination }) => {
  return (
    <>
      <div
        className="relative flex-1 rounded-full px-4 h-full z-10 hover:bg-slate-200/50"
      >
        <div
          onClick={toggleIsOpen}
          className=" flex flex-col justify-center items-start h-full hover:cursor-pointer"
        >
          <h3 className="text-slate-800 font-semibold">Donde</h3>
          <div className="text-slate-500">{destination ?? 'Explora destinos'}</div>
        </div>

        <ul
          className={`absolute w-[300px] p-4 border border-slate-200 shadow-2xl grid-cols-3 bottom-[-134px] left-0 bg-white rounded-2xl ${isOpen ? 'grid' : 'hidden'}`}
        >
          {
            DESTINATIONS?.map((destination, index) => (
              <li
                className="hover:bg-slate-200/50 hover:cursor-pointer p-2 rounded-2xl w-20 h-14 content-center"
                key={index}
                onClick={() => setDestination(destination)}
              >
                <a>{destination}</a>
              </li>
            ))
          }
        </ul>

      </div>

      {isOpen && (
        <div
          className="fixed inset-0 h-screen w-full"
          onClick={toggleIsOpen}
        ></div>
      )}
    </>
  )
}