import ClientHeader from "@/src/app/client/components/ClientHeader";


export default function ClientLayout({
                                         children,
                                     }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ClientHeader/>
            {children}
        </>
    );
}