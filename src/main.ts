// ==========================================
// 1. DATA AWAL PERMAINAN
// ==========================================

// Menyimpan posisi tubuh ular.
// Index 0 merupakan kepala ular.
const tubuh_ular = [
    { x: 100, y: 100 },// 0
    { x: 75, y: 100 },//1
    { x: 50, y: 100 }//2
];

// Menyimpan posisi apel
let apel = {
    x: 200,
    y: 100
};

// Menyimpan data rintangan
const rintangan_baru = [
    {
        x: 150,
        y: 200,
        width: 100,
        height: 30,
        color: "darkblue"
    },
    {
        x: 50,
        y: 300,
        width: 80,
        height: 30,
        color: "darkgreen"
    }
];


// ==========================================
// 2. DEKLARASI VARIABEL PERMAINAN
// ==========================================

const namaPemain: string = "Rumi";

let skor: number = 0;
let nyawa: number = 3;
let levelGame: number = 1;

let gameOver: boolean = false;
let sedangPause: boolean = false;
let permainanDimulai: boolean = false;

let intervalGame: number | undefined;


// ==========================================
// 3. MENGHUBUNGKAN CANVAS
// ==========================================

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;


// ==========================================
// 4. MENGATUR ARAH GERAK ULAR
// ==========================================

// deklarasi : setting nilai awal dari suatu variabel 

let arah = "kanan";
// const 
// variabel : slot / tempat untuk menyimpan data yang bisa dipanggil dan diubah nilainya
// digunakan untuk mendeteksi tombol keywborad / panah ditekan dan mengubah arah ular
window.addEventListener("keydown", (e) => {
// untuk mengatur atau mendengarkan atau mengikuti perintah yang sdh kalian pencet di keyboard
    if (!permainanDimulai || gameOver) return; // return : mengembalikan nilai dari suatu fungsi , 
    // jika kondisi ini terpenuhi maka tidak akan menjalankan kode dibawahnya

    if (e.key === "ArrowUp" && arah !== "bawah") {  // boolean itu memiliki dua hasil , false !== true === 
        arah = "atas";

    } else if (e.key === "ArrowDown" && arah !== "atas") {
        arah = "bawah";

    } else if (e.key === "ArrowLeft" && arah !== "kanan") {
        arah = "kiri";

    } else if (e.key === "ArrowRight" && arah !== "kiri") {
        arah = "kanan";
    }

    // Mencegah halaman ikut bergulir saat tombol panah ditekan
    if (e.key.startsWith("Arrow")) {
        e.preventDefault();
    }
});


// ==========================================
// 5. FUNGSI MENGGAMBAR PERMAINAN
// ==========================================


// function : untuk menampung kumpulan perintah yang bisa dipanggil berkali-kali


// Menggambar background
function gambarBackground() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


// Menggambar seluruh tubuh ular
function bagianUlar() {// function void : fungsi default 

    tubuh_ular.forEach((bagian, index) => {

        if (index === 0) {
            ctx.fillStyle = "blue";

        } else if (index % 2 === 0) {
            ctx.fillStyle = "yellow";

        } else {
            ctx.fillStyle = "lime";
        }

        ctx.fillRect(
            bagian.x,
            bagian.y,
            20,
            20
        );
    });
}


// Menggambar apel atau umpan
//function parameter : untuk menampung data yang dikirimkan ke fungsi
function umpan (x: number, y: number, warna: string) {

    ctx.fillStyle = warna ;
    ctx.fillRect(x, y, 20, 20);
}


// Menggambar seluruh rintangan
function rintangan() {

    rintangan_baru.forEach((batu) => {

        ctx.fillStyle = batu.color;

        ctx.fillRect(
            batu.x,
            batu.y,
            batu.width,
            batu.height
        );
    });
}


// Menampilkan skor dan nyawa
function tampilkanStatus() {

    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.textAlign = "left";

    ctx.fillText(`Skor: ${skor}`, 10, 20);
    ctx.fillText(`Nyawa: ${nyawa}`, 10, 40);
}


// Menggambar seluruh tampilan permainan
function gambarPermainan() {

    gambarBackground();
    bagianUlar();
    umpan(apel.x, apel.y, "red");
    rintangan();
    tampilkanStatus();
}


// ==========================================
// 6. RESET POSISI ULAR
// ==========================================

function resetPosisiUlar() {
    // splice untuk menambahkan data di depan , dan menghapus data yng paling belakang 
    tubuh_ular.splice(
        0,
        tubuh_ular.length,
        { x: 100, y: 100 },
        { x: 75, y: 100 },
        { x: 50, y: 100 }
    );

    arah = "kanan";
}


// ==========================================
// 7. PROSES GAME OVER
// ==========================================

function prosesGameOver() {

    gameOver = true;
    permainanDimulai = false;

    if (intervalGame !== undefined) {

        clearInterval(intervalGame);
        intervalGame = undefined;
    }
}


// ==========================================
// 8. PROSES TABRAKAN DAN PENGURANGAN NYAWA
// ==========================================

