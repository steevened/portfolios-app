import Loader from "@/components/atoms/loader";

export default function Loading() {
  return (
    <div className="h-full flex items-center justify-center my-10">
      <Loader className="w-20 h-20" />
    </div>
  );
}
