import { useState, useEffect } from "react";
import axios from "axios";
const getFirstPageExtract = (jsonResponse: any) => {

  const pages = jsonResponse.query.pages;
  const pageIds = Object.keys(pages);

  const firstPageId = pageIds.length ? pageIds[0] : null;
  return firstPageId ? pages[firstPageId].extract : null;
};

const WikiContainer = (props: any) => {
  const [cityContent, setCityContent] = useState(null);

  const url = `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=${props.city}`;

  const getCity = async () => {
    try {
        const response = await axios.get(url);
        const jsonContent = response.data;
        const extract = getFirstPageExtract(jsonContent);
        setCityContent(extract);
    } catch (error) {
        console.error(error);
    }
}
  useEffect(() => {
    getCity();
  }, [props]);

  return (
    <div>
      <div>
        <h1>About {props.city}</h1>
        {cityContent && (
          <div dangerouslySetInnerHTML={{ __html: cityContent }} />
        )}
      </div>
    </div>
  );
};

export default WikiContainer;
