// Not Active

import { TLoading } from "@type/index";

type TCartLoadingProps = {
  loading: TLoading;
  error: string | null;
  children: React.ReactNode;
};

const CartLoading = ({ loading, children, error }: TCartLoadingProps) => {
  if (loading === "pending") {
    return (
      <div className="border-b rounded-md p-4 w-full mx-auto">
        <div className="animate-pulse flex gap-2 space-x-4">
          <div className="basis-1/5 rounded-sm bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-5 bg-slate-200 rounded col-span-1"></div>
              </div>
            </div>
          </div>
          <div className="basis-1/5">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  if (loading === "failed") {
    return <h2 className="">{error}</h2>;
  }
  return <>{children}</>;
};

export default CartLoading;
