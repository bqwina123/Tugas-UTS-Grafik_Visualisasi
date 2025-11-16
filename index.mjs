// =========================================
//  SISTEM RUMAH SAKIT - DASHBOARD SIDEBAR
//  Nama: Baiq Wina Nurhiladia
//  NIM : SI20230010
// =========================================

import http from "http";
import url from "url";

// ===== DATASET PASIEN (20 DATA) =====
const pasien = [
  { nama: "Andi", umur: 25, gender: "Laki-laki", penyakit: "Demam", biaya: 200000 },
  { nama: "Budi", umur: 40, gender: "Laki-laki", penyakit: "Diabetes", biaya: 1200000 },
  { nama: "Citra", umur: 30, gender: "Perempuan", penyakit: "Flu", biaya: 150000 },
  { nama: "Dewi", umur: 28, gender: "Perempuan", penyakit: "Covid-19", biaya: 2200000 },
  { nama: "Eka", umur: 45, gender: "Laki-laki", penyakit: "Hipertensi", biaya: 1800000 },
  { nama: "Farah", umur: 33, gender: "Perempuan", penyakit: "Demam", biaya: 250000 },
  { nama: "Gilang", umur: 38, gender: "Laki-laki", penyakit: "Asma", biaya: 900000 },
  { nama: "Hana", umur: 27, gender: "Perempuan", penyakit: "Tipes", biaya: 400000 },
  { nama: "Irfan", umur: 29, gender: "Laki-laki", penyakit: "Demam", biaya: 300000 },
  { nama: "Joko", umur: 50, gender: "Laki-laki", penyakit: "Hipertensi", biaya: 1600000 },
  { nama: "Kiki", umur: 22, gender: "Perempuan", penyakit: "Flu", biaya: 100000 },
  { nama: "Lina", umur: 31, gender: "Perempuan", penyakit: "Covid-19", biaya: 2500000 },
  { nama: "Miko", umur: 36, gender: "Laki-laki", penyakit: "Asma", biaya: 800000 },
  { nama: "Nina", umur: 26, gender: "Perempuan", penyakit: "Demam", biaya: 200000 },
  { nama: "Omar", umur: 47, gender: "Laki-laki", penyakit: "Diabetes", biaya: 1700000 },
  { nama: "Putri", umur: 34, gender: "Perempuan", penyakit: "Tipes", biaya: 350000 },
  { nama: "Qori", umur: 39, gender: "Perempuan", penyakit: "Hipertensi", biaya: 1900000 },
  { nama: "Rafi", umur: 23, gender: "Laki-laki", penyakit: "Flu", biaya: 120000 },
  { nama: "Sinta", umur: 28, gender: "Perempuan", penyakit: "Covid-19", biaya: 2100000 },
  { nama: "Tono", umur: 44, gender: "Laki-laki", penyakit: "Asma", biaya: 950000 },
];

