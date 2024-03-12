
"use client"
import UpdateForm from "app/components/UpdateForm";
import { useRouter, useParams } from "next/navigation"; 
import LayoutFrontal from "app/layout/LayoutFrontal";
import React from "react";

const UpdatePage = () => {
 
  const params = useParams()

  console.log(params)

  return(
    <>
       <LayoutFrontal>
        <UpdateForm id={params.id}></UpdateForm>
       </LayoutFrontal>
    
    </>
  );
};

export default UpdatePage;
