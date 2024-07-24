import Header from "@/components/header";
import { LinkSkeleton } from "@/components/ui/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-grey-light">
      <Header />
      <main className="min-h-screen p-6 pt-0 flex gap-6">
        <div className="w-[560px] bg-white flex items-center justify-center rounded-xl shrink-0">
          <div className="relative mx-auto border-[rgb(31,_41,_55)] dark:border-[rgb(31,_41,_55)] bg-[rgb(31,_41,_55)] border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="w-[148px] h-[18px] bg-[rgb(31,_41,_55)] top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div className="h-[46px] w-[3px] bg-[rgb(31,_41,_55)] absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-[rgb(31,_41,_55)] absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-[rgb(31,_41,_55)] absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800"></div>
          </div>

          <div className="flex flex-col gap-5">
            <LinkSkeleton />
            <LinkSkeleton />
            <LinkSkeleton />
            <LinkSkeleton />
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
