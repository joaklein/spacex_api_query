document.addEventListener('DOMContentLoaded', () => {

    const cardContainer = document.querySelector('[data-launches]')
    const cardTemplate = document.querySelector('[data-launch-template]')
    let startDate = document.querySelector('#start-date').value;
    let endDate = document.querySelector('#end-date').value;
    let launches = []

    document.querySelector('.scroll-to-top').addEventListener('click', () => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    })

    document.querySelector('[data-search]').addEventListener('input', e => {
        const value = e.target.value.toLowerCase()
        launches.forEach(launch => {
            const isVisible = launch.name.toLowerCase().includes(value)
            launch.element.classList.toggle('hide', !isVisible)
        })
    })

    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault()
        fetch('https://api.spacexdata.com/v4/launches').then(res => res.json()).then(data => {
            launches = data.map(launch => {
                const card = cardTemplate.content.cloneNode(true).children[0]
                if (launch.date_local > startDate && launch.date_local < endDate) {

                    card.querySelector('[data-launch-number]').textContent += launch.flight_number
                    card.querySelector('[data-launch-name]').textContent += launch.name
                    card.querySelector('[data-rocket-id]').textContent += launch.rocket
                    card.querySelector('[data-launch-date]').textContent += launch.date_local
                    card.querySelector('[data-launch-capsules]').textContent += launch.capsules.length
                    card.querySelector('[data-launch-cores]').textContent += launch.cores.length

                    if (launch.links.webcast !== null) {
                        card.querySelector('[data-launch-webcast').href += launch.links.webcast
                    }

                    if (launch.details !== null) {
                        card.querySelector('[data-launch-notes-header]').classList.toggle('hide')
                        card.querySelector('[data-launch-notes]').textContent += launch.details
                    }

                    cardContainer.append(card)
                }
                return { name: launch.name, element: card }
            })

        })

    })

})