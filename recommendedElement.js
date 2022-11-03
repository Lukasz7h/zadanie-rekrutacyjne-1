const boxSize = window.getComputedStyle(document.documentElement).getPropertyValue("--box-basis");
const box_x_margin = window.getComputedStyle(document.documentElement).getPropertyValue("--box-margin-x");

const boxWidth = Number(boxSize) + Number(box_x_margin) * 2;
const amountOfBoxes = 6;

let currentElement;
let resizeObserver;

let amountOfActionRight;
let amountOfActionLeft = 0;

    function createObserv (element){

        resizeObserver = new ResizeObserver((entries) => {

            const recommendedBoxWidth = entries[0].contentRect.width;
            const boxes = element.getElementsByClassName("box");
    
            for(let i=1; i<=amountOfBoxes; i++)
            {
                if(recommendedBoxWidth > i*boxWidth){
                    var long = Math.floor( recommendedBoxWidth / i);
    
                    if(i==6)
                    {
                        for(let z=0; z<amountOfBoxes; z++)
                        {
                            boxes.item(z).style.flexBasis = `${long - 32}px`;
                        }
                    }
                    continue;
                }
                else{
                    amountOfActionRight = amountOfBoxes / (i-1);

                    document.getElementsByClassName("fa-chevron-right").item(0)
                    .addEventListener("click", (e) => {
                        if(amountOfActionRight)
                        {
                            
                        };
                    });

                    document.getElementsByClassName("fa-chevron-left").item(0)
                    .addEventListener("click", (e) => {

                    });

                    for(let z=0; z<amountOfBoxes; z++)
                    {
                        boxes.item(z).style.flexBasis = `${long - 32}px`;
                    }
                    break;
                };
            };
        });

        resizeObserver.observe(element);
    }

export function listenRecommendedElement(element)
{
    if(currentElement) resizeObserver.unobserve(currentElement);
    createObserv(element)
};