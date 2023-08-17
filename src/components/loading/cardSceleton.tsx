const CardSceleton = () => {
 return (
  <div className="bg-slate-700 bg-opacity-60 shadow rounded-lg p-2 w-full">
   <div className="animate-pulse">
    <div className="flex justify-between">
     <div className="h-4 w-12 bg-slate-700 rounded-md"></div>
     <div className="h-4 w-8 bg-slate-700 rounded-md"></div>
    </div>
    <div className="h-28 flex justify-between items-center">
     <div className="w-12 h-4 bg-slate-700 rounded-md"></div>
     <div className="rounded-full bg-slate-700 h-12 w-12"></div>
    </div>
   </div>
  </div>
 )
}

export default CardSceleton