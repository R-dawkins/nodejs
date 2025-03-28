const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("67e4378744359fe401e6bdc4")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;

      req.session.save((err) => {
        console.log(err);

        // req.session.save = session이 저장된 것을 확인하고 그 후 콜백함수를 호출 하는 함수
        // 보통은 사용할 필요가 없지만 redirect와 같이 서버와 데이터베이스에 세션이 저장되기도 전에 실행될 수 있는 함수와 함께 사용한다
      });
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
