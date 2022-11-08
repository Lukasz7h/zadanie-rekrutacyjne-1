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

    amountOfViewElements: undefined,
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

                // po kliknięciu w jedną strzałek uruchamiamy jedną z funkcji
                function clicked(e, boolean)
                {
                    
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

                // jeśli nie istnieje atrybut data-listener to dodajemy addEventListener do elementów (strzałek)
                if(!hasAttribute)
                {
                    domesticData.leftArrow.setAttribute("data-listener", true);
                    domesticData.rightArrow.setAttribute("data-listener", true);

                    domesticData.leftArrow.addEventListener("click", (e) => clicked(e, false));
                    domesticData.rightArrow.addEventListener("click", (e) => clicked(e, true));
                };
            };

            arr.splice(0, arr.length);
    
            // przechodzimy po wszystkich elementach
            for(let i=1; i<=amountOfBoxes; i++)
            {
                if(recommendedBoxWidth > i*boxWidth){
                    var long = Math.floor( recommendedBoxWidth / i);
    
                    // jesteśmy na ostatnim wyświetlanym elemencie
                    if(i==amountOfBoxes)
                    {
                        domesticData.leftArrow = element.getElementsByClassName("fa-chevron-left").item(0);
                        domesticData.rightArrow = element.getElementsByClassName("fa-chevron-right").item(0);

                        domesticData.leftArrow.style.display = "none";
                        domesticData.rightArrow.style.display = "none";

                        // ustawianie stylów dla elementów
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

                    domesticData.amountOfViewElements = amountOfBoxes / domesticData.amountOfActionRight;
                    let copy = 0;

                    for(let y=1; y<=amountOfBoxes; y++)
                    {
                        copy++;

                        // dzielimy elementy na grupy które będziemy wyświetlać (będą wyświetlać sie po kliknięciu w strzałke)
                        if(copy == domesticData.amountOfViewElements) {
                            
                            const arrayWithElements = [];
                            for(let m=1; m<=domesticData.amountOfViewElements; m++)
                            {
                                arrayWithElements.push(boxes[y-m]);
                            };

                            arr.push(arrayWithElements);
                            copy = 0;
                        };
                    };


                    // zmienianie stylów dle elementów rekomendowanych
                    for(let z=0; z<amountOfBoxes; z++)
                    {
                        boxes[z].style.display = `flex`;
                        boxes[z].style.margin = `0px 16px`;

                        boxes[z].style.flexBasis = `${long - 32}px`;
                        boxes[z].getElementsByClassName("recommended")
                        .item(0).style.display = "block";
                    };

                    domesticData.leftArrow.style.display = "block";
                    domesticData.rightArrow.style.display = "block";

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