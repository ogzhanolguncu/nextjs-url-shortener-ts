import { getFullUrl } from "@/actions/get-shorten-url";

type Props = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string };
};
export const ShortenedUrl = async (props: Props) => {
  await getFullUrl(props.params.pathKey);
  return null;
};

export default ShortenedUrl;
