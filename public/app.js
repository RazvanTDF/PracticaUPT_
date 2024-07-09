document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('user-list');
    const addUserButton = document.getElementById('add-user-button');
    const userPopup = document.getElementById('user-popup');
    const userForm = document.getElementById('user-form');
    const closePopupButtons = document.querySelectorAll('.close');
    const modalTitle = document.getElementById('modal-title');
    const userOptionsPopup = document.getElementById('user-options-popup');
    let editUserId = null;

    const apiUrl = 'https://ca9cf67dfb4f80b41ffa.free.beeceptor.com/someCRUDops/';

    const fetchUsers = async () => {
        const response = await fetch(apiUrl);
        const users = await response.json();
        userList.innerHTML = users.map(user => `
            <div onclick="showUserOptions('${user.id}')">
                ${user.first_name} ${user.last_name}
            </div>`).join('');
    };

    addUserButton.addEventListener('click', () => {
        userForm.reset();
        editUserId = null;
        modalTitle.innerText = "Add User";
        userPopup.style.display = 'flex';
    });

    closePopupButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            userPopup.style.display = 'none';
            userOptionsPopup.style.display = 'none';
        });
    });

    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const first_name = document.getElementById('first_name').value;
        const last_name = document.getElementById('last_name').value;
        const email = document.getElementById('email').value;

        const userData = { first_name, last_name, email };

        if (editUserId) {
            await fetch(`${apiUrl}${editUserId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
        } else {
            await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
        }

        userPopup.style.display = 'none';
        fetchUsers();
    });

    window.showUserOptions = (id) => {
        editUserId = id;
        userOptionsPopup.style.display = 'flex';
    };

    document.getElementById('edit-user-button').addEventListener('click', async () => {
        const response = await fetch(`${apiUrl}${editUserId}`);
        const user = await response.json();

        modalTitle.innerText = "Edit User";
        document.getElementById('first_name').value = user.first_name;
        document.getElementById('last_name').value = user.last_name;
        document.getElementById('email').value = user.email;

        userPopup.style.display = 'flex';
        userOptionsPopup.style.display = 'none';
    });

    document.getElementById('delete-user-button').addEventListener('click', async () => {
        await fetch(`${apiUrl}${editUserId}`, {
            method: 'DELETE',
        });

        userOptionsPopup.style.display = 'none';
        fetchUsers();
    });

    // Close the popup if clicked outside of it
    window.onclick = function(event) {
        if (event.target == userPopup) {
            userPopup.style.display = 'none';
        }
        if (event.target == userOptionsPopup) {
            userOptionsPopup.style.display = 'none';
        }
    };

    fetchUsers();
});