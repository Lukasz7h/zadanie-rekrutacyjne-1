const boxSize = window.getComputedStyle(document.documentElement).getPropertyValue("--box-basis");
const box_x_margin = window.getComputedStyle(document.documentElement).getPropertyValue("--box-margin-x");

const boxWidth = Number(boxSize) + Number(box_x_margin) * 2;
const amountOfBoxes = 6;

let currentElement;
let resizeObserver;

export const domesticData = {
    amountOfActionRight: undefined,
    amountOfActionLeft: 0,
    
    rightArrow: undefined,
    leftArrow: undefined,

    flag: false
}

const arr = [];
let updateBoxSize;

    function createObserv (element){

        const boxes = [...element.getElementsByClassName("box")];
        boxes.forEach((e) => {
            e.style.display = "flex";
        });

        resizeObserver = new ResizeObserver((entries) => {

            domesticData.flag = true;
            const recommendedBoxWidth = entries[0].contentRect.width;
            
            function listener()
            {
                domesticData.leftArrow = element.getElementsByClassName("fa-chevron-left").item(0);
                domesticData.rightArrow = element.getElementsByClassName("fa-chevron-right").item(0);

                domesticData.leftArrow.style.opacity = "0.5";

                function clicked(e, boolean)
                {
                    console.log(domesticData.amountOfActionRight);
                    console.log(domesticData.amountOfActionLeft);
                    
                    boolean?
                    (function(){
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

                            if(domesticData.amountOfActionLeft > 0) domesticData.leftArrow.style.opacity = "1";
                        };
                    })():
                    (function() {
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

                            if(domesticData.amountOfActionLeft == 0)
                            {
                                domesticData.leftArrow.style.opacity = "0.5";
                            }
                        };
                    })();
                }
                
                const hasAttribute = domesticData.leftArrow.getAttribute("data-listener");
                if(!hasAttribute)
                {
                    domesticData.leftArrow.setAttribute("data-listener", true);
                    domesticData.rightArrow.setAttribute("data-listener", true);

                    domesticData.leftArrow.addEventListener("click", (e) => clicked(e, false));
                    domesticData.rightArrow.addEventListener("click", (e) => clicked(e, true));
                };
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
                            boxes[z].getElementsByClassName("recommended")
                            .item(0).style.display = "block";
                        }
                    }
                    continue;
                }
                else{

                    domesticData.amountOfActionRight = amountOfBoxes / (i-1);
                    domesticData.amountOfActionLeft = 0;
                    listener();

                    console.log(domesticData.amountOfActionRight);

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

            currentElement = element;
            domesticData.flag = false;
        });

        resizeObserver.observe(element);
    }

export function listenRecommendedElement(element)
{
    if(currentElement) resizeObserver.unobserve(currentElement);
    createObserv(element)
};