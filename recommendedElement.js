const boxSize = window.getComputedStyle(document.documentElement).getPropertyValue("--box-basis");
const box_x_margin = window.getComputedStyle(document.documentElement).getPropertyValue("--box-margin-x");

const boxWidth = Number(boxSize) + Number(box_x_margin) * 2;
const amountOfBoxes = 6;

let currentElement;
let resizeObserver;

export const domesticData = {
    amountOfActionRight: undefined,
    amountOfActionLeft: 0
}

const arr = [];

let updateBoxSize;

    function createObserv (element){

        let rightArrow;
        let leftArrow;

        const boxes = [...element.getElementsByClassName("box")];
        boxes.forEach((e) => {
            e.style.display = "flex";
        });

        resizeObserver = new ResizeObserver((entries) => {

            const recommendedBoxWidth = entries[0].contentRect.width;
            
            function listener()
            {
                rightArrow.addEventListener("click", (e) => {
                    if(domesticData.amountOfActionRight && domesticData.amountOfActionRight != 1)
                    {

                        arr.reverse()[domesticData.amountOfActionRight-1].forEach((e) => {

                            e.style.flexBasis = '0px';
                            e.style.margin = '0px 0px';

                            e.getElementsByClassName("recommended")
                            .item(0).style.display = "none";
                        });
                        arr.reverse();

                        domesticData.amountOfActionRight--;
                        domesticData.amountOfActionLeft++;

                        updateBoxSize = boxes[boxes.length - 1].clientWidth;
                    };
                });

                leftArrow.addEventListener("click", (e) => {
                    if(domesticData.amountOfActionLeft)
                    {
                        arr[domesticData.amountOfActionLeft-1].forEach((e) => {
                            e.style.flexBasis =`${updateBoxSize}px`;
                            e.style.margin = '0px 16px';

                            e.getElementsByClassName("recommended")
                            .item(0).style.display = "block";
                        });

                        domesticData.amountOfActionLeft--;
                        domesticData.amountOfActionRight++;
                    };
                });
            };

            arr.splice(0, arr.length);
    
            for(let i=1; i<=amountOfBoxes; i++)
            {
                if(recommendedBoxWidth > i*boxWidth){
                    var long = Math.floor( recommendedBoxWidth / i);
    
                    if(i==6)
                    {
                        for(let z=0; z<amountOfBoxes; z++)
                        {

                            boxes[z].style.display = `flex`;
                            boxes[z].style.margin = `0px 16px`;
                            boxes[z].style.flexBasis = `${long - 32}px`;
                        }
                    }
                    continue;
                }
                else{
                    if(!domesticData.amountOfActionRight) domesticData.amountOfActionRight = amountOfBoxes / (i-1);

                    if(!rightArrow && !leftArrow)
                    {
                        rightArrow = element.getElementsByClassName("fa-chevron-right").item(0);
                        leftArrow = element.getElementsByClassName("fa-chevron-left").item(0);

                        listener();
                    };

                    const amountOfViewElements = amountOfBoxes / domesticData.amountOfActionRight;
                    let copy = 0;

                    for(let y=1; y<=amountOfBoxes; y++)
                    {
                        copy++;

                        if(copy == amountOfViewElements) {
                            
                            const arrayWithElements = [];
                            for(let m=1; m<=amountOfViewElements; m++)
                            {
                                arrayWithElements.push(boxes[y-m]);
                            };
                            arr.push(arrayWithElements);
                            copy = 0;
                        };
                    };

                    for(let z=0; z<amountOfBoxes; z++)
                    {
                        boxes[z].style.display = `flex`;
                        boxes[z].style.margin = `0px 16px`;

                        boxes[z].style.flexBasis = `${long - 32}px`;
                        boxes[z].getElementsByClassName("recommended")
                        .item(0).style.display = "block";
                    };
                    break;
                };
            };
            console.log(arr)
        });

        resizeObserver.observe(element);
    }

export function listenRecommendedElement(element)
{
    if(currentElement) resizeObserver.unobserve(currentElement);
    createObserv(element)
};