function prosesTabrakan() {

    // Mengurangi nyawa sebanyak satu

    // ++ : increment fungsi untuk selalu menambahkan data 
    //-- : decrement fungsi untuk selalu mengurangi data
    nyawa--;

    console.log("Nyawa tersisa:", nyawa);

    if (nyawa <= 0) {

        // Jika nyawa habis, permainan berakhir
        prosesGameOver();

    } else {

        // Jika masih ada nyawa, posisi ular direset
        resetPosisiUlar();
    }
}


// ==========================================
// 9. FUNGSI GERAK ULAR
// ==========================================

function gerakUlar() {

    if (gameOver) return;

    // Mengambil posisi kepala ular
    const kepala = tubuh_ular[0];

    // Menyiapkan posisi kepala yang baru
    let kepalaBaru = {
        x: kepala.x,
        y: kepala.y
    };


    // Menghitung gerakan berdasarkan arah
    if (arah === "atas") {

        kepalaBaru.y -= 25;

    } else if (arah === "bawah") {

        kepalaBaru.y += 25;

    } else if (arah === "kiri") {

        kepalaBaru.x -= 25;

    } else if (arah === "kanan") {

        kepalaBaru.x += 25;
    }


    // --------------------------------------
    // 9A. MENGECEK TABRAKAN DENGAN DINDING
    // --------------------------------------

    if (
        kepalaBaru.x < 0 ||
        kepalaBaru.y < 0 ||
        kepalaBaru.x + 20 > canvas.width ||
        kepalaBaru.y + 20 > canvas.height
    ) {

        prosesTabrakan();
        return;
    }


    // --------------------------------------
    // 9B. MENGECEK TABRAKAN DENGAN RINTANGAN
    // --------------------------------------

    for (let batu of rintangan_baru) {

        if (
            kepalaBaru.x < batu.x + batu.width &&
            kepalaBaru.x + 20 > batu.x &&
            kepalaBaru.y < batu.y + batu.height &&
            kepalaBaru.y + 20 > batu.y
        ) {

            prosesTabrakan();
            return;
        }
    }


    // --------------------------------------
    // 9C. MENGECEK APAKAH ULAR MAKAN APEL
    // --------------------------------------

    const makanApel =
        kepalaBaru.x === apel.x &&
        kepalaBaru.y === apel.y;


    // Menambahkan kepala baru di depan array
    tubuh_ular.unshift(kepalaBaru);


    if (makanApel) {

        // Menambah skor sebanyak 10
        skor += 10;

        console.log("Apel dimakan!");
        console.log("Skor:", skor);


        // Memindahkan apel ke posisi baru secara acak
        do {

            apel.x = Math.floor(Math.random() * 16) * 25;
            apel.y = Math.floor(Math.random() * 16) * 25;

        } while (

            // Memastikan apel tidak berada di tubuh ular
            tubuh_ular.some(
                (bagian) =>
                    bagian.x === apel.x &&
                    bagian.y === apel.y
            ) ||

            // Memastikan apel tidak berada di rintangan
            rintangan_baru.some(
                (batu) =>
                    apel.x < batu.x + batu.width &&
                    apel.x + 20 > batu.x &&
                    apel.y < batu.y + batu.height &&
                    apel.y + 20 > batu.y
            )
        );

    } else {

        // Menghapus ekor jika ular tidak makan apel
        tubuh_ular.pop();
    }
}


// ==========================================
// 10. MENAMPILKAN GAME OVER
// ==========================================

function tampilkanGameOver() {

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        "GAME OVER",
        canvas.width / 2,
        canvas.height / 2
    );

    ctx.fillStyle = "white";
    ctx.font = "16px Arial";

    ctx.fillText(
        `Skor Akhir: ${skor}`,
        canvas.width / 2,
        canvas.height / 2 + 30
    );

    ctx.textAlign = "left";
}


// ==========================================
// 11. GAME LOOP
// ==========================================

function gameLoop() {

    if (!permainanDimulai || sedangPause) {
        return;
    }

    // Membersihkan tampilan sebelumnya
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gerakkan ular jika permainan belum berakhir
    if (!gameOver) {
        gerakUlar();
    }

    // Menggambar ulang seluruh objek
    gambarPermainan();

    // Jika permainan berakhir, tampilkan Game Over
    if (gameOver) {
        tampilkanGameOver();
        return;
    }
}


// ==========================================
// 12. FUNGSI MULAI PERMAINAN
// ==========================================

function mulaiPermainan() {

    // Menghentikan interval sebelumnya jika masih berjalan
    if (intervalGame !== undefined) {

        clearInterval(intervalGame);
        intervalGame = undefined;
    }


    // Mengembalikan posisi ular
    resetPosisiUlar();


    // Mengembalikan posisi apel
    apel.x = 200;
    apel.y = 100;


    // Mengatur ulang nilai permainan
    skor = 0;
    nyawa = 3;
    levelGame = 1;

    gameOver = false;
    sedangPause = false;
    permainanDimulai = true;


    // Menggambar tampilan awal permainan
    gambarPermainan();


    // Menjalankan Game Loop setiap 200 milidetik
    intervalGame = window.setInterval(gameLoop, 200);
}


// ==========================================
// 13. MENGHUBUNGKAN TOMBOL MULAI
// ==========================================

const tombolMulai = document.getElementById("mulai");

tombolMulai?.addEventListener("click", mulaiPermainan);


// Menampilkan tampilan awal sebelum permainan dimulai
gambarPermainan();
