import { IPokemon } from "@/interfaces/pokemon";

import Link from "next/link";

const PokemonCard = ({ ...props }: IPokemon) => {
  return (
    <Link href={`/pokemon/${props.id}`}>
      <div
        className={`h-36 w-full rounded-lg p-2 ${props.cardColor} shadow-lg`}
      >
        <div className="bg-[url('/pokeball.svg')] bg-no-repeat bg-contain bg-center w-full h-full">
          <div className="flex justify-between items-center text-base text-white font-medium">
            <h3>{props.name}</h3>
            <h5>#{props.id}</h5>
          </div>
          <div className="flex justify-center items-center h-28 gap-1">
            <div className="w-1/2">
              <div className="flex flex-col gap-1">
                {props.types.map((val, i) => {
                  return (
                    <div
                      key={i}
                      className="p-1 bg-gray-900 bg-opacity-75 text-xs text-white flex justify-between items-center rounded-lg"
                    >
                      <span>{val.type.name}</span>
                      <div className={`p-1 ${val.type.name} rounded-full`}>
                        <img
                          src={`/icons/${val.type.name}.svg`}
                          alt={val.type.name}
                          loading="lazy"
                          className="h-4"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-1/2">
              <img
                className="h-full"
                src={props.image}
                alt={props.name}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
