// menu-btn
const toggleMenu = () => {
    const menu = document.querySelector('.menus')
    const overlay = document.querySelector('.overlay')
    menu.classList.toggle('open')
    overlay.classList.toggle('hidden')
}
// cart drawer
const toggleCartDrawer = () => {
    const menu = document.querySelector('.cart-drawer')
    const overlay = document.querySelector('.cart-overlay')
    menu.classList.toggle('open')
    overlay.classList.toggle('hidden')
}
// user menu
const toggleUserMenu = () => {
    const menu = document.querySelector('.user-menu')
    const overlay = document.querySelector('.user-overlay')
    menu.classList.toggle('open')
    overlay.classList.toggle('hidden')
}
// accordion
var acc = document.getElementsByClassName('course-accordion')
var i

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function () {
        //variables
        var panel = this.nextElementSibling
        var coursePanel = document.getElementsByClassName('course-panel')
        var courseAccordion =
            document.getElementsByClassName('course-accordion')
        var courseAccordionActive = document.getElementsByClassName(
            'course-accordion active',
        )
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null
            this.classList.remove('active')
        } else {
            for (var ii = 0; ii < courseAccordionActive.length; ii++) {
                courseAccordionActive[ii].classList.remove('active')
            }
            for (var iii = 0; iii < coursePanel.length; iii++) {
                this.classList.remove('active')
                coursePanel[iii].style.maxHeight = null
            }
            panel.style.maxHeight = panel.scrollHeight + 'px'
            this.classList.add('active')
        }
    }
}

// Video-btn
const toggleVideo = () => {
    const videoBox = document.querySelector('.video-box')
    const overlay = document.querySelector('.video-overlay')
    videoBox.classList.toggle('open')
    overlay.classList.toggle('hidden')
}
// current year
const ele = document.querySelectorAll('.curr-year')
if (ele?.length) {
    const date = new Date()
    const fullyear = date.getFullYear()
    for (let i = 0; i < ele.length; i++) {
        ele[i].innerHTML = fullyear
    }
}

// Search Bar - Header
const search = () => {
    console.log('search')
    var search = document.querySelector('.search-bar')
    search.classList.toggle('open-search-bar')
}

// loader
const screenLoader = document.getElementsByClassName('screen-loader')
if (screenLoader?.length) {
    setTimeout(() => {
        document.body.removeChild(screenLoader[0])
    }, 2000)
}

//Select box
document.addEventListener('alpine:init', () => {
    Alpine.data('select', () => ({
        open: false,
        select: '',

        toggle() {
            this.open = !this.open
        },
        setSelect(val) {
            this.select = val
            this.open = false
        },
    }))
})

// Product counter

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.product-counter')

    counters.forEach((counter) => {
        const countInput = counter.querySelector('.count')
        const incrementButton = counter.querySelector('.increment')
        const decrementButton = counter.querySelector('.decrement')

        let count = parseInt(countInput.value, 10)

        const updateCount = (newCount) => {
            count = newCount
            countInput.value = count
        }

        incrementButton.addEventListener('click', () => {
            updateCount(count + 1)
        })

        decrementButton.addEventListener('click', () => {
            if (count > 1) {
                updateCount(count - 1)
            }
        })
    })
})



let allTabs = [...document.querySelectorAll('.color-tab')]
let allTabContent = [...document.querySelectorAll('.color-tab-content')]

const handleTab = (evt) => {
    allTabContent.forEach((tc) => {
        tc.style.display = 'block';
        tc.classList.remove('active-content');
    });

    const activeContent = document.querySelector(`#${evt.target.dataset.linkid}`);
    activeContent.style.display = 'block';
    activeContent.classList.add('active-content');

    allTabs.forEach((t) =>
        t === evt.target
            ? t.classList.add('active-tab')
            : t.classList.remove('active-tab'),
    );
}

allTabs.forEach((t) => t.addEventListener('click', handleTab));



// modal
const videoBtn = () => {
    const videoModal = document.getElementById('video-modal')
    const videoOverlay = document.querySelector('.video-overlay')
    videoModal.classList.toggle('hidden')
    videoOverlay.classList.toggle('hidden')
}
const videoBtn2 = () => {
    const video2Modal = document.getElementById('video2-modal')
    const video2Overlay = document.querySelector('.video2-overlay')
    video2Modal.classList.toggle('hidden')
    video2Overlay.classList.toggle('hidden')
}
const addCards = () => {
    const addCardmodel = document.getElementById('add-cards-model')
    const cardModelOverlay = document.querySelector('.card-model-overlay')
    addCardmodel.classList.toggle('hidden')
    cardModelOverlay.classList.toggle('hidden')
}
