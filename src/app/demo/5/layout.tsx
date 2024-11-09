


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
    <div className="container relative gap-4 mx-auto flex ">
                       {children} </div>
  );
}
