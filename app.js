const showDescription = (e) => {
    e.children[0].style.display = "block"
    e.children[1].style.display = "none"
}

const hideDescription = (e) => {
    e.children[1].style.display = "block"
    e.children[0].style.display = "none"
}


const showList = (e) => {
    e.lastElementChild.style.display = "block"
    e.firstElementChild.style.display = "none"
}

const hideList = (e) => {
    e.lastElementChild.style.display = "none"
    e.firstElementChild.style.display = "block"
}