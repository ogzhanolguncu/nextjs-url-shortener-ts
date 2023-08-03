import { ShortLinkCacheValuesUI } from "@/actions/get-all-shortened-urls";
import { CopyToClipboard } from "./CopyToClipboard";

const formatDate = (timestamp: number) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-US", options).format(timestamp);
};

export function InfoCard({
  createadAt,
  expiredAt,
  formattedUrl,
}: ShortLinkCacheValuesUI) {
  return (
    <div className="md:text-md relative flex w-full items-center justify-between rounded-lg bg-[#cda6f3] p-3 text-slate-800">
      <div className="flex w-full flex-col gap-4">
        <p className="h-5 overflow-hidden text-ellipsis font-medium hover:text-clip">
          {formattedUrl}
        </p>
        <p className=" font-medium hover:text-clip">
          <span className="font-bold">Created:</span> {formatDate(createadAt)}
        </p>
        <p className="font-medium hover:text-clip">
          <span className="font-bold">Expires:</span> {formatDate(expiredAt)}
        </p>
        <div className="absolute bottom-2 right-3.5">
          <CopyToClipboard textToCopy={formattedUrl} />
        </div>
      </div>
    </div>
  );
}
