const authPageIndex = 'index.html'
const elementPostBody = document.getElementById('post_body')
const firebaseConfig = {
    apiKey: "AIzaSyCbeiP66A3aS68k7JJYOrIr5_jHvQ50OVI",
    authDomain: "materia-auth.firebaseapp.com",
    projectId: "materia-auth",
    storageBucket: "materia-auth.appspot.com",
    messagingSenderId: "497337413673",
    appId: "1:497337413673:web:357a3bdbe41624fd86ac38",
    measurementId: "G-YSV1HV0BJS",
};
const elcreativeConfig = {
    with: {
        translateBio: "Tentang Saya",
        translateCreateNewPost: "Buat Postingan Baru",
        translateEditProfile: "Edit Profil",
        translateMyPosts: "Postingan Saya",
        translateName: "Nama",
        translatePhone: "Nomor Handphone",
        translateProfileVisibility: "Visibilitas Profil",
        translateProfilePrivate: "Tersembunyi untuk publik",
        translateProfilePublic: "Terlihat untuk publik",
        translateSignOut: "Keluar",
        translateSave: "Simpan",
        translateWebURL: "URL Blog/Website",
        translateViewPost: "Lihat Postingan",
        translateEditPost: "Edit Postingan",
        translateDeletePost: "Hapus Postingan",
        translateLoadMore: "Muat Selanjutnya",
        translateConfirm: "Apakah anda yakin?",
        translatePostTitle: "Judul Postingan",
        translatePostDescription: "Deskripsi/Ringkasan Postingan",
        translatePostLabel: "Label Postingan",
        translateSaveOptions: "Opsi Simpan",
        translateSavePostPrivate: "Draft",
        translateSavePostGuest: "Guest",
        translateSavePostMyBlog: "Private",
        translateSavePostPublic: "Public",
        translateCancel: "Batalkan",
        translateAllPosts: "Semua Postingan",
        translateUsers: "Pengguna",
        translateViewProfile: "Lihat Profil",
        translateHiddenProfile: "Profil Disembunyikan",
        translateSetAdmin: "Jadikan Admin",
        translateSetUser: "Jadikan Pengguna",
    },
    include: {
        iconLoader: `<div class='loader mx-auto h-11 w-11 my-3'><svg class='circular animate-[animRotate_2s_linear_infinite]' height='42' viewBox='25 25 50 50' width='42'><circle class='animate-[animDash_1.2s_ease-in-out_infinite,animColor_3s_ease-in-out_infinite]' cx='50' cy='50' fill='none' r='20' stroke-miterlimit='10' stroke-width='4'></circle></svg></div>`,
        iconVerified: `<path d='M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z' />`,
        iconSettings: `<path d='M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z' />`,
        iconClose: `<path d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z' />`,
        iconMoreVertical: `<path d='M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z' />`,
        iconLock: `<path d='M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z' />`,
    },
    dataMessages: {
        noResultsFound: "Tidak ada hasil yang ditemukan",
    }
}


// Create Element
function functionCreateElement(tag, options) {
    var element = document.createElement(tag);
    for (var attributes in options) {
        // If Has Class Attribute
        if (attributes == "class") {
            element.classList.add.apply(element.classList, options[attributes]);
        } else if (attributes == "content") {
            element.innerHTML = options[attributes];
        } else {
            element[attributes] = options[attributes];
        }
    };

    return element
};

// Load Script Promise
function functionLoadScript(source) {
    return new Promise(function (resolve, reject) {
        var element = functionCreateElement("script", {
            "src": source,
            "async": true,
            "defer": true
        });
        var boolean = false;

        element.onload = element.onreadystatechange = function () {
            if (!boolean && (!this.readyState || this.readyState == "complete")) {
                boolean = true;
                resolve();
            };
            // console.log(this.readyState);
        };

        element.onerror = function () {
            reject(element, source);
        };

        var elementScript = document.getElementsByTagName("script")[0];
        elementScript.parentNode.insertBefore(element, elementScript);
    })
};

if (localStorage.getItem('auth_image') != null) {
    document.getElementById('button_auth').querySelector('span').setAttribute('style', `background-image:url(${localStorage.getItem('auth_image')})`);
} else {
    document.getElementById('button_auth').querySelector('span').setAttribute('style', 'background-image:url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wCEAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAwBAgICAwMDBgMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/CABEIABwAHAMBIgACEQEDEQH/xAAaAAACAgMAAAAAAAAAAAAAAAAGCAAFAgcJ/9oACAEBAAAAAOsFRa5RRGCOApZDhmNJKiQP5//EABYBAQEBAAAAAAAAAAAAAAAAAAcFBv/aAAgBAhAAAABqnJee/8QAFwEAAwEAAAAAAAAAAAAAAAAABAUGB//aAAgBAxAAAADOzI9p/8QALhAAAQIFAgMGBwEAAAAAAAAAAQIDAAQFBhEHMQgSIRAUQWF1sxMVFyIzcYGR/9oACAEBAAE/ABFyX9RLQeZbqlWp9Pcf/Gl95KFL8wD4ecMzCJplLjakutuAKSpJylQOxBjOOzis03uR7WGenu4Ts/J1Dk7o6y0p1ISEgcnQHBBz088xw4WzVLQ0epMjVwtE42Fq+Es5UyhSiUoP6B28NoKQY161d+jNj/MkyonJl54S7DalcqOcgnKjvgAHbeKvxdX1U5suN1ZuUTnIbl5dASP9BJ/pjRHjDrlSu2n0i4G5eeZn3ky6ZltsNutKUcAkD7VDO/QGMZ8THHWc6W031FPtr7NJump9ueose4ITsI//xAAkEQABAwIFBQEAAAAAAAAAAAABAgMEACEFBhESMRNBUWFx8P/aAAgBAgEBPwDAsMZnSOk65sGhP30Nf1qkMpaeU2lW4JJAI7+6ybhEN2GXnmwpRJub8fazpAYiSUGOkJ3C4HHPiv/EAB8RAAEEAgIDAAAAAAAAAAAAAAECAwQRAAUSEwYxUf/aAAgBAwEBPwDZS1xmubaeRusYX2ISpYokA18zfzn25HWlZAoes8ckuSG1Bw3Rz//Z)');
}