// ===== SERVER =====
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === "/data") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(pasien));
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Dashboard Rumah Sakit</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    * { box-sizing: border-box; }
    body { margin:0; font-family: Arial, sans-serif; background:#f4f6f9; display:flex; min-height:100vh; }
    .sidebar { width:250px; background:#007bff; color:white; display:flex; flex-direction:column; padding:20px 10px; }
    .sidebar h2 { text-align:center; margin-bottom:20px; font-size:1.3rem; border-bottom:2px solid rgba(255,255,255,0.3); padding-bottom:10px; }
    .sidebar button { background:transparent; color:white; border:none; text-align:left; padding:12px 20px; margin:5px 0; font-size:15px; cursor:pointer; border-radius:8px; transition:background 0.3s; }
    .sidebar button:hover { background:rgba(255,255,255,0.2); }
    .main { flex:1; display:flex; flex-direction:column; }
    header { background:#fff; padding:15px 25px; box-shadow:0 2px 4px rgba(0,0,0,0.1); }
    header h1 { margin:0; color:#007bff; }
    .content { padding:20px; overflow:auto; }
    table { width:100%; border-collapse:collapse; background:white; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); margin-top:20px; }
    th, td { border:1px solid #ddd; padding:10px; text-align:center; }
    th { background:#007bff; color:white; }
    canvas { background:white; border-radius:10px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.1); width:100%; max-width:600px; }
    footer { text-align:center; padding:10px; color:#555; font-size:14px; }
  </style>
</head>
<body>
  <div class="sidebar">
    <h2>🏥 Rumah Sakit</h2>
    <button onclick="tampilkanDashboard()">📊 Dashboard</button>
    <button onclick="tampilkanTabel('pasien')">📋 Data Pasien</button>
    <button onclick="tampilkanTabel('penyakit')">🩺 Data Penyakit</button>
    <button onclick="tampilkanTabel('biaya')">💰 Biaya Pengobatan</button>
    <button onclick="tampilkanTabel('umur')">👶 Statistik Umur</button>
    <button onclick="tampilkanTabel('gender')">🚻 Jenis Kelamin</button>
    <button onclick="tampilkanTabel('ringkasan')">📈 Ringkasan</button>
  </div>

  <div class="main">
    <header>
      <h1>Dashboard Sistem Rumah Sakit</h1>
      <p>Nama: <b>Baiq Wina Nurhiladia</b> | NIM: <b>SI20230010</b></p>
    </header>
    <div class="content" id="content">
      <h2>📊 Statistik Pasien per Penyakit</h2>
      <canvas id="chart1"></canvas>
    </div>
    <footer>© 2025 Sistem Informasi  Rumah Sakit- STMIK Lombok</footer>
  </div>

  <script>
    let dataPasien = [];

    fetch('/data')
      .then(r => r.json())
      .then(data => { dataPasien = data; tampilkanDashboard(); });

    function tampilkanDashboard() {
      document.getElementById("content").innerHTML = '<h2>📊 Statistik Pasien per Penyakit</h2><canvas id="chart1"></canvas>';
      const penyakitCount = {};
      dataPasien.forEach(p => penyakitCount[p.penyakit] = (penyakitCount[p.penyakit] || 0) + 1);
      new Chart(document.getElementById('chart1'), {
        type: 'bar',
        data: { labels: Object.keys(penyakitCount), datasets: [{ label: 'Jumlah Pasien', data: Object.values(penyakitCount), backgroundColor: '#42a5f5' }] },
        options: { plugins: { title: { display: true, text: 'Jumlah Pasien per Penyakit' } } }
      });
    }

    function tampilkanTabel(tipe) {
      let html = "<h2>📋 Data</h2><table><tr>";
      if (tipe === 'pasien') {
        html += "<th>No</th><th>Nama</th><th>Umur</th><th>Gender</th><th>Penyakit</th><th>Biaya (Rp)</th></tr>";
        dataPasien.forEach((p,i) => html += \`<tr><td>\${i+1}</td><td>\${p.nama}</td><td>\${p.umur}</td><td>\${p.gender}</td><td>\${p.penyakit}</td><td>\${p.biaya.toLocaleString()}</td></tr>\`);
      } else if (tipe === 'penyakit') {
        const penyakitCount = {};
        dataPasien.forEach(p => penyakitCount[p.penyakit] = (penyakitCount[p.penyakit] || 0) + 1);
        html += "<th>Penyakit</th><th>Jumlah Pasien</th></tr>";
        for (const [penyakit, jumlah] of Object.entries(penyakitCount)) html += \`<tr><td>\${penyakit}</td><td>\${jumlah}</td></tr>\`;
      } else if (tipe === 'biaya') {
        html += "<th>No</th><th>Nama</th><th>Penyakit</th><th>Biaya (Rp)</th></tr>";
        dataPasien.forEach((p,i)=>html+=\`<tr><td>\${i+1}</td><td>\${p.nama}</td><td>\${p.penyakit}</td><td>\${p.biaya.toLocaleString()}</td></tr>\`);
      } else if (tipe === 'umur') {
        html += "<th>No</th><th>Nama</th><th>Umur (Tahun)</th></tr>";
        dataPasien.forEach((p,i)=>html+=\`<tr><td>\${i+1}</td><td>\${p.nama}</td><td>\${p.umur}</td></tr>\`);
      } else if (tipe === 'gender') {
        const genderCount = { "Laki-laki": 0, "Perempuan": 0 };
        dataPasien.forEach(p => genderCount[p.gender]++);
        html += "<th>Jenis Kelamin</th><th>Jumlah Pasien</th></tr>";
        for (const [g,j] of Object.entries(genderCount)) html += \`<tr><td>\${g}</td><td>\${j}</td></tr>\`;
      } else if (tipe === 'ringkasan') {
        const total = dataPasien.length;
        const totalBiaya = dataPasien.reduce((a,b)=>a+b.biaya,0);
        html += "<th>Keterangan</th><th>Nilai</th></tr>";
        html += \`<tr><td>Total Pasien</td><td>\${total}</td></tr><tr><td>Total Biaya</td><td>Rp \${totalBiaya.toLocaleString()}</td></tr><tr><td>Rata-rata Biaya</td><td>Rp \${(totalBiaya/total).toLocaleString()}</td></tr>\`;
      }
      html += "</table>";
      document.getElementById("content").innerHTML = html;
    }
  </script>
</body>
</html>
  `);
});

server.listen(3000, () => {
  console.log("✅ Server berjalan di http://localhost:3000");
});
