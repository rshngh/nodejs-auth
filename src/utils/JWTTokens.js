import jwt from "jsonwebtoken";

export const AccessTokenGenerator = (data) => {
  return jwt.sign({ data }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

export const RefreshTokenGenerator = (data) => {
  return jwt.sign({ data }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "10d",
  });
};

export const AccessTokenDecoder = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export const RefreshTokenDecoder = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};
