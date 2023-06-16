import { useState, useEffect } from "react";

const getFirstPageExtract = (jsonResponse:any) => {
  // You should probably add some validathin here to make sure pages exists
  const pages = jsonResponse.query.pages;
  const pageIds = Object.keys(pages);
  // Here we only take the first response since we know there is only one.
  const firstPageId = pageIds.length ? pageIds[0] : null;
  return firstPageId ? pages[firstPageId].extract : null;
};

const WikiContainer = (props:any) => {
  
    const [cityContent, setCityContent] = useState(null);

  const url =
    `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=${props.city}`;

  const getCity = async () => {
    const response = await fetch(url);
    const jsonContent = await response.json();
    const extract = getFirstPageExtract(jsonContent);
    setCityContent(extract);
  };
  useEffect(() => {
    getCity();
  }, [props]);

  return (
    <div>
      <h1>About {props.city}</h1>
      {cityContent && <div dangerouslySetInnerHTML={{ __html: cityContent }} />}
    </div>
  );
};

export default WikiContainer;