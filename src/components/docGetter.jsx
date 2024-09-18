import React, { useEffect } from "react";
import axios from "axios";

import "./docGetter.css";
function DocGetter(props) {
  var sub, mod,course;
  useEffect(() => {
    sub = props.subject;
    mod = props.module;
    course=props.course;
    getDocs();
  });
  function getDocs() {
    console.log(mod);
    console.log(sub);

const eel="https://sheet.best/api/sheets/3cb4baa0-d091-4bce-ac00-176dd6241c04";
const ecl="https://sheet.best/api/sheets/d332d6d5-2dcf-41bd-950d-de08e17108b9";
const mechl="https://sheet.best/api/sheets/81e44800-78f0-4d64-86de-1a91369b3c54";
const civill="https://sheet.best/api/sheets/e405268b-6cc6-4f16-b266-4a86d2f640b3";
const csel="https://sheet.best/api/sheets/d690601d-865e-43d5-8cc8-e9c81cbc1870";

var choice_link='';
if(course=='Computer Science')
  choice_link=csel;
else if(course='Electronics & Communication')
  choice_link=ecl;
else if(course='Electrical and Electronics')
  choice_link=eel;
else if(course='Mechanical')
  choice_link=mechl;
else if(course='Civil')
  choice_link=civill;
else
  choice_link='first year link';

    document.getElementById("doclinks").innerHTML = "";
    axios.get(choice_link)
      .then((res) => {
        const length = res.data.length;
        var r=1,lin;
        for (var i = 0; i < length; i++) {
          const details = res.data[i];
          const x = document.createElement("a");
          x.style.textDecoration = "none";
          x.style.color = "white";
          if(details.Select_module == mod)
          {
            if(props.Select_semester=='semester 3' && details.Select_semester_3_subjects == sub )
            {
                lin = details.Upload_file; 
                console.log(mod);
                console.log(sub);
                
            }
            else if(props.Select_semester=='semester 4' && details.Select_semester_4_subjects == sub)
            {
                lin = details.Upload_file;
            }
          }
          
          
          x.setAttribute("href", lin);
          x.setAttribute("class", "link");
          x.innerHTML = "NOTE " + (r++) + " : " + mod + " OF " + sub;
          document.getElementById("doclinks").appendChild(x);
        }
        document.getElementById("doclinks").scrollIntoView({behavior:'smooth'});
      });
  }
  return (
    <div className="linkContainer">
      <div className="header">
        <div className="texts">
          <h3>NOTES</h3>
        </div>
        <div onClick={props.closer} className="close-btn">
          <img src="/close.svg" alt="" />
        </div>
      </div>
      <div id="doclinks" className="linkbox"></div>
    </div>
  );
}
export default DocGetter;
