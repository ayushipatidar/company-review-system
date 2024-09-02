import React from "react";
import { useQuery } from "@tanstack/react-query";

import "./index.css";
import CompanyCard from "./CompanyCard";
import instance from "../../config/axios";

async function getCompanies() {
  const response = await instance.get("/api/v1/company/");
  return response.data;
}

const CompanyList = () => {
  const { data } = useQuery({
    queryKey: ["companyList"],
    queryFn: getCompanies,
  });

  return (
    <div className="company-list">
      {data?.map((company, index) => (
        <CompanyCard key={index} {...company} index={index}/>
      ))}
    </div>
  );
};

export default CompanyList;
