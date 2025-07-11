function VanillaCounter() {
    let elements = document.querySelectorAll('[data-vanilla-counter]')

    elements.forEach((i) => {
        let data = {
            startAt: parseInt(i.getAttribute('data-start-at')),
            endAt: parseInt(i.getAttribute('data-end-at')),
            delay: parseInt(i.getAttribute('data-delay')) || 0,
            format: '{}',
            time: parseInt(i.getAttribute('data-time')) || 1000,
        }

        if (i.getAttribute('data-format')) {
            data.format = i.getAttribute('data-format')
        } else if (i.innerHTML != '') {
            data.format = i.innerHTML
        }

        if (data.startAt == null) {
            throw new Error('data-start-at attribute is required')
        }
        if (data.endAt == null) {
            throw new Error('data-end-at attribute is required')
        }

        function startCounter() {
            var counter = data.startAt
            i.innerHTML = data.format.replace('{}', counter)
            var intervalTime = Math.ceil(
                data.time / (data.endAt - data.startAt),
            )
            setTimeout(() => {
                var interval = setInterval(intervalHandler, intervalTime)
                function intervalHandler() {
                    counter +=
                        ((data.endAt - data.startAt) /
                            Math.abs(data.endAt - data.startAt)) *
                        1
                    i.innerHTML = data.format.replace('{}', counter)
                    if (counter == data.endAt) {
                        clearInterval(interval)
                    }
                }
            }, data.delay)
        }

        // Use IntersectionObserver for scroll detection
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startCounter()
                    observer.unobserve(i) // Stop observing once the counter has started
                }
            })
        })

        observer.observe(i) // Start observing the element
    })
}

window.VanillaCounter = VanillaCounter
