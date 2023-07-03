// 變換解析度時會錯誤，因為pageOffsetTop在第一次keyEvent時就固定了
const leftKey = 37;
const upKey = 38;
const rightKey = 39;
const downKey = 40;

let pageOffsetTop = [];

window.onload = function () {
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

$(document).keydown(function (e) {
    preventDefaultKeydownOnBody(e);
});

function preventDefaultKeydownOnBody(e) {
    if (e.keyCode === upKey || e.keyCode === downKey && e.target.nodeName == 'BODY') {
        event.preventDefault();
    }
}

document.addEventListener("keyup", keyup);

function keyup(event) {
    switch (event.keyCode) {
        case downKey:
            scrollToNearestPageOnRightClick();
            break;
        case upKey:
            scrollToNearestPageOnLeftClick();
            break;
    }
}

function scrollToNearestPageOnRightClick() {
    for (let offsetTop in pageOffsetTop) {
        if (lessThen(offsetTop)) {
            scrollToDest(offsetTop);
            break;
        }
    }
}

function lessThen(offsetTop) {
    let currentScroll = document.documentElement.scrollTop;
    return pageOffsetTop[offsetTop] > currentScroll;
}

function scrollToNearestPageOnLeftClick() {
    for (let i = pageOffsetTop.length - 1; i >= 0; i--) {
        if (greaterThan(i)) {
            scrollToDest(i);
            break;
        } else if (onTop()) {
            scrollToDest(pageOffsetTop.length - 1)
            break;
        }
    }
}

function greaterThan(offsetTop) {
    let currentScroll = document.documentElement.scrollTop;
    return pageOffsetTop[offsetTop] < currentScroll;
}

function scrollToDest(offsetTop) {
    let dest = pageOffsetTop[offsetTop];
    window.scrollTo({
        top: dest,
        behavior: "smooth"
        // behavior: "instant"
    });
    console.log("scroll to " + dest)
}

function onTop() {
    return document.documentElement.scrollTop === 0;
}

