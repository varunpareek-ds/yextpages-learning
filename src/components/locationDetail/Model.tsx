import * as React from "react";
import { useEffect } from "react";
import Modal from "react-modal";
import { Cross, holyday_icn } from "../../sites-global/global";
import { StaticData } from "../../sites-global/staticData";
import Holidayhours from "./Holdayhours";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#main');

function Model(props: any) {
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  var greaterDate =false;

  function openModal() {
    document.body.classList.add("overflow-hidden");
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    document.body.classList.remove("overflow-hidden");
    setIsOpen(false);
  }

  var day;
  props.holidayHours.map((res:any,index:Number)=>{
    const d = new Date(res.date);
     day = d.getDay();
    let a,s,holidayDate:any;
   function join(t:any, a:any, s:any) {
     function format(m:any) {
     let f = new Intl.DateTimeFormat('en', m);
     return f.format(t);  
     }
return a.map(format).join(s);
  } 
    var d1 = new Date();
    var d2 = new Date(res.date);
    if(d2.getDate() >= d1.getDate()&&d2.getFullYear()>= d1.getFullYear()){  
      greaterDate =true;
    }
  }
  )




  return(
    <>
    {greaterDate&&
    <>
    <div className="holy-hrs">
    <span dangerouslySetInnerHTML={{__html:holyday_icn}}/>
    <a onClick={openModal} className="" id="holidaybtn" href="javascript:void(0);">
      {props.name}
    </a> </div>
    </>} 
    <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <a
          onClick={closeModal}
          type="button"
          id="closeButton"
          className="closeButton bg-closeIcon bg-no-repeat bg-center w-7 h-7 bg-[length:48px]"
        >
          <div dangerouslySetInnerHTML={{ __html: Cross }} />
        </a>
        <div className="bg-red p-2 text-center text-white  text-lg lg:text-2xl  mb-4">{StaticData.Holdiay_popup}</div>
            <div className="pop-up-holyhrs heading">
              <div>Date</div>
              <div>Holiday</div>
              <div>Day</div>
              <div>Opening Hours</div>              
            </div>      
         {greaterDate?   
            <Holidayhours hours={props.holidayHours} c_specific_day={props.c_specific_day}/>
            :''}
            </Modal>
            </>
  );
}

export default Model;
