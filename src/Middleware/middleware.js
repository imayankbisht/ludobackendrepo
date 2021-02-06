const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const encrypt = async (text) => {
  // const algorithm = "aes-256-cbc";
  try {
    // const key = crypto.randomBytes(32);
    const key = "}C(YMgg}bP6=.)vPxU2cd*&2Jr>Zv<H'";
    console.log(key);
    const iv = crypto.randomBytes(16);
    // function encrypt(text) {
    console.log(text);
    let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);

    let encrypted = cipher.update(JSON.stringify(text));

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
    // }
  } catch (err) {
    return err.message;
  }
};

const auth = async (req, res, next) => {
  try {
    console.log(req.header("x-auth-token"));
    const token = req.header("x-auth-token");
    console.log(token);
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied!" });
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied!" });
    req.user = verified.id;
    next();
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { auth, encrypt };
