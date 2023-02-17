import { BsSearch } from "react-icons/bs"
import { ClassesForYou, Trainer } from "../components"
import { useAxios } from "../hooks";
import { useState } from "react";

export default function Search() {
  const classesUrl = `${import.meta.env.VITE_API_URL}/api/v1/classes`;
  const trainersUrl = `${import.meta.env.VITE_API_URL}/api/v1/trainers`;
  const { response: trainers, trainersLoading, trainersError } = useAxios({ method: "get", url: trainersUrl });
  const { response: classes, loading, error } = useAxios({ method: "get", url: classesUrl });

  const [searchValue, setSearchValue] = useState("");

  const filteredClasses = classes ? classes.filter(c => c.className.toLowerCase().includes(searchValue.toLowerCase())) : [];
  const filteredTrainers = trainers ? trainers.filter(t => t.trainerName.toLowerCase().includes(searchValue.toLowerCase())) : [];

  return (
    <main className="mx-5">
      <h1 className="text-[2.5rem] mb-3">Search</h1>
      <div className="relative">
        <BsSearch className="text-lg absolute top-[32%] left-3 text-[#9CA3AF]" />
        <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue} type="text" className="bg-[#F1F0F5] w-full h-12 pl-11 rounded-xl shadow-sm" placeholder="Search classes" />
      </div>
      {filteredClasses.length > 0 &&
        <>
          <h1 className="text-2xl self-center z-10 mt-3">Popular Classes</h1>
          <div className="mt-[40px]">
            <ClassesForYou classes={filteredClasses} loading={loading} error={error} />
          </div>
        </>
      }
      {filteredTrainers.length > 0 &&
        <>
          <h1 className="text-2xl self-center z-10">Popular Trainers</h1>
          {trainers && <section className="mt-[40px] flex flex-col gap-2">
            {filteredTrainers.map((trainer, index) => {
              return <Trainer key={index} trainerName={trainer.trainerName} trainerAsset={trainer.asset.url} />
            })}
          </section>}
        </>
      }
      {filteredTrainers.length == 0 && filteredClasses.length == 0 && <p className="self-end text-red-600 text-base py-1 mt-2 cursor-pointer">Your search did not give any results. Try to search for something else.</p>}
    </main>
  );
}