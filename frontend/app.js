import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import open from 'open';

const app = express();
const port = 3000;

// Lấy đường dẫn thư mục hiện tại
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cấu hình EJS và thư mục view
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));  // Đảm bảo đường dẫn tới thư mục view trong frontend

// Cấu hình thư mục public cho các file tĩnh (CSS, hình ảnh, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));  // Đảm bảo đường dẫn đúng tới public trong frontend

// Dữ liệu sản phẩm
const products = [
    {
        id: 1,
        category: 'Áo',
        name: 'Áo Blazer Công Sở Thanh Lịch',
        price: '550.000đ',
        description: [
            'Áo Blazer thanh lịch với thiết kế cổ điển, phù hợp cho các buổi họp, sự kiện trang trọng hay mặc đi làm.',
            'Chất liệu vải cao cấp, mềm mại, tạo cảm giác thoải mái khi mặc.',
            'Kiểu dáng suông, dễ phối đồ, có thể kết hợp với quần tây hoặc jeans cho phong cách năng động.',
            'Màu sắc: Đen, xám, xanh navy.',
            'Các size từ S đến XL, phù hợp với nhiều dáng người.',
            'Lý tưởng để tạo phong cách chuyên nghiệp và lịch lãm.'
        ],
        images: [
            'images/temp/assets/products/shirts/aokhoac/ao_blazer/can_ao.jpg',
            'images/temp/assets/products/shirts/aokhoac/ao_blazer/den-1.jpg',
            'images/temp/assets/products/shirts/aokhoac/ao_blazer/den-2.jpg'
        ]
    },
    {
        id: 2,
        name: 'Áo Khoác Dạ Nữ',
        price: '750.000đ',
        description: [
            'Áo khoác dạ nữ sang trọng, thích hợp cho mùa đông.',
            'Chất liệu vải dạ dày dặn, giữ ấm tuyệt vời.',
            'Kiểu dáng hiện đại với đường may tinh tế, dễ phối với váy hay quần jeans.'
        ],
        images: [
            'images/temp/assets/products/shirts/aokhoac/ao_blazer/can_ao.jpg',
            'images/temp/assets/products/shirts/aokhoac/ao_blazer/den-1.jpg',
            'images/temp/assets/products/shirts/aokhoac/ao_blazer/den-2.jpg'
        ]
    }
];

// Route render trang sản phẩm
app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    const product = products.find(p => p.id == productId);

    if (product) {
        res.render('products', { product: product });
    } else {
        res.status(404).send('Sản phẩm không tìm thấy');
    }
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
    // Mở trình duyệt tự động khi server chạy
    open(`http://localhost:${port}`);
});
