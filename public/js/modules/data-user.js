function dataUser() {
    const work = document.querySelector('[data-script="data-user"]');
    if(work) {
        const bookmarkS = document.querySelectorAll('.bookmark-img');
        const userNameFix = document.querySelector('.curent-user__left');
        const popup = document.querySelector('.set-name');
        const exit = document.querySelector('.set-name__close');
        const form = document.forms['update-name'];
        const goBack = document.querySelector('.curent-user__menu');

        goBack.addEventListener('click', (e) => {
            const time = document.querySelector('.time-choise').textContent;
            console.log('T >>> ',time);
            const day = +time.slice(0,2);
            const month = +time.slice(3,5);
            const year = +time.slice(6,10);

            let form = document.createElement('form');
            form.action = '/data-users';
            form.method = 'POST';
            form.style.display = 'none';

            form.innerHTML = `
            <input name="year" id="year" type="number" value="${year}" >
            <input name="month" id="month" type="number" value="${month}" >
            <input name="day" id="day" type="number" value="${day}" >`;

            document.body.append(form);

            form.submit();
        });

        bookmarkS.forEach(item => {
            item.addEventListener('click', (e) => {
                const ip = e.target.dataset.ip;
                const status = e.target.dataset.statusset;

                fetch('/update-status', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({status, ip})
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.res === 'ok data') {
                            window.location.reload();
                        }else{
                            console.log('Error in file > data-user.js');
                        }
                    });
            });
        });

        userNameFix.addEventListener('click', (e) => {
            const id = e.target.closest('.curent-user__left').dataset.id;
            const curentName = e.target.closest('.curent-user__left').dataset.name;
            popup.style.display = 'block';
            form.name.value = curentName;

            form.addEventListener('submit', (ev) => submit(ev,id, curentName));
        });

        exit.addEventListener('click', (e) => {
            popup.style.display = 'none';
        });

        function submit(ev,id, curentName) {
            ev.preventDefault();
            const newName = form.name.value;
            fetch('/update-name', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({id, newName})
            })
            .then(res => res.json())
            .then(data => {
                if(data.res === 'update ok') {
                    window.location.reload();
                }else{
                    console.log('Error in file data-user.js');
                }
            })
            .catch(err => console.log('Error fetch in file data-user.js', err));
        }
    }
}

export default dataUser;