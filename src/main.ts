// SMK PURWOSARI 

//Data posisi tubuh ular disimpan dalam array. Index 0 adalah kepala ular.
const tubuh_ular = [
    { x: 100, y: 100 },
    { x: 75, y: 100 },
    { x: 50, y: 100 }
];


//apel
//Variabel apel menyimpan koordinat X dan Y apel. Let dipakai karena posisinya berubah.
let apel = {
    x: 200,
    y: 100
};
//rintangan
//Array ini menyimpan data rintangan: posisi, ukuran, dan warna.
const rintangan_baru= [
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
},

];

// Deklarasi variabel permainan. string = teks, number = angka, boolean = true/false.
const namaPemain: string = "Rumi";
let skor: number = 0;
let nyawa: number = 3;
let levelGame: number = 1;
let gameOver: boolean = false;
let sedangPause: boolean = false;
// variabel tambahan untuk tombol mulai permainan 
let permainanDimulai: boolean = false;
let intervalGame: number | undefined;

//Contoh penambahan nilai. Ini berjalan saat file dimuat, bukan saat apel dimakan.
skor = skor + 10;
nyawa = nyawa -1;
levelGame = levelGame + 1;

skor += 20;   // % 
nyawa -= 2;
levelGame += 2;

console.log(20*2);
console.log(20/2);
console.log(17%5);

//Ambil elemen canvas dari HTML dan siapkan context 2D untuk menggambar.
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

console.log("Nama Pemain:", namaPemain);
console.log("Skor:", skor);
console.log("Nyawa:", nyawa);  
console.log("Level:", levelGame);
console.log("Game Over:", gameOver);
console.log("Sedang Pause:", sedangPause);

skor = 100;
levelGame = 2;

console.log("Skor setelah berubah:", skor);
console.log("Level setelah berubah:", levelGame);


// for (let i = 0; i < 5; i++) { // increment = selalu bertambah , decrement  (i--)
//     tubuh_ular.push({
//         x: 100 - i * 25, // 100 = 0 , 75 , 50 , 25 , 0 
//         y: 100
//     });
// } bagian ini dikomen aja 

// for (let i = 0 ; i < 4; i++){
//     console.log(i);
// }

 //Fungsi untuk menggambar semua bagian ular; forEach mengulang setiap bagian.
function bagianUlar () {
tubuh_ular.forEach((bagian, index) => {
  if(index === 0) {
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

bagianUlar();

//Fungsi untuk menggambar apel/umpan pada koordinat X,Y dengan warna tertentu.
function umpan (x : number, y : number, warna : string )  {
    ctx.fillStyle = warna;
    ctx.fillRect(x, y, 20, 20);
}

umpan (100 , 350, "blue");
umpan (150 , 350, "orange");
umpan (280 , 350 , "red");


//Fungsi untuk menggambar semua rintangan yang tersimpan dalam array.
function rintangan (){
    rintangan_baru.forEach ((rintangan) => {
        ctx.fillStyle = rintangan.color;
        ctx.fillRect(
            rintangan.x,
            rintangan.y,
            rintangan.width,
            rintangan.height
        );
    })
};

rintangan();

//Fungsi menghitung koordinat baru. Contoh: hitungGerak(100, 25) menghasilkan 125.
function hitungGerak(x : number , langkah: number) : number {
return x + langkah;
}

const koordinatBaru = hitungGerak(100, 10); 
console.log("Koordinat Baru:", koordinatBaru);

console.log("koordinat baru " , hitungGerak(50, -20));

function tambah (a: number, b: number): number {
    return a + b;
}

const hasilTambah = tambah(10, 10);
console.log("Hasil Penjumlahan:", hasilTambah);

//Mendeteksi tombol yang ditekan. event.key akan berisi ArrowUp, ArrowDown, dan sebagainya.
window.addEventListener("keydown", (event) => {
    console.log(event.key);
});

//Variabel arah menyimpan arah gerak ular saat ini.
let arah = "kanan";

window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && arah !== "bawah") {
        arah = "atas";
    } else if (e.key === "ArrowDown" && arah !== "atas") {
        arah = "bawah";
    } else if (e.key === "ArrowLeft" && arah !== "kanan") {
        arah = "kiri";
    } else if (e.key === "ArrowRight" && arah !== "kiri") {
        arah = "kanan";
    }
});


//Fungsi utama gerak ular: hitung kepala baru, cek tabrakan, lalu perbarui array tubuh.
function gerakUlar() {
    if (gameOver) return;

//Ambil bagian pertama array sebagai kepala ular.
    const kepala = tubuh_ular[0];

    //Salin posisi kepala saat ini sebagai titik awal untuk menghitung posisi berikutnya.
    let kepalaBaru = {
        x: kepala.x,
        y: kepala.y
    };

    // Menggerakkan ular sesuai arah
    if (arah === "atas") {
        kepalaBaru.y = hitungGerak(kepala.y, -25);
    } else if (arah === "bawah") {
        kepalaBaru.y = hitungGerak(kepala.y, 25);
    } else if (arah === "kiri") {
        kepalaBaru.x = hitungGerak(kepala.x, -25);
    } else if (arah === "kanan") {
        kepalaBaru.x = hitungGerak(kepala.x, 25);
    }

    // Memeriksa tabrakan dengan dinding
    if (
        kepalaBaru.x < 0 ||
        kepalaBaru.y < 0 ||
        kepalaBaru.x + 20 > canvas.width ||
        kepalaBaru.y + 20 > canvas.height
    ) {
        gameOver = true;
        return;
    }

    // Apel dimakan jika koordinat kepala baru sama persis dengan koordinat apel.
    // Memeriksa apakah apel dimakan
    const makanApel =
        kepalaBaru.x === apel.x &&
        kepalaBaru.y === apel.y;

    // Memeriksa tabrakan dengan rintangan
    for (let batu of rintangan_baru) {
        if (
            kepalaBaru.x < batu.x + batu.width &&
            kepalaBaru.x + 20 > batu.x &&
            kepalaBaru.y < batu.y + batu.height &&
            kepalaBaru.y + 20 > batu.y
        ) {
            gameOver = true;
            return;
        }
    }


    //unshift() menambahkan kepala baru ke depan array tubuh ular.
    // Menambahkan kepala baru
    tubuh_ular.unshift(kepalaBaru);

    if (makanApel) {
        //Tambah 10 poin setiap apel dimakan. Skor bertambah hanya pada kondisi ini.
        skor += 10;

        console.log("Apel dimakan!");
        console.log("Skor:", skor);

        //Acak posisi apel pada grid 25 piksel, lalu pastikan tidak menimpa ular/rintangan.
        // Memindahkan apel ke posisi baru
        do {
                 apel.x = Math.floor(Math.random() * 16) * 25;
                apel.y = Math.floor(Math.random() * 16) * 25;
        } while (
            tubuh_ular.some(
                bagian =>
                    bagian.x === apel.x &&
                    bagian.y === apel.y
            ) ||
            rintangan_baru.some(
                batu =>
                    apel.x < batu.x + batu.width &&
                    apel.x + 20 > batu.x &&
                    apel.y < batu.y + batu.height &&
                    apel.y + 20 > batu.y
            )
        );
    } else {
        //pop() menghapus ekor terakhir. Saat makan apel, pop tidak dijalankan sehingga ular memanjang.
        tubuh_ular.pop();
    }
}

//Game loop berjalan berulang: bersihkan canvas, gerakkan ular, lalu gambar ulang objek.
function gameLoop(){
    if (!permainanDimulai || sedangPause || gameOver) {
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    gerakUlar();
    bagianUlar();
    umpan(apel.x, apel.y, "red");
    rintangan();

    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
            "GAME OVER",
            canvas.width / 2,
            canvas.height / 2
        );
        ctx.textAlign = "left";
    }
}

