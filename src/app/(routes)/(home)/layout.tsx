import Header from "@/components/header";
import { Link, LinkSkeleton } from "@/components/ui/link";
import { arrayRange } from "@/lib/utils";
import { createClient } from "@/supabase/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/error");
  }
  const { data, error } = await supabase
    .from("profile")
    .select()
    .eq("userId", user.id)
    .single();

  return (
    <div className="bg-grey-light">
      <Header userId={user.id} />
      <main className="min-h-screen p-4 md:p-6 md:pt-0 md:flex gap-6">
        <div className="w-[560px] bg-white hidden md:sticky md:top-0 h-fit py-10 md:flex items-center justify-center rounded-xl shrink-0">
          <div className="relative mx-auto border-[rgb(31,_41,_55)] bg-[rgb(31,_41,_55)] border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="w-[148px] h-[18px] bg-[rgb(31,_41,_55)] top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="h-[46px] w-[3px] bg-[rgb(31,_41,_55)] absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-[rgb(31,_41,_55)] absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-[rgb(31,_41,_55)] absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white">
              <div className="flex flex-col items-center h-full gap-14 py-10">
                <div className="flex flex-col items-center gap-[25px]">
                  <div className="size-24 rounded-full overflow-clip">
                    {!data?.photo ? (
                      <div className="bg-[#EEEEEE] size-full" />
                    ) : (
                      <Image
                        src={data && data.photo}
                        alt={data.firstName + " " + data.lastName}
                        width={96}
                        height={96}
                      />
                    )}
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    {!data ? (
                      <div className="h-4 w-[160px] rounded-full bg-[#EEEEEE]"></div>
                    ) : (
                      <p className="heading-s text-grey-dark">
                        {data.firstName} {data.lastName}
                      </p>
                    )}
                    {!data ? (
                      <div className="h-2 w-[72px] rounded-full bg-[#EEEEEE]"></div>
                    ) : (
                      <p className="body-s text-grey">{data.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-5 w-[237px] h-full overflow-y-auto no-scrollbar">
                  {!data
                    ? arrayRange(1, 5, 1).map((i) => <LinkSkeleton key={i} />)
                    : data.links?.map((link) => (
                        <Link
                          variant={link.platform}
                          key={link.platform}
                          href={link.link}
                        />
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
