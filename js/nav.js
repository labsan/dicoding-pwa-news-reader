document.addEventListener('DOMContentLoaded', function () {

    // Navigasi sidebar
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);

    // Panggil fungsi loadNav()
    loadNav();


    function loadNav() {
        // Inisialisasi objek AJAX
        var xhttp = new XMLHttpRequest();

        // Menangani respon server
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav")
                    .forEach(function (elm) {
                        elm.innerHTML = xhttp.responseText;
                    });

                // Daftar event listener pada setiap tautan menu
                document.querySelectorAll(".topnav, .sidenav")
                    .forEach(function (elm) {
                        elm.addEventListener('click', function (event) {

                            // Tutup sidenav
                            var sidenav = document.querySelector('.sidenav');
                            M.Sidenav.getInstance(sidenav).close();

                            // Muat konten halaman yang dipanggil
                            halaman = event.target.getAttribute('href').substr(1);
                            loadPage(halaman);
                        });
                    });
            }
        };

        // Kirim perintah ke server
        xhttp.open("GET", "nav.html", true);
        xhttp.send();

    }

    // Load page content Session
    // Ambil hash (#) dari URL
    var halaman = window.location.hash.substr(1);

    // Seleksi jika URL tidak memiliki hash (#)
    if (halaman == "") halaman = "home";

    // Panggil fungsi loadPage()
    loadPage(halaman);


    function loadPage(halaman) {
        // Inisialisasi objek AJAX
        var xhttp = new XMLHttpRequest();

        // Menangani respon server
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                var konten = document.querySelector("#body-content");
                if (this.status == 200) {
                    konten.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    konten.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    konten.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };

        // Kirim perintah ke server
        xhttp.open("GET", "pages/" + halaman + ".html", true);
        xhttp.send();

    }

});