import { BsSearch } from "react-icons/bs"
import { ClassesForYou, Trainer } from "../components"
import { useAxios } from "../hooks";

export default function Search() {
  const url = `${import.meta.env.VITE_API_URL}/api/v1/classes`;
  const trainersUrl = `${import.meta.env.VITE_API_URL}/api/v1/trainers`;
  const { response: trainers, trainersLoading, trainersError } = useAxios({ method: "get", url: trainersUrl });
  const { response: classes, loading, error } = useAxios({ method: "get", url });

  return (
    <main className="mx-5">
      <h1 className="text-[2.5rem] mb-3">Search</h1>
      <div className="relative">
        <BsSearch className="text-lg absolute top-[32%] left-3 text-[#9CA3AF]" />
        <input type="text" className="bg-[#F1F0F5] w-full h-12 pl-11 rounded-xl shadow-sm" placeholder="Search classes" />
      </div>
      <h1 className="text-2xl self-center z-10 mt-3">Popular Classes</h1>
      <div className="mt-[40px]">
        <ClassesForYou classes={classes} loading={loading} error={error} />
      </div>
      <h1 className="text-2xl self-center z-10">Popular Trainers</h1>
      {trainers && <section className="mt-[40px] flex flex-col gap-2">
        {trainers.map((trainer, index) => {
          return <Trainer key={index} trainerName={trainer.trainerName} trainerAsset={trainer.asset.url} />
        })}
      </section>}
    </main>
  );
}