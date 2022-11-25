import { Router } from "express";
import { Users } from "../../DB/Users.js";
import { nanoid } from "nanoid";

const authSession = Router();

const sessions = [];
authSession.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(401);

  const user = Users.find((user) => user.email === email);
  if (!user) return res.sendStatus(400);
  if (user.password !== password) return res.sendStatus(401);

  const guid = user.guid;

  const sessionId = nanoid();
  sessions.push({ sessionId, guid });

  res.cookie("loginCookie", sessionId, {
    httpOnly: true,
  });

  res.send();
});

authSession.get("/profile", (req, res) => {
  try {
    const { cookies } = req;
    if (!cookies) return res.sendStatus(400);

    const session = sessions.find((s) => s.sessionId === cookies.loginCookie);
    if (!session) return res.sendStatus(400);

    const user = Users.find((user) => user.guid === session.guid);

    delete user.password;

    res.send(user);
  } catch (error) {
    res.sendStatus(400);
  }
});

export default authSession;
