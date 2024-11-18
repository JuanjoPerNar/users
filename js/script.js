const listaUsuarios = document.getElementById('listaUsuarios')

function fetchUsuarios() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('La solicitud no ha tenido éxito')
        }
        return response.json()
    })
    .then(users => {
        const detailsUsers = users.map(({id, name, username, email, address, phone, website, company}) => {
            const randomAge = Math.floor(Math.random() * (60 - 18 + 1)) + 18;
            const img = `../assets/img/${id}.jpeg`;
            const fullAddress = `${address.street}, ${address.suite}, ${address.city}`;

            return {
                ...{id, name, username, email, phone, website, company},
                age: randomAge,
                img: img,
                address: fullAddress
            };
        });
        displayUsers(detailsUsers);        
    })
    .catch(error => {
        console.error('Error al obtener los usuarios', error);
        listaUsuarios.innerHTML = 'Error al obtener los usuarios'
    });
}

function displayUsers(users) {
    listaUsuarios.innerHTML = '';

    users.forEach(user => {
        const li = document.createElement('li');

        const img = document.createElement('img');
        img.src = user.img;
        img.alt = user.name;

        const details = document.createElement('div');
        details.classList.add('details');

        const personalDetails = document.createElement('div');
        personalDetails.classList.add('personalDetails')
        personalDetails.innerHTML = `
            <p><strong>Nombre:</strong> ${user.name}</p>
            <p><strong>Edad:</strong> ${user.age}</p>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Teléfono:</strong> ${user.phone}</p>
            <p><strong>Email:</strong> ${user.email}</p>            
        `;

        const companyDetails = document.createElement('div');
        companyDetails.classList.add('companyDetails');
        companyDetails.innerHTML = `
            <p><strong>Compañía:</strong> ${user.company.name}</p>
            <p><strong>Dirección:</strong> ${user.address}</p>
        `;
        personalDetails.appendChild(img);
        details.appendChild(personalDetails);
        details.appendChild(companyDetails);
        li.appendChild(details);
        listaUsuarios.appendChild(li);
    });    
}

fetchUsuarios();