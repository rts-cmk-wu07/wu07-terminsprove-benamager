import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShimmerLoading } from "../components";
import { getRandomInt } from "../functions";

export default function RandomClass({ classes, loading, error }) {
  const navigate = useNavigate()
  const [classData, setClassData] = useState({})
  const [classImageSrc, setClassImageSrc] = useState("")

  useEffect(() => {
    if (classes) {
      const randomClassIndex = getRandomInt(0, classes.length - 1)
      const selectedClass = classes[randomClassIndex]

      setClassImageSrc(selectedClass.asset.url)
      setClassData(selectedClass)
    }
  }, [classes])

  return (
    <article className="h-[400px] rounded-2xl overflow-hidden shadow-sm transition-transform hover:scale-95 active:scale-95">
      {loading && !error ?
        <ShimmerLoading containerClass="h-full" /> :
        <div onClick={() => navigate(`/class/${classData.id}`)} className="h-full relative cursor-pointer">
          <img src={classImageSrc} alt="" className="absolute h-full object-cover" />
          <h3 className="absolute bottom-11 text-[2.5rem] text-white left-4 right-[20%] leading-tight font-medium drop-shadow-xl">{classData.className}</h3>
        </div>}
    </article>
  );
}