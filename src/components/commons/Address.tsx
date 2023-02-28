import * as React from "react";
const Address = (props: any) => {
    const { address } = props;

  return (
   <div className="address notHighlight">
            <div className=" notHighlight">
            <span>{address.line1} {address.line2 && address.line2},{address.city}{address.postalCode}</span>
           </div>
      </div>
  );
};

export default Address;
