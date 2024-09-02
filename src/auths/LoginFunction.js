import axios from "axios";

export const login = async (username, password) => {
  const clientId = "front-client"; 
  const clientSecret = "93Y0W96dFPNWFMsRpoyYzMJqDfzw70US"; 
  const authServerUrl = "http://localhost:8080/realms/realmbp/protocol/openid-connect/token";

  const data = new URLSearchParams();
  data.append("grant_type", "password");
  data.append("client_id", clientId);
  data.append("client_secret", clientSecret);
  data.append("username", username);
  data.append("password", password);

  try {
    const response = await axios.post(authServerUrl, data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const token = response.data.access_token;
    return token;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Failed to login");
  }
};
