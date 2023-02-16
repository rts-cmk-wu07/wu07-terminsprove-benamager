import { useAxios } from "../hooks";

export default function Trainer({ trainerId }) {
  const url = trainerId ? `${import.meta.env.VITE_API_URL}/api/v1/trainers/${trainerId}` : null;
  const { response: trainerData, loading, error } = useAxios({ method: "get", url });

  console.log(trainerData)

  return trainerData && (
    <article className="flex">
      <img className="w-[80px] h-[90px] object-cover rounded-lg" src={trainerData.asset.url} alt={`Picture of trainer, ${trainerData.trainerName}`} />
      <p className="mt-2 ml-5">{trainerData.trainerName}</p>
    </article>
  );
}