import { useNavigate } from 'react-router-dom';
import background from '../assets/welcomePage/background.jpg';
import center from '../assets/welcomePage/center.jpg';

export default function WelcomePage() {
  const navigate = useNavigate()

  return (
    <main className="h-[100vh] relative overflow-hidden">
      <img className="w-[102%] h-[102%] object-cover object-[60%_0px]" src={background} alt="Fit women training with hand weights." />
      <img className="absolute bottom-[10%] min-w-[110%] max-h-[300px] object-cover right-[-5%] object-[0_5%]" src={center} alt="Fit women doing curls using hand weights while laying down." />
      <button onClick={() => navigate("/home")} className="absolute bg-white w-[65%] h-[68px] rounded-tl-xl rounded-bl-xl bottom-[4%] right-0 text-2xl pt-1 hover:translate-x-4 active:translate-x-4 transition-transform">Start Training</button>
      <div className="absolute top-[28%] text-white leading-none ml-12">
        <h1 className="text-[3.5rem] mb-4">Believe<br />Yourself</h1>
        <p className="text-xl before:content-[' '] before:px-7 before:bg-white before:h-[2px] before:inline-block before:mr-3 before:-translate-y-1 -translate-x-[50px]">Train like a pro</p>
      </div>
    </main>
  );
}