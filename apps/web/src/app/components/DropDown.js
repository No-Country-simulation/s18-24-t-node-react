export const DropDown = ({ title, children }) => {
  return (
    <div
      tabIndex={0} role="button"
      className="flex flex-col justify-center items-center dropdown hover:bg-slate-200/50 rounded-full px-4 h-full"
    >
      <div className="text-start">
        <h3 className="text-slate-800 font-semibold">Donde</h3>
        <div className="text-slate-500">{title}</div>
      </div>

      {children}
    </div>
  )
}
