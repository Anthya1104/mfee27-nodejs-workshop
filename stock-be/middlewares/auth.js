let checkLogin = function (req, res, next) {
  if (!req.session.member) {
    // 如果 session 裡 沒有 member這筆資料 -> 未登入
    return res.status(401).json({ message: '尚未登入' });
  }
  next();
};

module.exports = { checkLogin };
