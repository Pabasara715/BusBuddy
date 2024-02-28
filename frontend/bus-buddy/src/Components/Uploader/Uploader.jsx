import React, { useState } from "react";
import "./Uploader.css";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";
import PdfLogo from "../../Assets/pdflogo.png";

function Uploader() {
  const [doc, setDoc] = useState(null);
  const [docName, setDocName] = useState("No Document Selected");
  const [type, setType] = useState("");

  return (
    <div>
      <form
        className="form-upload"
        onClick={() => document.querySelector(".input-field").click()}
      >
        <input
          type="file"
          name=""
          id=""
          className="input-field"
          hidden
          onChange={({ target: { files } }) => {
            files[0] && setDocName(files[0].name);
            if (files) {
              setDoc(URL.createObjectURL(files[0]));
              setType(files[0].type);
              console.log(type);
            }
          }}
        />
        {doc ? (
          type == "application/pdf" ? (
            <img src={PdfLogo} alt="PDF Logo" width="auto" height="100%" />
          ) : (
            <img src={doc} alt="Uploaded File" width="auto" height="80%" />
          )
        ) : (
          <>
            <MdCloudUpload color="#1475cf" size={60} />
            <p>Browse Files to Upload</p>
          </>
        )}
      </form>
      <section className="uploaded-row">
        <AiFillFileImage color="#1475cf" />
        <span className="d-flex justify-content-center align-items-center">
          {docName}
          <MdDelete
            size={20}
            className="delete-doc"
            onClick={() => {
              setDocName("No Selected File");
              setDoc(null);
            }}
          />
        </span>
      </section>
    </div>
  );
}

export default Uploader;
