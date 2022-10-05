document.addEventListener('DOMContentLoaded', () => {

    const cardContainer = document.querySelector('.launches')
    const cardTemplate = document.querySelector('#launch-template')
    let launches = []

    document.querySelector('.scroll-to-top').addEventListener('click', () => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    })

    document.querySelector('#search').addEventListener('input', e => {
        const value = e.target.value.toLowerCase()
        launches.forEach(launch => {
            const isVisible = launch.name.toLowerCase().includes(value)
            launch.element.classList.toggle('hide', !isVisible)
        })
    })

    document.querySelector('.mobile-toggle').addEventListener('click', () => {
        const searchForm = document.querySelector('#search-form')
        const mobileToggle = document.querySelector('.mobile-toggle')
        if (searchForm.style.display != 'flex') {
            searchForm.style.display = 'flex'
            mobileToggle.firstChild.classList.replace('fa-chevron-down', 'fa-chevron-up')
        } else {
            searchForm.style.display = 'none'
            mobileToggle.firstChild.classList.replace('fa-chevron-up', 'fa-chevron-down')
        }
    })

    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault()
        let startDate = document.querySelector('#start-date').value;
        let endDate = document.querySelector('#end-date').value;    
        cardContainer.innerHTML = ``
        fetch('https://api.spacexdata.com/v4/launches').then(res => res.json()).then(data => {
            launches = data.map(launch => {
                let card = cardTemplate.content.cloneNode(true).children[0]
                if (launch.date_local > startDate && launch.date_local < endDate) {

                    card.querySelector('.launch-number').textContent += launch.flight_number
                    card.querySelector('.launch-name').textContent += launch.name
                    card.querySelector('.rocket-id').textContent += launch.rocket
                    card.querySelector('.launch-date').textContent += new Date(launch.date_local).toLocaleString()
                    card.querySelector('.launch-capsules').textContent += launch.capsules.length
                    card.querySelector('.launch-cores').textContent += launch.cores.length

                    if (launch.links.webcast !== null) {
                        card.querySelector('.launch-webcast').classList.toggle('hide')
                        card.querySelector('.launch-webcast').href = launch.links.webcast
                    }

                    if (launch.details !== null) {
                        card.querySelector('.launch-notes-header').classList.toggle('hide')
                        card.querySelector('.launch-notes').textContent += launch.details
                    }

                    cardContainer.append(card)
                }
                return { name: launch.name, element: card }
            })

        })
            .catch(e => {
                console.log(e)
            })

    })

})