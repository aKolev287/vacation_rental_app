import {
  FaBuilding,
  FaHouseChimney,
  FaIgloo,
  FaLandmarkFlag,
  FaMountain,
  FaSnowflake,
  FaTree,
  FaSun,
} from "react-icons/fa6";
import MiniBarLinks from "./MiniBarLinks";

const MiniBar = () => {
  return (
    <div className="my-2 left-0 h-[4rem] text-center items-center p-2">
      <div className="flex justify-center ">
        <MiniBarLinks
          tag="house"
          icon={<FaHouseChimney className="" size="23" />}
          text="House"
        />
        <MiniBarLinks
          tag="apartment"
          icon={<FaBuilding className="" size="23" />}
          text="Apartmen"
        />
        <MiniBarLinks
          tag="unusual"
          icon={<FaIgloo className="" size="23" />}
          text="Unusual"
        />
        <MiniBarLinks
          tag="iconic_city"
          icon={<FaLandmarkFlag className="" size="23" />}
          text="Iconic cities"
        />
        <MiniBarLinks
          tag="mountain"
          icon={<FaMountain className="" size="23" />}
          text="Mountain"
        />
        <MiniBarLinks
          tag="forest"
          icon={<FaTree className="" size="23" />}
          text="Forest"
        />
        <MiniBarLinks
          tag="desert"
          icon={<FaSun className="" size="23" />}
          text="Desert"
        />
        <MiniBarLinks
          tag="arctic"
          icon={<FaSnowflake className="" size="23" />}
          text="Arctic"
        />
      </div>
    </div>
  );
};

export default MiniBar;
