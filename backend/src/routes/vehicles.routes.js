const express = require("express");
const { PrismaClient } = require("../generated/prisma");
const authMiddleware = require("../middlewares/auth");
const prisma = new PrismaClient();

const router = express.Router();


router.post("/", authMiddleware, async (req, res) => {
  const { nome, placa } = req.body;

  try {
    const vehicle = await prisma.vehicle.create({
      data: { nome, placa },
    });

    res.status(201).json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar veículo" });
  }
});


router.get("/", authMiddleware, async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany();
    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao consultar veículos" });
  }
});


router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { nome, placa } = req.body;

  try {
    const vehicle = await prisma.vehicle.update({
      where: { id: parseInt(id) },
      data: { nome, placa },
    });

    res.json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao editar veículo" });
  }
});


router.patch("/:id/archive", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await prisma.vehicle.update({
      where: { id: parseInt(id) },
      data: { status: "inativo" },
    });

    res.json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao arquivar veículo" });
  }
});


router.patch("/:id/restore", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await prisma.vehicle.update({
      where: { id: parseInt(id) },
      data: { status: "ativo" },
    });

    res.json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao desarquivar veículo" });
  }
});


router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.vehicle.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao remover veículo" });
  }
});


module.exports = router;
