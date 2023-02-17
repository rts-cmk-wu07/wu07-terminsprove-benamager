import { useAxios } from "../hooks";
import { useParams } from "react-router-dom";
import { ShimmerLoading, Trainer } from "../components";
import AuthContext from "../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios"

const ratingArray = [true, true, true, true, false]

export default function ClassPage() {
  const { authState } = useContext(AuthContext)
  const { classId } = useParams()

  // get classdata
  const url = `${import.meta.env.VITE_API_URL}/api/v1/classes/${classId}`;
  const { response: classData, loading, error } = useAxios({ method: "get", url });
  const classUsers = classData?.users

  // can user join this class
  const [canJoin, setCanJoin] = useState(false);

  useEffect(() => {
    if (classUsers?.length > 0) {
      const foundUser = classUsers.find(classData => classData.Roster.userId == authState.userId)
      if (foundUser) {
        setCanJoin(false)
      } else {
        setCanJoin(true)
      }
    } else {
      setCanJoin(true)
    }
  }, [classData])


  function handleJoinLeave() {
    if (canJoin) {
      // user joining class
      console.log("now leaving")
      const options = {
        method: "POST",
        url: `${import.meta.env.VITE_API_URL}/api/v1/users/${authState.userId}/classes/${classData.id}`,
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      };
      axios(options)
        .then((res) => {
          console.log("Class joined successfully");
          // Update state or trigger a refresh
        })
        .catch((err) => {
          console.error(err);
        });
      setCanJoin(false)
    } else {
      console.log("now leaving")
      const options = {
        method: "DELETE",
        url: `${import.meta.env.VITE_API_URL}/api/v1/users/${authState.userId}/classes/${classData.id}`,
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      };
      axios(options)
        .then((res) => {
          console.log("Class left successfully");
          // Update state or trigger a refresh
        })
        .catch((err) => {
          console.error(err);
        });
      setCanJoin(true)
    }
  }

  return classData && (
    <article className="-mt-[90px]">
      {loading && !error ?
        <ShimmerLoading containerClass="h-[450px]" /> :
        <div className="h-[450px] grid">
          <img src={classData.asset.url} alt="" className="h-full object-cover col-[1_/_span_1] row-[1_/_span_1]" />
          <div className="grid grid-cols-[2fr_1fr] items-end col-[1_/_span_1] row-[1_/_span_1] pb-5">
            <div className="ml-5">
              <h1 className="text-[2.5rem] text-white left-4 leading-tight font-medium drop-shadow-xl">{classData.className}</h1>
              <ul className="flex gap-[1px] mt-2 bg-grey max-w-fit">
                {ratingArray.map((rating, index) => {
                  if (rating === true) {
                    return <li key={index} className="w-4 h-4 bg-primary"></li>
                  } else {
                    return <li key={index} className="w-4 h-4 bg-grey"></li>
                  }
                })}
              </ul>
            </div>
            {authState.isAuthenticated && <button onClick={handleJoinLeave} className="bg-white h-[68px] rounded-tl-xl rounded-bl-xl text-2xl pt-1 hover:translate-x-4 active:translate-x-4 transition-transform">{canJoin ? "Sign up" : "Leave"}</button>}
          </div>
        </div>}
      {classData &&
        <div className="px-5 mt-2">
          <div className="flex flex-row items-end">
            <div className="leading-none">
              <h2 className="text-2xl">Schedule</h2>
              <span>{classData.classDay}</span>
            </div>
            <span className="ml-auto">{classData.classTime}</span>
          </div>
          <p className="mt-7">{classData.classDescription}</p>
          <section className="mt-4">
            <h3 className="text-2xl mb-1">Trainer</h3>
            <Trainer trainerId={classData.trainerId} />
          </section>
        </div>
      }
    </article>
  );
}