//Fungsi untuk mereset kondisi permainan dan memulai interval game loop.
function mulaiPermainan() {
    // Mencegah permainan berjalan dua kali
    if (intervalGame !== undefined) {
        clearInterval(intervalGame);
    }

    // Mengembalikan posisi ular
    //splice() mengganti isi array agar ular kembali ke posisi awal.
    tubuh_ular.splice(
       0,
    tubuh_ular.length,
    { x: 100, y: 100 },
    { x: 75, y: 100 },
    { x: 50, y: 100 }
    );

    // Mengembalikan posisi apel
    apel.x = 200;
    apel.y = 100;

    // Mengatur ulang permainan
    arah = "kanan";
    skor = 0;
    gameOver = false;
    sedangPause = false;
    permainanDimulai = true;

    // Menggambar tampilan awal
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bagianUlar();
    umpan(apel.x, apel.y, "red");
    rintangan();

    // Menjalankan permainan setelah tombol ditekan
    //Jalankan gameLoop setiap 200 ms (sekitar 5 kali per detik).
    intervalGame = window.setInterval(gameLoop, 200);
}

// Menghubungkan tombol Mulai dengan fungsi
//Cari tombol dengan id "mulai" di HTML.
const tombolMulai = document.getElementById("mulai");

//Saat tombol Mulai diklik, jalankan fungsi mulaiPermainan().
tombolMulai?.addEventListener("click", mulaiPermainan);

// yang membuat ular langsung bergerak ketikaa awal halaman 
// setInterval(gameLoop, 200); 


//Pemeriksaan apel di bawah ini hanya berjalan sekali saat file dimuat; pengecekan utama ada di gerakUlar().
if (
    tubuh_ular[0].x === apel.x &&
    tubuh_ular[0].y === apel.y
) {
    skor += 10;
    console.log("Apel dimakan!");
    console.log("Skor:", skor);
} else {
    console.log("Apel tidak dimakan!");
}


if (nyawa <= 0 ) {
    console.log("Game Over!");
} else if (nyawa === 1){
    console.log("hati hati nyawa tinggal 1");
} else {
    console.log("Game masih berjalan, nyawa tersisa", nyawa);
}

// function bersihkanCanvas() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// }
// bersihkanCanvas();

// RINGKASANN KODE KODE YANG BELUM DIPAHAMI 
// // - addEventListener("keydown", ...): mendeteksi tombol keyboard.
// - if / else if: memilih tindakan berdasarkan kondisi.
// - ===: membandingkan apakah nilai sama; !==: membandingkan apakah berbeda.
// - &&: kedua kondisi harus benar; ||: salah satu kondisi benar.
// - tubuh_ular[0]: mengambil kepala ular (index pertama).
// - unshift(kepalaBaru): menambahkan kepala di awal array.
// - pop(): menghapus bagian terakhir array (ekor).
// - forEach(): menjalankan perintah untuk setiap item array.
// - for...of: mengulang item array satu per satu.
// - .some(): mengecek apakah setidaknya ada item yang memenuhi kondisi.
// - Math.random() + Math.floor(): membuat koordinat apel acak.