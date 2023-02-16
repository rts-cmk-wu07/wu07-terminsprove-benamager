import { useAxios } from "../hooks";

export default function Trainer({ trainerId, trainerName, trainerAsset }) {
  const url = trainerId ? `${import.meta.env.VITE_API_URL}/api/v1/trainers/${trainerId}` : null;
  const { response: trainerData, loading, error } = useAxios({ method: "get", url });


  return (
    <article className="flex transition-transform hover:opacity-50 active:opacity-50 cursor-pointer">
      <img className="w-[80px] h-[90px] object-cover rounded-lg" src={!trainerId ? trainerAsset : trainerData?.asset.url} alt={`Picture of trainer, ${!trainerId ? trainerData?.trainerName : trainerName}`} />
      <p className="mt-2 ml-5">{!trainerId ? trainerName : trainerData?.trainerName}</p>
    </article>
  );
}