import { listenRecommendedElement } from "./recommendedElement.js";
import { Subjects } from "./screenForSubject.js";

const subjects = new Subjects();

function CurrentElement()
{
    this.currentElement;

    // usuwamy ostatnio aktualny element
    this.remove = function()
    {
        if(this.currentElement != undefined) this.currentElement.lastElementChild.style.display = "none";
    }

    // sprawdzamy czy zmienił się wyświetlony
    this.check = function(element)
    {
        if(element.hasAttribute("data-subject")){
            subjects.findListElement(element);
            return;
        };

        if(element != this.currentElement)
        {
            if(element.classList.contains("navList")) 
            {
                this.remove();
                this.currentElement = element;

                this.currentElement.lastElementChild.style.display = "flex";
            };
        }
        else
        {
            this.currentElement.lastElementChild.style.display = "flex";
        };
    }
}

const instance = new CurrentElement();

export function action(element)
{
    let data;

    if(element instanceof HTMLLIElement) data = element;
    else if(element.parentElement instanceof HTMLLIElement) data = element.parentElement;

    if(data){

        const recommendedBox = data.getElementsByClassName("content").item(0);

        if(!!recommendedBox && instance.currentElement != data) listenRecommendedElement(recommendedBox);
        instance.check(data);
    };

    // jeśli opścimy element nav usuwamy obiekt z kontentem
    if(element instanceof HTMLBodyElement) instance.remove();
}