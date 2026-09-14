import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { auth } from "../middleware/auth";

const r = Router();
const google = new OAuth2Client();

r.post("/google", async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        message: "idToken obrigatório",
      });
    }

    const ticket = await google.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_IDS
        ?.split(",")
        .map((x) => x.trim()),
    });

    const p = ticket.getPayload();

    if (!p?.sub || !p.email) {
      return res.status(401).json({
        message: "Conta Google inválida",
      });
    }

    const user = await User.findOneAndUpdate(
      {
        googleSub: p.sub,
      },
      {
        $set: {
          email: p.email,
          name: p.name,
          picture: p.picture,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    const token = jwt.sign(
      {
        sub: String(user._id),
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30d",
      }
    );

    return res.json({
      token,
      user,
    });
  } catch (error) {
    console.error("[Auth Google]", error);

    return res.status(500).json({
      message: "Erro ao autenticar com Google",
    });
  }
});

r.post("/dev", async (req, res) => {
  try {
    if (process.env.ALLOW_DEV_LOGIN !== "true") {
      return res.status(404).json({
        message: "Not found",
      });
    }

    const email =
      req.body.email || "dev@meupet.local";

    const name =
      req.body.name || "Usuário DEV";

    const googleSub = `dev:${email}`;

    const user = await User.findOneAndUpdate(
      {
        googleSub,
      },
      {
        $set: {
          email,
          name,
        },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    const token = jwt.sign(
      {
        sub: String(user._id),
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "30d",
      }
    );

    console.log(
      "[Auth DEV] Login realizado:",
      email
    );

    return res.json({
      token,
      user,
    });
  } catch (error) {
    console.error("[Auth DEV] Erro:", error);

    return res.status(500).json({
      message: "Falha ao conectar ao banco",
    });
  }
});

r.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(
      req.user!.id
    ).lean();

    return res.json(user);
  } catch (error) {
    console.error("[Auth Me] Erro:", error);

    return res.status(500).json({
      message: "Erro ao buscar usuário",
    });
  }
});

export default r;