import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Deceased = () => {
  const [data, setData] = useState([]);
  let { deceasedId } = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:4000/deceased/?deceasedId=${deceasedId}`,
    }).then((response) => {
      console.log(response.data);
      console.log(deceasedId)
    });
  }, []);

  return <div>Deceased</div>;
};

export default Deceased;
