const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  getEventos,
  crearEvento,
  actualizarEvent,
  eliminarEvent,
} = require("../controllers/event");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");
const router = Router();

router.use(validarJWT);

router.get("/", getEventos);

router.post(
  "/",
  [
    check("title", "El titulo es necesario").not().isEmpty(),
    check("start", "Fecha de inicio es obligatorio").custom(isDate),
    check("end", "Fecha de finalización es obligatorio").custom(isDate),
  ],
  validarCampos,
  crearEvento
);

router.put(
  "/:id",
  [
    check("title", "El titulo es necesario").not().isEmpty(),
    check("start", "Fecha de inicio es obligatorio").custom(isDate),
    check("end", "Fecha de finalización es obligatorio").custom(isDate),
  ],
  validarCampos,
  actualizarEvent
);

router.delete("/:id", eliminarEvent);

module.exports = router;
