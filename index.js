import express from "express";

import cors from "cors";
import bodyParser from "body-parser";

import path from "path"; // Import path để xử lý đường dẫn

import multer from "multer";

const app = express();

// Cấu hình phục vụ file tĩnh từ thư mục 'public'
const __dirname = path.resolve(); // Lấy đường dẫn thư mục gốc
app.use(express.static(path.join(__dirname, "public"))); // Thư mục chứa file tĩnh

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connectDB();

const userDatabase = {}; // Lưu trữ các id và Object
const userExcersize = []; // Lưu trữ các id và Excersize
// Cấu hình nơi lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Thư mục lưu file
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Đặt tên file
  },
});
// Khởi tạo Multer
const upload = multer({ storage });

// @Post('upload')
//   @UseInterceptors(FileInterceptor('file'))
//   async uploadFile(@UploadedFile() file: Express.Multer.File) {
//     console.log('file upload');
//     console.log(file);
//     const generatedId = await this.filemanageService.saveFile(file);

//     return new ResponseSuccessDto(201, 'Insert successfull', generatedId.id);
//   }

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log("API File upload");
  console.log(req.file); // Kiểm tra file nhận được
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const { originalname, mimetype, size } = req.file;
  // Trả về metadata của file
  return res.json({
    name: originalname,
    type: mimetype,
    size: size,
  });
});

// POST: /api/users
// app.post("/api/users", async (req, res) => {
//   try {
//     const { username } = req.body;

//     console.log(req.body); // Kiểm tra URL nhận được

//     const newUser = await createUser(username);

//     // Trả về JSON chứa user
//     return res
//       .status(201)
//       .json({ username: newUser.username, _id: newUser._id.toString() }); // Trả về JSON chứa user
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Chạy server trên cổng 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; // Xuất mặc định
