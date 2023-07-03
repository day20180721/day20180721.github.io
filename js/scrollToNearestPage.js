// 變換解析度時會錯誤，因為pageOffsetTop在第一次keyEvent時就固定了
const rightKey = 39;
const leftKey = 37;
let pageOffsetTop = [];

window.onload = function (){
    bindOffsetValues();
}
function bindOffsetValues() {
    if (pageOffsetTop.length === 0) {
        $(".portfolio-page").each(function (i, e) {
            let offset = $(e).offset();
            let top = offset.top;
            // Scroll To會無條件進位，例如scrollTo(125.5)，最終會到達126
            // 如果沒有Math.ceil，會導致greaterThan無法運作，因為始終匹配到自己(125.5)
            pageOffsetTop.push(Math.ceil(top))
        })
        console.log(pageOffsetTop);
    }
}

document.addEventListener("keyup", keyup);
function keyup(event) {
    switch (event.keyCode) {
        case rightKey:
            scrollToNearestPageOnRightClick();
            break;
        case leftKey:
            scrollToNearestPageOnLeftClick();
            break;
    }
}
function scrollToNearestPageOnRightClick() {
    for (let offsetTop in pageOffsetTop) {
        if(lessThen(offsetTop)){
            scrollTo(offsetTop);
            break;
        }
    }
}
function lessThen(offsetTop) {
    let currentScroll = document.documentElement.scrollTop;
    return pageOffsetTop[offsetTop] > currentScroll;
}

function scrollToNearestPageOnLeftClick(){
    for(let i = pageOffsetTop.length - 1; i >= 0 ;i--){
        if(greaterThan(i)){
            scrollTo(i);
            break;
        }else if(onTop())  {
            scrollTo(pageOffsetTop.length - 1)
            break;
        }
    }
}
function greaterThan(offsetTop){
    let currentScroll = document.documentElement.scrollTop;
    return pageOffsetTop[offsetTop] < currentScroll;
}

function scrollTo(offsetTop) {
    document.documentElement.scrollTop = pageOffsetTop[offsetTop];
    console.log("scroll to " + pageOffsetTop[offsetTop])
}

function onTop(){
    return document.documentElement.scrollTop === 0;
}

