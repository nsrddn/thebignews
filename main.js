fetch('data.json').then(res => res.json()).then(datas => {
    const berita = datas.berita;
    const kategories = datas.kategories;

    berita.sort(() => Math.random() - 0.5)
    kategories.sort(() => Math.random() - 0.5)


    const navbarKategoriList = document.querySelector('nav ul');
    const miniHeadline = document.querySelector('main header .mini-headline');
    const beritaCard = document.querySelector('main .berita-utama .cards .scroll-box .scroll');
    const carets = document.querySelectorAll('main .berita-utama .cards .caret i');
    const topikUl = document.querySelector('main .topik-populer ul');
    const other = document.querySelector('main .other');
    const modalContainer = document.querySelector('.modal-container');
    const aside = document.querySelector('main aside');
    const bars = document.querySelector('main nav div');
    const asideUl = document.querySelector('main aside ul');

    miniHeadline.innerHTML = `
        <img src="${berita[0].image}" alt="Error"/>
        <div class="info">
            <p>${berita[0].terbit}</p>
            <h2 data-id="${berita[0].id}" class="hover">
                ${berita[0].judul}
            </h2>
            <p>${berita[0].excerpt.length <= 201 ? berita[0].excerpt : berita[0].excerpt.substring(0, 196) + "....."}</p>
        </div>
    `;

    let x = 0;
    let translateX = 0;
    carets[0].addEventListener('click', () => {
        if (x != 0) {
            translateX += 296;
            beritaCard.style.transform = `translateX(${translateX}px)`;
            x--;
        }
    });

    carets[1].addEventListener('click', () => {
        if (x < berita.slice(1, berita.length / 2).length - 1) {
            translateX -= 296;
            beritaCard.style.transform = `translateX(${translateX}px)`;
            x++;
        }
    });

    berita.slice(1, berita.length).forEach((b, i) => {
        const el = document.createElement('div');
        el.classList.add('card');
        if (i <= berita.length / 2) {
            el.innerHTML = `<img src="${b.image}" width="200" alt="Error">
                                <div class="info">
                                    <p>${b.terbit}</p>
                                    <h5 data-id="${b.id}" class="hover">${b.excerpt.length <= 106 ? b.excerpt : b.excerpt.substring(0, 101) + "....."}</h5>
                                </div>`;
            beritaCard.appendChild(el);
        } else {
            el.innerHTML = `
                <img width="280" src="${b.image}" alt="">
                <div class="info">
                    <p>${b.kategori.toUpperCase()} <span>${b.terbit}</span></p>
                    <h5 data-id="${b.id}" class="hover">${b.judul}</h5>
                    <p>${b.excerpt.length <= 154 ? b.excerpt : b.excerpt.substring(0, 149) + "....."}</p>
                </div>`;
            other.appendChild(el);
        }
    });

    kategories.forEach((kategori, i) => {
        const el = `<li data-kategori="${kategori}">${kategori.toUpperCase()}</li>`;
        asideUl.innerHTML += el;
        navbarKategoriList.innerHTML += el;
        if ((kategories.length - 6) < i) {
            const elTopik = document.createElement('li');
            elTopik.dataset.kategori = kategori;
            elTopik.innerHTML = `<span>#</span> ${kategori.toUpperCase()}`;
            elTopik.classList.add('hover');
            topikUl.appendChild(elTopik);
        }
    });

    document.addEventListener('click', function (e) {
        let data, el;
        if (e.target.dataset.id) {
            data = berita.find(b => b.id === parseInt(e.target.dataset.id));
            el = `<div class="modal">
            <header>
                <p>
                    Home <span>> ${data.kategori}</span>
                </p>
                <span class="hover">X</span>
            </header>
            <h2>${data.judul}</h2>
            <p>${data.excerpt}</p>
            <div class="author">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" width="100" alt="">
                <div class="info">
                    <h4>${data.author}</h4>
                    <p>${data.terbit}</p>
                </div>
            </div>
            <img src="${data.image}"
                alt="Error">
            <p>${data.content}</p>
        </div>`;
            modalContainer.innerHTML = el;
            modalContainer.style.display = 'block';
            document.querySelector('.modal-container .modal header span.hover').addEventListener('click', () => { modalContainer.style.display = 'none' });
        } else if (e.target.dataset.kategori) {
            datas = berita.filter(b => b.kategori == e.target.dataset.kategori);
            const other = document.createElement('div');
            datas.forEach(data => {
                const div = document.createElement('div');
                div.classList.add('card');
                div.innerHTML = `
                <img width="280" src="${data.image}" alt="">
                <div class="info">
                    <p>${data.kategori.toUpperCase()} <span>${data.terbit}</span></p>
                    <h5 data-id="${data.id}" class="hover">${data.judul}</h5>
                    <p>${data.excerpt.length <= 154 ? data.excerpt : data.excerpt.substring(0, 149) + "....."}</p>
                </div>`;
                other.appendChild(div);
            })
            el = `<div class="modal">
            <header>
                <p>
                    Home <span>> ${e.target.dataset.kategori}</span>
                </p>
                <span class="hover">X</span>
            </header>
            <div class="other">
                ${other.innerHTML}
            </div>
        </div>`;
            modalContainer.innerHTML = el;
            modalContainer.style.display = 'block';
            document.querySelector('.modal-container .modal header span.hover').addEventListener('click', () => { modalContainer.style.display = 'none' });
        } else if (e.target.dataset.search) {

            el = `<div class="modal">
            <header>
                <div class="search">
                    <input type="search" placeholder="Judul berita yang anda inginkan?" />
                </div>
                <span class="hover">X</span>
            </header>
            <div class="other"></div>
        </div>`;
            modalContainer.innerHTML = el;
            modalContainer.style.display = 'block';
            const modalOther = document.querySelector('.modal-container .modal .other');
            berita.forEach(data => {
                modalOther.innerHTML += `<div class="card">
                        <img width="280" src="${data.image}" alt="">
                        <div class="info">
                            <p>${data.kategori.toUpperCase()} <span>${data.terbit}</span></p>
                            <h5 data-id="${data.id}" class="hover">${data.judul}</h5>
                            <p>${data.excerpt.length <= 154 ? data.excerpt : data.excerpt.substring(0, 149) + "....."}</p>
                        </div>
                    </div>`
            })
            document.querySelector('.modal-container .modal header .search input').addEventListener('keyup', function () {
                const pattern = new RegExp(`${this.value}`, 'gi');
                const datas = berita.filter(b => b.judul.match(pattern))
                if (datas.length > 0) {
                    modalOther.innerHTML = '';
                    datas.forEach(data => {
                        modalOther.innerHTML += `<div class="card">
                            <img width="280" src="${data.image}" alt="">
                            <div class="info">
                                <p>${data.kategori.toUpperCase()} <span>${data.terbit}</span></p>
                                <h5 data-id="${data.id}" class="hover">${data.judul}</h5>
                                <p>${data.excerpt.length <= 154 ? data.excerpt : data.excerpt.substring(0, 149) + "....."}</p>
                            </div>
                        </div>`
                    })
                } else {
                    modalOther.innerHTML = '<p>Not Found</p>'
                }
            });
            document.querySelector('.modal-container .modal header span.hover').addEventListener('click', () => { modalContainer.style.display = 'none' });
        }
    })

    bars.addEventListener('click', () => {
        if(bars.innerHTML === '<p>X</p>') {
            aside.style.display = 'none';
            bars.innerHTML = '<img src="img/list.svg" />'
        }else {
            aside.style.display = 'block';
            bars.innerHTML = '<p>X</p>'
        }
    })
});