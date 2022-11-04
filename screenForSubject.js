import { domesticData } from "./recommendedElement.js";

export function Subjects()
{
    this.allSubjects = document.querySelectorAll("[data-subject]");
    this.objSubjects = {};

    this.currentLiElement;

    this.sortSubjects = function()
    {

        let divElements = [];

        this.allSubjects.forEach((element, id) => {
            if(element instanceof HTMLLIElement)
            {
                const dataValue = element.getAttribute("data-subject");
                Object.defineProperty(this.objSubjects, `${dataValue}`,
                {
                    value: {liElement: element},
                    enumerable: true
                });
            }
            else{
                divElements.push(element);
            }
        });

        divElements.forEach((element) => {
            this.objSubjects[`${element.getAttribute("data-subject")}`].divElement = element;
        });
    };

    this.sortSubjects();

    this.findListElement = function (element)
    {
        const dataSubject = element.getAttribute("data-subject");

        if(this.objSubjects[`${dataSubject}`])
        {
            let newElement = this.objSubjects[`${dataSubject}`].liElement;
            if(
                newElement != this.currentLiElement
            ) 
            {
                if(this.currentLiElement 
                &&
                !this.objSubjects[`${this.currentLiElement.getAttribute("data-subject")}`].divElement.classList.contains("content")) this.objSubjects[`${this.currentLiElement.getAttribute("data-subject")}`].divElement.style.display = "none";
                this.currentLiElement = this.objSubjects[`${dataSubject}`].liElement;

                domesticData.amountOfActionLeft = 0;
                domesticData.amountOfActionRight = undefined;
            };

            this.objSubjects[`${dataSubject}`].divElement.style.display = "flex";
        };
    };
};