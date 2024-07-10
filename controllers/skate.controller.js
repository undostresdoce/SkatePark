import bcryptjs from "bcryptjs";
import { SkaterModel } from "/models/skaters.models.js";
import { generateToken, verifyToken } from "/utils/jwtUtils.js";
//upload image
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { email, nombre, password, anos_experiencia, especialidad } =
      req.body;
    if (!email || !nombre || !password || !anos_experiencia || !especialidad) {
      return res
        .status(400)
        .json({ ok: false, msg: "Debes llenar todos los puntos" });
    }

    const skater = SkaterModel.findOneByEmail(email);
    if (skater) {
      return res
        .status(409)
        .json({ ok: false, msg: "Ya existe, intenta con otro" });
    }
    //creamos unos saltos salt o jump
    const jump = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, jump);
    const newSkater = await SkaterModel.create({
      email,
      nombre,
      password: hashedPassword,
      anos_experiencia,
      especialidad,
      foto,
      estado,
    });

    return res.status(201).json({ ok: true, msg: "Ingresado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error, intenta nuevamente",
    });
  }
};

const login = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error, intenta nuevamente",
    });
  }
};
const uploadImage = (req, res) => {
  try {
    const { target_file } = req.files;
    const { posicion } = req.body;
    target_file.mv(
      path.join(__dirname, "../public/img", `imagen-${posicion}.jpg`),
      (err) => {
        if (err) res.status(500).send(err);
        res.redirect("/login");
      }
    );
  } catch (error) {
    res.status(500).send("Oops! No podemos cargar la imagen");
  }
};

export const SkaterController = {
  register,
  login,
  uploadImage,
};
