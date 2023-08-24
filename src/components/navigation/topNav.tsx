import { 
 IconContext
} from "react-icons";
import { 
 FaArrowLeft 
} from "react-icons/fa";
import { 
 AiFillHeart 
} from "react-icons/ai";

type Porps = {
 onclick: () => void
}

const TopBar = ({onclick}: Pros) => {
 return (
  <div className="w-full py-4 flex justify-between items-center">
   <button 
    onClick={onclick}
    className="text-white">
    <IconContext.Provider
     value={{
      size: "26px",
     }}>
     <FaArrowLeft />
    </IconContext.Provider>
   </button>
   <button 
    type="button" 
    className="text-white">
    <IconContext.Provider
     value={{
      size: "26px",
     }}>
     <AiFillHeart />
    </IconContext.Provider>
   </button>
  </div>
 );
};

export default TopBar