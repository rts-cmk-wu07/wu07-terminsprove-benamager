import './shimmerLoading.css';

export default function ShimmerLoading({ containerClass }) {
  return (
    <div className={`bg-grey ${containerClass}`}>
      <div className="w-full h-full shimmer-loading bg-center bg-cover bg-no-repeat" style={{ background: "linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,0.6) 20%,rgba(255,255,255,0) 40%)" }} />
    </div>
  );
};