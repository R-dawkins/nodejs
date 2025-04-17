const path = require("path");
const { check, body } = require("express-validator");

const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);
// 미들웨어의 실행 순서는 좌에서 우로 가기 때문에 isAuth가 실행된 뒤 컨트롤러의 액션이 실행된다
// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title", "title has to be valid")
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body("price", "price has to be valid").isFloat(),
    body("description", "description has to be valid")
      .isLength({ min: 8, max: 400 })
      .trim(),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title", "title has to be valid")
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body("price", "price has to be valid").isFloat(),
    body("description", "description has to be valid")
      .isLength({ min: 8, max: 400 })
      .trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
