import { useAxios } from "../hooks";
import { RandomClass, ClassesForYou } from "../components"

export default function HomePage() {
  const url = `${import.meta.env.VITE_API_URL}/api/v1/classes`;
  const { response: classes, loading, error } = useAxios({ method: "get", url });

  return (
    <main className="h-full mx-4 flex flex-col">
      <h1 className="text-2xl self-center z-10 -mt-[60px]">Popular Classes</h1>
      <div className="mt-[40px]">
        <RandomClass classes={classes} loading={loading} error={error} />
        <ClassesForYou classes={classes} loading={loading} error={error} />
      </div>
    </main>
  );
}