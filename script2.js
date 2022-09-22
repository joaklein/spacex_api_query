document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        let url = 'https://api.spacexdata.com/v4/launches';
        fetch(url).then(res => res.json()).then(data => showData(data));
    });

    document.querySelector('.scroll-to-top').addEventListener('click', () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    function showData(items) {
        document.querySelector('.launches').innerHTML = '';
        let startDate = document.querySelector('#start-date').value;
        let endDate = document.querySelector('#end-date').value;
        let webCast;
        let launchNotes;

        items.forEach((item) => {
            webCast = '';
            launchNotes = '';

            if (item.date_local > startDate && item.date_local < endDate) {

                if (item.links.webcast !== null) {
                    webCast = `<a href="${item.links.webcast}" target="_blank" class="launch-webcast">Webcast</a>`;
                }

                if (item.details !== null) {
                    launchNotes = `<h3 class="launch-notes-header">Notes</h3><p class="launch-notes">${item.details}</p>`;
                }

                document.querySelector('.launches').innerHTML +=
                    `<div class="launch">
                    <p class="launch-number">Flight ${item.flight_number}</p>
                    <h1 class="launch-name">${item.name}</h1>
                    <p>Rocket ID: ${item.rocket}</p>
                    <p>Date: ${item.date_local}</p>
                    <p>Capsules: ${item.capsules.length}</p>
                    <p>Cores: ${item.cores.length}</p>
                    ${webCast}
                    ${launchNotes}
                    </div>`;
            };

        });

    };

});