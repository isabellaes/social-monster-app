import jwt from "jsonwebtoken";

export function authenticate() {
  return async function (req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
      return res.sendStatus(401);
    }

    try {
      await authenticateToken(token);
      next();
    } catch (error) {
      console.error("Authentication error: " + error);
      res.sendStatus(403);
    }
  };
}

export function generateToken(user) {
  const tokenContents = {
    name: user.username,
    password: user.password,
  };
  return jwt.sign(tokenContents, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES,
  });
}

export function authenticateToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenContents) => {
      if (err) {
        reject(err);
      } else {
        resolve(tokenContents);
      }
    });
  });
}
