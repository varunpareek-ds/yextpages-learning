import * as React from "react";
import Footer from "./footer";
import Nav from "./Nav";

type Props = {
    title?: string;
    _site?: any;
    global:any;
    children?: React.ReactNode;
};
  
  const PageLayout = ({
    global,
    children,
  }: Props) => {
    return (
        <>
        {typeof global!="undefined"&&<Nav _site={global} />}

        {/* All the section under in header and footer will coming in childer node */}
                {children}

        {typeof global!="undefined"&&<Footer footer={global} />}
        </>
    );
  };

export default PageLayout;
  