// --- Data Dummy ---
const summary = {
    totalProducts: 120,
    totalSales: 85,
    totalRevenue: 12500000 
};
let products = [
    { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
    { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
    { id: 3, name: "Coklat Aceh", price: 30000, stock: 20 },
    { id: 4, name: "Susu Almond", price: 35000, stock: 45 },
    { id: 5, name: "Madu Hutan", price: 75000, stock: 15 }
];

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

function setLoginState(isLoggedIn) {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
}

function checkLoginState() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Fungsi Logout 
function logout(event) {
    if (event) {
        event.preventDefault(); 
    }
    setLoginState(false);
    window.location.href = 'index.html';
}

// --- Logika Utama Project
document.addEventListener('DOMContentLoaded', () => { 
    // Logika Login (index.html)
    if (document.getElementById('loginForm')) {
        if (checkLoginState()) {
            window.location.href = 'dashboard.html';
        }
        const loginForm = document.getElementById('loginForm');
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            const nimInput = document.getElementById('nim');
            const passwordInput = document.getElementById('password');
            const nim = nimInput.value.trim();
            const password = passwordInput.value.trim();
            const alertMessage = document.getElementById('alertMessage');
            
            let isValid = true;
            
            alertMessage.style.display = 'none';
            alertMessage.className = 'alert-message';

            if (nim === '' || password === '') {
                alert('Email dan password tidak boleh kosong.');
                isValid = false;
            }

            if (isValid) {
                const SIMULATED_NIM = 'Ade Anang';
                const SIMULATED_PASSWORD = '24090106';

                if (nim === SIMULATED_NIM && password === SIMULATED_PASSWORD) {
                    setLoginState(true);
                    alertMessage.textContent = 'Login berhasil. Mengalihkan...';
                    alertMessage.classList.add('success');
                    alertMessage.style.display = 'block';

                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                    
                } else {
                    alertMessage.textContent = 'Error: NIM atau Password salah.';
                    alertMessage.classList.add('error');
                    alertMessage.style.display = 'block';
                    alert('NIM atau Password yang Anda masukkan salah.');
                }
            }
        });
    }
    // --- Logika Halaman Dashboard (dashboard.html) ---
    if (document.getElementById('dashboardContent')) {
        if (!checkLoginState()) {
            window.location.href = 'index.html';
            return;
        }
        document.getElementById('totalProducts').textContent = summary.totalProducts;
        document.getElementById('totalSales').textContent = summary.totalSales;
        document.getElementById('totalRevenue').textContent = formatRupiah(summary.totalRevenue);

        document.getElementById('viewProductsButton').addEventListener('click', () => {
            window.location.href = 'products.html';
        });

        // Event listener 'click' sekarang akan secara otomatis
        document.getElementById('logoutButtonHeader').addEventListener('click', logout);
        document.getElementById('logoutButtonSidebar').addEventListener('click', logout);
    }
    
    // --- Logika Halaman List Data Produk (products.html) ---
    if (document.getElementById('productTableBody')) {
        if (!checkLoginState()) {
            window.location.href = 'index.html';
            return;
        }
        const tableBody = document.getElementById('productTableBody');
        
        function renderProductsTable() {
            tableBody.innerHTML = '';  
            products.forEach((product, index) => {
                const row = tableBody.insertRow();
                row.insertCell().textContent = index + 1;
                row.insertCell().textContent = product.name;
                row.insertCell().textContent = formatRupiah(product.price);
                row.insertCell().textContent = product.stock;
                const cellAction = row.insertCell();
                cellAction.classList.add('action-cell');

                const editButton = document.createElement('button');
                editButton.classList.add('action-btn', 'edit-btn');
                editButton.innerHTML = '<i class="fas fa-edit"></i> Edit'; 
                editButton.dataset.id = product.id;
                editButton.addEventListener('click', handleEdit);
                
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('action-btn', 'delete-btn');
                deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
                deleteButton.dataset.id = product.id;
                deleteButton.addEventListener('click', handleDelete);
                
                cellAction.appendChild(editButton);
                cellAction.appendChild(deleteButton);
            });
        }
        
        function handleEdit(event) {
            const productId = parseInt(event.currentTarget.dataset.id);
            const product = products.find(p => p.id === productId);
            
            if (product) {
                alert(`Simulasi Edit Produk:\nID: ${product.id}\nNama: ${product.name}\nHarga: ${formatRupiah(product.price)}\nStok: ${product.stock}`);
            }
        }
        
        function handleDelete(event) {
            const productId = parseInt(event.currentTarget.dataset.id);
            
            if (confirm('Yakin hapus produk ini?')) { 
                products = products.filter(p => p.id !== productId);
                renderProductsTable();
                alert('Produk berhasil dihapus.');
            }
        }
        
        renderProductsTable();

        document.getElementById('sidebar-dashboard').addEventListener('click', () => {
            window.location.href = 'dashboard.html';
        });
        // Event listener 'click' sekarang akan secara otomatis
        // mengirim 'event' ke fungsi logout
        document.getElementById('logoutButtonHeader').addEventListener('click', logout);
        document.getElementById('logoutButtonSidebar').addEventListener('click', logout);
    }
});