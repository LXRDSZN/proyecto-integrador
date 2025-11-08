// 📁 routes/auth.js
import { Router } from "express";
import Tarea from "../models/usuarios/materias.js"; // <-- ajusta la ruta según tu estructura

const router = Router();

/*
##################################################################################################
#                          📌 Obtener todas las tareas                                            #
##################################################################################################
*/
router.get("/tareas", async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

/*
##################################################################################################
#                          📌 Crear una nueva tarea                                               #
##################################################################################################
*/
router.post("/tareas", async (req, res) => {
  try {
    const { titulo } = req.body;

    if (!titulo || titulo.trim() === "")
      return res.status(400).json({ message: "El título es obligatorio" });

    const nuevaTarea = new Tarea({ titulo });
    await nuevaTarea.save();

    res.status(201).json({ message: "✅ Tarea creada", tarea: nuevaTarea });
  } catch (error) {
    console.error("Error al crear tarea:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

/*
##################################################################################################
#                          📌 Actualizar una tarea                                                #
##################################################################################################
*/
router.put("/tareas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, hecho } = req.body;

    const tarea = await Tarea.findByIdAndUpdate(
      id,
      { titulo, hecho },
      { new: true }
    );

    if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });

    res.json({ message: "✅ Tarea actualizada", tarea });
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

/*
##################################################################################################
#                          📌 Eliminar una tarea                                                  #
##################################################################################################
*/
router.delete("/tareas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByIdAndDelete(id);

    if (!tarea) return res.status(404).json({ message: "Tarea no encontrada" });

    res.json({ message: "🗑️ Tarea eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

export default router;
