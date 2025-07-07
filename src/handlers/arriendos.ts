// src/controllers/rentalController.ts
import { Request, Response } from 'express';
import Arriendo from '../models/Arriendo'; // ¡Ahora importamos tu modelo Arriendo!
import Cliente from '../models/Cliente'; // Necesario para la relación de Cliente
import { Op } from 'sequelize'; // Para operadores de consulta

// Handler para CREAR un nuevo arriendo (POST /api/arriendos)
export const createRental = async (req: Request, res: Response) => {
  const { patenteVehiculo, tipoVehiculo, rutCliente, nomCliente, fechaInicio } = req.body; // Usa los nombres del frontend

  // 1. Validaciones
  if (!patenteVehiculo || !tipoVehiculo || !rutCliente || !nomCliente) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben ser llenados.' });
  }

  // Opcional: Validación de formato de patente (ej. 6 caracteres)
  if (patenteVehiculo.length !== 6) { // Ajusta esto según el formato de tu patente
      return res.status(400).json({ error: 'La patente debe tener 6 caracteres.' });
  }

  // Opcional: Validación de formato de RUT
  // Aquí podrías usar una librería o regex para validar el formato del RUT

  try {
    // 2. Validar que el cliente exista
    const clienteExistente = await Cliente.findByPk(rutCliente);
    if (!clienteExistente) {
      return res.status(404).json({ error: 'Cliente no encontrado. Por favor, registre el cliente primero.' });
    }

    // 3. Validar que no haya un arriendo activo con la misma patente
    const existingActiveRental = await Arriendo.findOne({
      where: {
        patenteVehiculo: patenteVehiculo.toUpperCase(), // Consistencia
        estadoArriendo: 'activo', // Usamos el nuevo campo de estado
      },
    });

    if (existingActiveRental) {
      return res.status(409).json({ error: 'Ya existe un arriendo activo para esta patente.' });
    }

    // 4. Crear el arriendo en la base de datos
    const newRental = await Arriendo.create({
      patenteVehiculo: patenteVehiculo.toUpperCase(),
      tipoVehiculo,
      rutCliente, // ForeignKey
      nomCliente,
      fechaInicio: fechaInicio ? new Date(fechaInicio) : new Date(), // Asumiendo que frontend envía un string de fecha
      fechaFin: null, // Al inicio no hay fecha de fin
      estadoArriendo: 'activo', // Se inicializa como activo
    });

    res.status(201).json({ message: 'Arriendo creado exitosamente', arriendo: newRental });
  } catch (error) {
    console.error('Error al crear arriendo:', error);
    res.status(500).json({ error: 'Error interno del servidor al crear el arriendo.' });
  }
};

// Handler para OBTENER TODOS los arriendos (GET /api/rentals)
export const getAllRentals = async (req: Request, res: Response) => {
  try {
    const arriendos = await Arriendo.findAll({
      include: [
        { model: Cliente, attributes: ['rutCliente', 'nomCliente'] }, // Incluye datos del cliente
        // Si tuvieras un modelo Producto relacionado, también podrías incluirlo aquí
      ],
      order: [['fechaInicio', 'DESC']], // Ordenar por fecha de inicio descendente
    });
    res.status(200).json(arriendos);
  } catch (error) {
    console.error('Error al obtener arriendos:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener los arriendos.' });
  }
};

// Handler para OBTENER arriendos ACTIVO/TERMINADOS (GET /api/rentals/estado/:estado)
export const getRentalsByStatus = async (req: Request, res: Response) => {
  const { status } = req.params; // 'activo' o 'terminado'

  if (status !== 'activo' && status !== 'terminado') {
    return res.status(400).json({ error: 'El estado debe ser "activo" o "terminado".' });
  }

  try {
    const arriendos = await Arriendo.findAll({
      where: { estadoArriendo: status }, // Filtra por el nuevo campo de estado
      include: [{ model: Cliente, attributes: ['rutCliente', 'nomCliente'] }],
      order: [['fechaInicio', 'DESC']],
    });
    res.status(200).json(arriendos);
  } catch (error) {
    console.error(`Error al obtener arriendos con estado ${status}:`, error);
    res.status(500).json({ error: 'Error interno del servidor al obtener los arriendos.' });
  }
};

// Handler para FINALIZAR un arriendo (PUT /api/rentals/:id/finalizar)
export const finishRental = async (req: Request, res: Response) => {
  const { id } = req.params; // Esto será idArriendo

  try {
    const arriendo = await Arriendo.findByPk(id);

    if (!arriendo) {
      return res.status(404).json({ error: 'Arriendo no encontrado.' });
    }
    if (arriendo.estadoArriendo === 'terminado') {
      return res.status(400).json({ error: 'El arriendo ya está terminado.' });
    }

    arriendo.estadoArriendo = 'terminado';
    arriendo.fechaFin = new Date(); // Registra la fecha de término
    await arriendo.save();

    res.status(200).json({ message: 'Arriendo finalizado exitosamente', arriendo });
  } catch (error) {
    console.error(`Error al finalizar arriendo con ID ${id}:`, error);
    res.status(500).json({ error: 'Error interno del servidor al finalizar el arriendo.' });
  }
};

// Handler para ELIMINAR un arriendo (DELETE /api/rentals/:id)
export const deleteRental = async (req: Request, res: Response) => {
  const { id } = req.params; // Esto será idArriendo

  try {
    const result = await Arriendo.destroy({
      where: { idArriendo: id }, // Usa el nombre de tu campo primary key
    });

    if (result === 0) {
      return res.status(404).json({ error: 'Arriendo no encontrado.' });
    }

    res.status(200).json({ message: 'Arriendo eliminado exitosamente.' });
  } catch (error) {
    console.error(`Error al eliminar arriendo con ID ${id}:`, error);
    res.status(500).json({ error: 'Error interno del servidor al eliminar el arriendo.' });
  }
};