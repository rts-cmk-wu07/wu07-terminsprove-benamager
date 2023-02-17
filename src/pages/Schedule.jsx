import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { useAxios } from "../hooks"
import { useNavigate } from "react-router-dom";

export default function SchedulePage() {
  const navigate = useNavigate()
  const { authState } = useContext(AuthContext)

  const { response, loading, error } = useAxios({
    method: "get",
    url: authState.isAuthenticated ? `${import.meta.env.VITE_API_URL}/api/v1/users/${authState.userId}` : null,
    headers: {
      "Authorization": `Bearer ${authState.token}`,
    }
  })

  const userClasses = response?.classes

  return (
    <main className="mx-5">
      <h1 className="text-[2.5rem] mb-10">My Schedule</h1>
      {!authState.isAuthenticated ?
        <p className="self-end text-red-600 text-base py-1 mt-2 cursor-pointer">This page is only for logged in users.</p> :
        <article className="flex flex-col gap-4">
          {userClasses && userClasses.map((classData) => {
            return (
              <section key={classData.id} onClick={() => navigate(`/class/${classData.id}`)} className="flex flex-row items-start border-b-2 border-dotted pb-3 cursor-pointer hover:opacity-50 active:hover-50">
                <div className="leading-none">
                  <h2 className="text-1xl mb-2">{classData.classDay}</h2>
                  <h2 className="text-3xl">{classData.className}</h2>
                </div>
                <span className="ml-auto">{classData.classTime}</span>
              </section>
            )
          })}
          {error && <p className="self-end text-red-600 text-base py-1 mt-2 cursor-pointer">{error?.message}</p>}
        </article>
      }
    </main>
  );
}