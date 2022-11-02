import { action } from "./actionForListElement.js";

const body_HTML_Element = document.getElementsByTagName("body").item(0);

export function addListener()
{
    body_HTML_Element.addEventListener("mousemove", (e) => {
        action(e.target);
    });
};