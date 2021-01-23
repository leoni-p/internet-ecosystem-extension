import axios from 'axios';

import { locationStringToLongitudeLatitude, getBrowserLongitudeLatitude, getMilesBetweenLongitudeLatitudes } from './miles.js';
import { milesToCarbon } from './carbon.js';
import { getRating } from './rating';

export const addRating = (document) => {
  const locationString = getLocationStringFromUrl(window.location.href);
  const div = getHtmlFromLocationString(locationString);
  document.getElementById("itemTitle").innerHTML = document.getElementById("itemTitle").innerHTML + div;
}

export const getLocationStringFromUrl = async (url) => {
  const html = await axios.get(url);
  const dom = new DOMParser().parseFromString(html, 'text/html');

  const xpath = "//span[text()='Item location:']"
  const matchingElement = dom.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE, null
  ).singleNodeValue;
  const textNode = matchingElement.nextSibling;
  const text = textNode.data.trim();

  return text;
}

export const getHtmlFromLocationString = (locationString) => {
  const longitudeLatitude1 = locationStringToLongitudeLatitude(locationString);
  const longitudeLatitude2 = getBrowserLongitudeLatitude();
  const miles = getMilesBetweenLongitudeLatitudes(longitudeLatitude1, longitudeLatitude2);
  const carbon = milesToCarbon();
  const { rating, visualisation } = getRating(miles, carbon);

  const leafUrl = "https://static.thenounproject.com/png/1882848-200.png";
  const leafHtml = `<img src="${leafUrl}" alt="Leaf" width="32px" height="32px" />`;

  return `<div>${leafHtml.repeat(rating)}</div>`;
}
