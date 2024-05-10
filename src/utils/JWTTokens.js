import jwt from "jsonwebtoken";

//generate access token
export const AccessTokenGenerator = (data) => {
  return jwt.sign({ data }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

//generate refresh token
export const RefreshTokenGenerator = (data) => {
  return jwt.sign({ data }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "10d",
  });
};

//decode access token
export const AccessTokenDecoder = (tokenObj) => {
  const token = tokenObj.accessToken;
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

//decode refresh token
export const RefreshTokenDecoder = (tokenObj) => {
  const token = tokenObj.accessToken;
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};
