import { useNavigate } from "react-router-dom";

const ratingArray = [true, true, true, true, false]

export default function ClassesForYou({ classes, loading, error }) {
  const navigate = useNavigate()

  return (
    <section className="w-[105%]">
      <ul className="flex gap-3 overflow-y-auto pb-3 pr-3">
        {classes && classes.map((classItem) => {
          return (
            <li onClick={() => navigate(`/class/${classItem.id}`)} className="min-w-[125px] max-w-[125px] overflow-hidden cursor-pointer" key={classItem.id}>
              <article className="h-full">
                <img className="h-[150px] w-full object-cover rounded-xl shadow-sm transition-transform hover:scale-95 active:scale-95" src={classItem.asset.url} alt="" />
                <h4 className="mt-2 truncate">{classItem.className}</h4>
                <ul className="flex gap-[1px] mt-2">
                  {ratingArray.map((rating, index) => {
                    if (rating === true) {
                      return <li key={index} className="w-4 h-4 bg-primary"></li>
                    } else {
                      return <li key={index} className="w-4 h-4 bg-grey"></li>
                    }
                  })}
                </ul>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}