import { getAllShortenedUrls } from "@/actions/get-all-shortened-urls";
import { shortenUrl } from "@/actions/shorten-url";
import { InfoCardContainer } from "@/components/InfoCardContainer";
import { SubmitButton } from "@/components/SubmitButton";
import Head from "next/head";

export default async function Home() {
  const listOfUrls = await getAllShortenedUrls();

  return (
    <main className="mx-auto flex h-screen max-w-[1000px] flex-col items-center justify-center px-4 md:flex-row">
      <Head>
        <title>My page title</title>
      </Head>
      <div className="text-center md:w-2/3 md:text-left">
        <div className="relative">
          <h1 className="text-[2.5rem] font-bold md:text-[50px]">
            Time to <span className="text-[#cda6f3]">Shorten!</span>
          </h1>
        </div>
        <div className="relative">
          <div className="flex flex-col">
            <p className="mb-5 w-full max-w-[600px] text-white/60 md:mb-9 md:text-lg">
              A fast and simple URL shortener
            </p>
            <div className="mx-auto h-12  w-[300px] max-w-full  md:mx-0 md:w-[370px]">
              <div className="relative flex h-[50px] w-full  justify-start rounded-[999px]  bg-white/10 px-5">
                <form action={shortenUrl}>
                  <input
                    className=" rounded-l-xl bg-transparent py-3 text-[16px] font-thin tracking-wider text-white outline-none placeholder:text-neutral-300"
                    type="text"
                    placeholder="Enter your URL"
                    name="long-url"
                    data-testid="long-url"
                  />
                  <SubmitButton />
                </form>
              </div>
            </div>
            {listOfUrls?.length ? (
              <InfoCardContainer listOfUrls={listOfUrls} />
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
